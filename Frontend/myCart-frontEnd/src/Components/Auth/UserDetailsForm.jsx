import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import userService from '../../Components/Services/UserService';
import imageService from '../Services/ImageService';
import { useAuth } from '../../Contexts/AuthContext';

const UserDetailsForm = ({ onComplete = () => {} }) => {
  const { token, user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  useEffect(() => {
    if (!user?.userAuthId) {
      console.error("Missing user data in UserDetailsForm");
      toast.error("User information not available. Please log in again.");
    }
  }, [user]);


  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      imageFormik.setFieldValue('file', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  
  const imageFormik = useFormik({
    initialValues: {
      file: null,
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required('Please select an image'),
    }),
    onSubmit: async (values) => {
      try {
        setUploading(true);
        const response = await imageService.uploadImage(
          values.file,
          user.userAuthId,
          user.username,
          token,
          (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log('Upload Progress:', progress, '%');
          }
        );

        console.log("Full image upload response:", response); 

        const imageUrl = response.imageUrl;
        console.log("Extracted imageUrl:", imageUrl); 

        if (imageUrl) {
          toast.success('Image uploaded successfully!');
          setUploadedImageUrls([imageUrl]); 
          profileFormik.setFieldValue('profilePictureUrl', imageUrl);
          imageFormik.resetForm();
          setPreview(null);
        } else {
          toast.warn('Upload succeeded but no imageUrl returned.');
        }
      } catch (error) {
        const err = imageService.handleError(error);
        toast.error(err.message);
      } finally {
        setUploading(false);
      }
    }
  });

  
  const profileFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      description: '',
      profilePictureUrl: ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required').max(50, 'Too long'),
      lastName: Yup.string().required('Last name is required').max(50, 'Too long'),
      phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be at least 10 digits')
        .max(15, 'Too long'),
      description: Yup.string().max(500, 'Too long'),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!user?.userAuthId || !token) {
        toast.error("Authentication failed");
        return;
      }

      setSubmitting(true);
      try {
        const userDto = {
          userAuthId: user.userAuthId,
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          phoneNumber: values.phoneNumber.trim(),
          description: values.description.trim(),
          profilePictureUrl: values.profilePictureUrl.trim(),
        };

        console.log("Submitting user profile:", userDto);
        await userService.registerUserProfile(userDto, token);
        toast.success('Profile created successfully!');
        resetForm();
        onComplete();
      } catch (err) {
        console.error('Profile submission error:', err);
        let errorMessage = 'Failed to save profile. Please try again.';
        if (err.response?.status === 409) {
          errorMessage = 'Profile already exists for this user.';
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.message) {
          errorMessage = err.message;
        }
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Complete Your Profile</h3>

      
      <form onSubmit={imageFormik.handleSubmit}>
        <div
          {...getRootProps()}
          className={`dropzone p-4 text-center border rounded ${isDragActive ? 'bg-info' : 'bg-white'}`}
          style={{ cursor: 'pointer' }}
        >
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px' }} />
          ) : (
            <p>Drag & drop an image here, or click to select</p>
          )}
        </div>
        {imageFormik.touched.file && imageFormik.errors.file && (
          <div className="text-danger mt-2">{imageFormik.errors.file}</div>
        )}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={uploading || !imageFormik.values.file}
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      
      <form onSubmit={profileFormik.handleSubmit} className="mt-5">
        {[
          { name: 'firstName', label: 'First Name', required: true },
          { name: 'lastName', label: 'Last Name', required: true },
          { name: 'phoneNumber', label: 'Phone Number', required: true },
          { name: 'description', label: 'Description', required: false },
          { name: 'profilePictureUrl', label: 'Profile Picture URL (auto-filled)' }
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">
              {field.label}
              {field.required && <span className="text-danger">*</span>}
            </label>
            <input
              type="text"
              className={`form-control ${profileFormik.touched[field.name] && profileFormik.errors[field.name] ? 'is-invalid' : ''}`}
              {...profileFormik.getFieldProps(field.name)}
              disabled={submitting || field.name === 'profilePictureUrl'}
            />
            {profileFormik.touched[field.name] && profileFormik.errors[field.name] && (
              <div className="invalid-feedback">{profileFormik.errors[field.name]}</div>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="btn btn-success w-100 py-2"
          disabled={!profileFormik.isValid || submitting}
        >
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Submitting...
            </>
          ) : (
            'Submit Profile'
          )}
        </button>
      </form>

      
      {uploadedImageUrls.length > 0 && (
        <div className="mt-4">
          <h5>Uploaded Image</h5>
          <div className="d-flex flex-wrap gap-3 mt-2">
            {uploadedImageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index}`}
                style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsForm;
