import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../Contexts/AuthContext';
import userService from '../../Components/Services/UserService';
import imageService from '../Services/ImageService';
import productService from '../Services/ProductService';
import './../../Styles/ProductForm.css';

const ProductsForm = () => {
  const { token, user } = useAuth();
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState('');
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  useEffect(() => {
    if (!user?.username) {
      toast.error("User information not available. Please log in again.");
      return;
    }
    const fetchUserId = async () => {
      try {
        const response = await userService.getUserByUsername(user.username);
        setUserId(response.data.userId);
      } catch (error) {
        toast.error("Failed to load user data.");
        console.error("Error fetching userId:", error);
      }
    };
    fetchUserId();
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
    initialValues: { file: null },
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

        const imageUrl = response.imageUrl;
        if (imageUrl) {
          toast.success('Image uploaded successfully!');
          setUploadedImageUrls([imageUrl]);
          formik.setFieldValue('productImageUrl', imageUrl);
          imageFormik.resetForm();
          setPreview(null);
        } else {
          toast.warn('Upload succeeded but no imageUrl returned.');
        }
      } catch (error) {
        const err = imageService.handleError(error);
        toast.error(err.message || 'Image upload failed');
      } finally {
        setUploading(false);
      }
    }
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: '',
      description: '',
      brand: '',
      manufacturer: '',
      price: '',
      discountPrice: '',
      stockQuantity: '',
      stockStatus: '',
      categoryId: '',
      subCategoryId: '',
      color: '',
      size: '',
      material: '',
      productImageUrl: '',
      sellerId: userId,
    },
    validationSchema: Yup.object({
      productName: Yup.string().required('Product name is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setSubmitting(true);
        const payload = {
          ...values,
          price: parseFloat(values.price),
          discountPrice: parseFloat(values.discountPrice),
          stockQuantity: parseInt(values.stockQuantity),
          categoryId: parseInt(values.categoryId),
          subCategoryId: parseInt(values.subCategoryId),
          productName: values.productName.trim(),
          brand: values.brand.trim(),
          manufacturer: values.manufacturer.trim(),
          stockStatus: values.stockStatus.trim(),
          color: values.color.trim(),
          size: values.size.trim(),
          material: values.material.trim(),
          productImageUrl: values.productImageUrl.trim(),
          sellerId: userId,
        };

        const response = await productService.addProducts(payload);
        toast.success("Product submitted successfully!");
        resetForm();
        setUploadedImageUrls([]);
      } catch (err) {
        console.error('Product submission error:', err);
        toast.error('Product submission failed.');
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Add New Product</h3>

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
        <button type="submit" className="btn btn-primary mt-3" disabled={uploading || !imageFormik.values.file}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      <form onSubmit={formik.handleSubmit} className="mt-5">
        <div className="form-grid">
          {[
            { name: 'productName', label: 'Product Name' },
            { name: 'brand', label: 'Brand' },
            { name: 'manufacturer', label: 'Manufacturer' },
            { name: 'price', label: 'Price' },
            { name: 'discountPrice', label: 'Discount Price' },
            { name: 'stockQuantity', label: 'Stock Quantity' },
            { name: 'stockStatus', label: 'Stock Status' },
            { name: 'categoryId', label: 'Category ID' },
            { name: 'subCategoryId', label: 'Sub Category ID' },
            { name: 'color', label: 'Color' },
            { name: 'size', label: 'Size' },
            { name: 'material', label: 'Material' },
          ].map((field) => (
            <div className="mb-3" key={field.name}>
              <label className="form-label">{field.label}</label>
              <input
                type="text"
                className={`form-control ${formik.touched[field.name] && formik.errors[field.name] ? 'is-invalid' : ''}`}
                {...formik.getFieldProps(field.name)}
                disabled={submitting}
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div className="invalid-feedback">{formik.errors[field.name]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            rows="4"
            className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
            {...formik.getFieldProps('description')}
            disabled={submitting}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="invalid-feedback">{formik.errors.description}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Product Image URL (auto-filled)</label>
          <input
            type="text"
            className="form-control"
            {...formik.getFieldProps('productImageUrl')}
            disabled
          />
        </div>

        <button type="submit" className="btn btn-success w-100 py-2" disabled={!formik.isValid || submitting}>
          {submitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Submitting...
            </>
          ) : (
            'Submit Product'
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

export default ProductsForm;
