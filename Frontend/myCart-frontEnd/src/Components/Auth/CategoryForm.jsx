import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import categoryService from '../Services/CategoryService';
import '../../Styles/ProductForm.css';
import subCategoryService from '../Services/SubCategoryService';

const CategoryForm = () => {
    const [submitting, setSubmitting] = useState(false);
    const [activeForm, setActiveForm] = useState('category');

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            categoryName:''
        },
        validationSchema: Yup.object({
            categoryName: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                setSubmitting(true);
                const categoryDto = {
                    ...values,
                    categoryName: values.categoryName.trim(),
                };

                console.log('New Category Submitted:', categoryDto);
                const response = await categoryService.addNewCategory(categoryDto);
                toast.success('Category Added Successfully!');
                formik.resetForm();
            } catch (error) {
                toast.error('Submission failed');
                console.error('Submit error:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    const subformik = useFormik({
        enableReinitialize: true,
        initialValues: {
            subCategoryName:'',
            categoryId:'',
        },
        validationSchema: Yup.object({
            subCategoryName: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                setSubmitting(true);
                const subCategoryDto = {
                    ...values,
                    subCategoryName: values.subCategoryName.trim(),
                };

                console.log('New Sub Category Submitted:', subCategoryDto);
                const response = await subCategoryService.addNewSubCategory(subCategoryDto);
                toast.success('Sub Category Added Successfully!');
                subformik.resetForm();
            } catch (error) {
                toast.error('Submission failed');
                console.error('Submit error:', error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container-fluid p-0">
            <div className="d-flex">
                {/* Sidebar */}
                <div className="bg-light p-4" style={{ width: '250px', minHeight: '100vh' }}>
                    <div className="mb-4">
                        <h1 className="h5 fw-bold">Category Form</h1>
                    </div>

                    <hr className="my-3" />

                    <div className="mb-4">
                        <h2 className="h6 fw-bold mb-3">Category Sections</h2>
                        <ul className="list-unstyled">
                            <li 
                                className={`mb-2 cursor-pointer ${activeForm === 'category' ? 'fw-bold text-primary' : ''}`}
                                onClick={() => setActiveForm('category')}
                            >
                                Category
                            </li>
                            <li 
                                className={`mb-2 cursor-pointer ${activeForm === 'subcategory' ? 'fw-bold text-primary' : ''}`}
                                onClick={() => setActiveForm('subcategory')}
                            >
                                Sub Category
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-grow-1 p-4">
                    {/* Category Form */}
                    <div 
                        className={`profile-page ${activeForm === 'category' ? 'd-block' : 'd-none'}`}
                    >
                        <div className="profile-header bg-primary text-white p-3 mb-4 rounded">
                            <h1 className="h4 mb-0">Add New Category</h1>
                        </div>

                        <div className="profile-content bg-white p-4 rounded shadow-sm">
                            <div className="form-section">
                                <h3 className="h5 mb-4 pb-2 border-bottom">Category Details</h3>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="row g-3 mb-4">
                                        {[
                                            { name: 'categoryName', label: 'Category Name' },
                                        ].map((field) => (
                                            <div className="col-md-6" key={field.name}>
                                                <div className="mb-3">
                                                    <label className="form-label small text-muted text-uppercase fw-bold">
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control rounded-0 ${
                                                            formik.touched[field.name] && formik.errors[field.name] 
                                                                ? 'is-invalid' 
                                                                : ''
                                                        }`}
                                                        {...formik.getFieldProps(field.name)}
                                                        disabled={submitting}
                                                    />
                                                    {formik.touched[field.name] && formik.errors[field.name] && (
                                                        <div className="invalid-feedback small">
                                                            {formik.errors[field.name]}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="form-actions mt-4 pt-3 border-top">
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4 rounded-0"
                                            disabled={!formik.isValid || submitting}
                                        >
                                            {submitting ? (
                                                <>
                                                    <span 
                                                        className="spinner-border spinner-border-sm me-2" 
                                                        role="status" 
                                                        aria-hidden="true"
                                                    ></span>
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit Category'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Sub Category Form */}
                    <div 
                        className={`profile-page ${activeForm === 'subcategory' ? 'd-block' : 'd-none'}`}
                    >
                        <div className="profile-header bg-primary text-white p-3 mb-4 rounded">
                            <h1 className="h4 mb-0">Add New Sub Category</h1>
                        </div>

                        <div className="profile-content bg-white p-4 rounded shadow-sm">
                            <div className="form-section">
                                <h3 className="h5 mb-4 pb-2 border-bottom">Sub Category Details</h3>
                                <form onSubmit={subformik.handleSubmit}>
                                    <div className="row g-3 mb-4">
                                        {[
                                            { name: 'subCategoryName', label: 'Sub Category Name' },
                                            { name: 'categoryId', label: 'Category ID' },
                                        ].map((field) => (
                                            <div className="col-md-6" key={field.name}>
                                                <div className="mb-3">
                                                    <label className="form-label small text-muted text-uppercase fw-bold">
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className={`form-control rounded-0 ${
                                                            subformik.touched[field.name] && subformik.errors[field.name] 
                                                                ? 'is-invalid' 
                                                                : ''
                                                        }`}
                                                        {...subformik.getFieldProps(field.name)}
                                                        disabled={submitting}
                                                    />
                                                    {subformik.touched[field.name] && subformik.errors[field.name] && (
                                                        <div className="invalid-feedback small">
                                                            {subformik.errors[field.name]}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="form-actions mt-4 pt-3 border-top">
                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4 rounded-0"
                                            disabled={!subformik.isValid || submitting}
                                        >
                                            {submitting ? (
                                                <>
                                                    <span 
                                                        className="spinner-border spinner-border-sm me-2" 
                                                        role="status" 
                                                        aria-hidden="true"
                                                    ></span>
                                                    Submitting...
                                                </>
                                            ) : (
                                                'Submit Sub Category'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;