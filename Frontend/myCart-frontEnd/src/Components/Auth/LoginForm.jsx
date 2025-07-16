import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../Contexts/AuthContext';
import './../../Styles/HomeNav.css';
const LoginForm = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values);
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModel'));
        modal?.hide();
      } catch {
        // error is already handled in context
      }
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='mb-3'>
        <label className='form-label'>Username</label>
        <input
          type="text"
          className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
          {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <div className="invalid-feedback">{formik.errors.username}</div>
        )}
      </div>

      <div className='mb-3'>
        <label className='form-label'>Password</label>
        <input
          type="password"
          className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="invalid-feedback">{formik.errors.password}</div>
        )}
      </div>

      <button type='submit' className='btn text-white btn-signup w-100' disabled={formik.isSubmitting}>
        {formik.isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      <div className='text-center mt-3'>
        <p className='mb-0 terms'>
          Don't have an account?{' '}
          <a
            href='#'
            className='fw-bold'
            data-bs-toggle="modal"
            data-bs-target="#signupModel"
            data-bs-dismiss="modal"
          >
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
