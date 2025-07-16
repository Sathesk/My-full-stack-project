import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import addressService from '../../Components/Services/AddressService';
import { useAuth } from '../../Contexts/AuthContext';
import userService from '../../Components/Services/UserService';

const AddressDetailsForm = ({ 
  onComplete = () => {},
  initialValues = null,
  isAdmin = false
}) => {
  const { token, user: currentUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const ADDRESS_TYPES = [
    { value: 'HOME', label: 'Home Address' },
    { value: 'OFFICE', label: 'Office Address' }
  ];

  // Fetch public user IDs list for admin
  useEffect(() => {
    if (isAdmin) {
      setLoadingUsers(true);
      userService.getAllPublicUsers(token)
        .then(response => {
          setUsers(response.data);
          setLoadingUsers(false);
        })
        .catch(err => {
          console.error('Error fetching users:', err);
          toast.error('Failed to load users list');
          setLoadingUsers(false);
        });
    }
  }, [isAdmin, token]);

  const formik = useFormik({
    initialValues: initialValues || {
      userId: currentUser?.userId || '', // Using public userId
      addressType: '',
      streetName: '',
      city: '',
      zip: '',
      country: ''
    },
    validationSchema: Yup.object({
      userId: Yup.string()
        .required('User ID is required')
        .matches(/^[a-zA-Z0-9_-]+$/, 'Invalid user ID format'),
      addressType: Yup.string()
        .required('Address type is required')
        .oneOf(ADDRESS_TYPES.map(t => t.value), 'Invalid address type'),
      streetName: Yup.string()
        .required('Street name is required')
        .max(100, 'Street name too long'),
      city: Yup.string()
        .required('City is required')
        .max(50, 'City name too long'),
      zip: Yup.string()
        .required('ZIP code is required')
        .max(20, 'ZIP code too long'),
      country: Yup.string()
        .required('Country is required')
        .max(50, 'Country name too long')
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      setSubmitting(true);
      
      try {
        // Include both userId (public) and userAuthId (private) in the request
        const addressDto = {
          addressType: values.addressType,
          streetName: values.streetName.trim(),
          city: values.city.trim(),
          zip: values.zip.trim(),
          country: values.country.trim(),
          userId: values.userId, // Public user ID
          // Server will map this to userAuthId internally
        };

        console.log("Submitting address for user:", values.userId);
        
        let response;
        if (initialValues?.addressId) {
          response = await addressService.updateUserAddress({
            ...addressDto,
            addressId: initialValues.addressId
          }, token);
          toast.success('Address updated successfully!');
        } else {
          response = await addressService.addUserAddress(addressDto, token);
          toast.success('Address added successfully!');
        }
        
        resetForm();
        onComplete(response.data);
      } catch (err) {
        console.error('Address submission error:', err);
        
        let errorMessage = 'Failed to save address. Please try again.';
        
        if (err.response) {
          if (err.response.status === 404) {
            errorMessage = 'User not found';
          } else if (err.response.status === 409) {
            errorMessage = 'Address already exists for this user';
          } else if (err.response.data?.message) {
            errorMessage = err.response.data.message;
          }
        }
        
        toast.error(errorMessage);
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">
        {initialValues ? 'Update' : 'Add'} Address
      </h3>
      
      <form onSubmit={formik.handleSubmit}>
        {/* User ID Field - shows different inputs based on admin status */}
        <div className="mb-4">
          <label className="form-label">
            User Identifier <span className="text-danger">*</span>
            <small className="text-muted ms-2">(Public user ID, not authentication ID)</small>
          </label>
          
          {isAdmin ? (
            loadingUsers ? (
              <div className="d-flex align-items-center">
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Loading users...
              </div>
            ) : (
              <select
                className={`form-select ${
                  formik.touched.userId && formik.errors.userId ? 'is-invalid' : ''
                }`}
                name="userId"
                value={formik.values.userId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={submitting || loadingUsers || !!initialValues?.userId}
              >
                <option value="">Select a user</option>
                {users.map(user => (
                  <option key={user.userId} value={user.userId}>
                    {user.username} (ID: {user.userId})
                  </option>
                ))}
              </select>
            )
          ) : (
            <>
              <input
                type="text"
                className={`form-control ${
                  formik.touched.userId && formik.errors.userId ? 'is-invalid' : ''
                }`}
                name="userId"
                value={formik.values.userId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={submitting || !!initialValues?.userId}
                placeholder="Enter public user ID"
              />
              {!initialValues?.userId && (
                <small className="text-muted">Your user ID: {currentUser?.userId}</small>
              )}
            </>
          )}
          
          {formik.touched.userId && formik.errors.userId && (
            <div className="invalid-feedback">{formik.errors.userId}</div>
          )}
        </div>

        {/* Address Type Selection */}
        <div className="mb-4">
          <label className="form-label">
            Address Type <span className="text-danger">*</span>
          </label>
          <select
            className={`form-select ${
              formik.touched.addressType && formik.errors.addressType ? 'is-invalid' : ''
            }`}
            name="addressType"
            value={formik.values.addressType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={submitting || !!initialValues?.addressType}
          >
            <option value="">Select address type</option>
            {ADDRESS_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {formik.touched.addressType && formik.errors.addressType && (
            <div className="invalid-feedback">{formik.errors.addressType}</div>
          )}
        </div>

        {/* Address Fields */}
        {[
          { name: 'streetName', label: 'Street Address' },
          { name: 'city', label: 'City' },
          { name: 'zip', label: 'ZIP/Postal Code' },
          { name: 'country', label: 'Country' }
        ].map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label">
              {field.label} <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className={`form-control ${
                formik.touched[field.name] && formik.errors[field.name] ? 'is-invalid' : ''
              }`}
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={submitting}
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div className="invalid-feedback">{formik.errors[field.name]}</div>
            )}
          </div>
        ))}

        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => onComplete()}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary px-4"
            disabled={!formik.isValid || submitting}
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {initialValues ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              initialValues ? 'Update Address' : 'Add Address'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressDetailsForm;