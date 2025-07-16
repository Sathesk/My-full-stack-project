import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authService from '../../Components/Services/AuthService';
import { useAuth } from '../../Contexts/AuthContext';
import { toast } from 'react-toastify';
import './../../Styles/HomeNav.css';

const SignupForm = () => {
  const { login } = useAuth();
  const [userType, setUserType] = useState('BUYER');
  const [registering, setRegistering] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      setRegistering(true);
      try {
        const payload = {
          username: values.username,
          email: values.email,
          password: values.password,
          role: userType
        };

        await authService.register(payload);
        await login({ username: values.username, password: values.password });

        resetForm();
        const modal = bootstrap.Modal.getInstance(document.getElementById('signupModel'));
        modal?.hide();
      } catch (error) {
        const msg = error.response?.data?.error;
        if (msg) {
          if (msg.toLowerCase().includes('username')) {
            setFieldError('username', msg);
          } else if (msg.toLowerCase().includes('email')) {
            setFieldError('email', msg);
          } else {
            toast.error(msg);
          }
        } else {
          toast.error('Registration failed');
        }
      }
      setRegistering(false);
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='mb-3'>
        <label className='form-label'>User Name</label>
        <input type="text"
          className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
          placeholder='Enter your name'
          {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <div className='invalid-feedback'>{formik.errors.username}</div>
        )}
      </div>

      <div className='mb-3'>
        <label className='form-label'>Email address</label>
        <input type="email"
          className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
          placeholder='Enter email'
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='invalid-feedback'>{formik.errors.email}</div>
        )}
      </div>

      <div className='mb-3'>
        <label className='form-label'>Password</label>
        <input type="password"
          className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
          placeholder='Enter password'
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='invalid-feedback'>{formik.errors.password}</div>
        )}
      </div>

      <div className='mb-3'>
        <label className='form-label'>Select User Type</label>
          <div className='user-type-container'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='radio'
                name='userType'
                id='buyerRadio'
                value='BUYER'
                checked={userType === 'BUYER'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <label className='form-check-label' htmlFor='buyerRadio'>BUYER</label>
            </div>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='userType'
              id='supplierRadio'
              value='SUPPLIER'
              checked={userType === 'SUPPLIER'}
              onChange={(e) => setUserType(e.target.value)}
            />
            <label className='form-check-label' htmlFor='supplierRadio'>SUPPLIER</label>
          </div>
        </div>
      </div>

      <button type='submit' className='btn text-white btn-signup w-100' disabled={formik.isSubmitting || registering}>
        {registering ? 'Registering...' : 'Sign Up'}
      </button>

      <div className='text-center mt-3'>
        <p className='mb-0 terms'>
          Already have an account? <a href="#" className='fw-bold' data-bs-toggle="modal" data-bs-target="#loginModel" data-bs-dismiss="modal">Sign in</a>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
