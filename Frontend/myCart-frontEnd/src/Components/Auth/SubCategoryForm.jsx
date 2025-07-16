import React from 'react'
import subCategoryService from '../Services/SubCategoryService';

const SubCategoryForm = () => {

    const [submitting, setSubmitting] = useState(false);

    const formik = useFormik({
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
  return (
    <div className="container-fluid p-0">
            <div className="d-flex">
                {/* Sidebar - Similar to your reference image */}
                <div className="bg-light p-4" style={{ width: '250px', minHeight: '100vh' }}>
                    <div className="mb-4">
                        <h1 className="h5 fw-bold">Add New Sub Category</h1>
                    </div>

                    <hr className="my-3" />

                    <div className="mb-4">
                        <h2 className="h6 fw-bold mb-3">Category Sections</h2>
                        <ul className="list-unstyled">
                            <li className="mb-2">Category</li>
                            <li className="mb-2">Sub Category</li>
                        </ul>
                    </div>
                </div>

                
            </div>
        </div>
  )
}

export default SubCategoryForm