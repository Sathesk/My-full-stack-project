import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import userService from '../../Components/Services/UserService';
import { useAuth } from '../../Contexts/AuthContext';
import './../../Styles/ProfileForm.css';

const ProfileForm = ({ onSave }) => {
  const { token, user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      userId: '',
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      description: '',
      profileImage: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const updatedProfile = {
          ...values,
          profilePictureUrl: previewImage,
        };
        delete updatedProfile.profileImage;
        await userService.updateUserProfile(values.userId, updatedProfile, token);
        toast.success('Profile updated!');
        onSave();
      } catch (error) {
        toast.error('Update failed');
        console.error('Update error:', error);
      }
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await userService.getUserByUsername(currentUser.username);
        formik.setValues({
          ...userResponse.data,
          profileImage: null,
        });
        if (userResponse.data.profilePictureUrl) {
          setPreviewImage(userResponse.data.profilePictureUrl);
        }
      } catch (error) {
        toast.error('Failed to load profile data');
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.username) {
      fetchData();
    }
  }, [currentUser]);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      formik.setFieldValue('profileImage', file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  }, [formik]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    maxFiles: 1,
  });

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <h1>{formik.values.firstName || 'Your Name'} {formik.values.lastName}</h1>
          <p>New York, USA</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="form-section">
          <h3>Personal Data</h3>

          
          <div className="form-container">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group-row">
                <div {...getRootProps()} className="dropzone rounded-circle">
                  <input {...getInputProps()} name="profileImage" />
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      style={{
                        width: '150px',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '50%',
                      }}
                    />
                  ) : (
                    <span style={{ color: '#6c757d', textAlign: 'center' }}>
                      Drag & drop or click to select profile picture
                    </span>
                  )}
                </div>

                <div className="user-info-columns">
                  <div className="form-group mb-3">
                    <label>User ID</label>
                    <input type="text" className="form-control" value={formik.values.userId} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" value={formik.values.username} readOnly />
                  </div>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="invalid-feedback">{formik.errors.firstName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="invalid-feedback">{formik.errors.lastName}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    rows="3"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary save-btn">Update Profile</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
