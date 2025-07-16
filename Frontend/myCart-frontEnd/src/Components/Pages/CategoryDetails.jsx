import React, { useEffect, useState } from 'react'
import '../../Styles/CategoryDetails.css'
import categoryService from '../Services/CategoryService';
import subCategoryService from '../Services/SubCategoryService';

const CategoryDetails = () => {

    const [categories, setCategories] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    // Sample orders data
  

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const response = await categoryService.getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }finally{
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchSubCategory = async () => {
      setLoading(true);
      try {
        const response = await subCategoryService.getAllSubCategories();
        setSubCategory(response.data);
      } catch (error) {
        console.error('Error fetching sub categories', error);
      }finally{
        setLoading(false);
      }
    };
    fetchSubCategory();
  }, []);

  return (
    <>
        <div className="container-fluid p-0">
      <div className="d-flex">
        {/* Sidebar - similar to previous examples */}
        <div className="bg-light p-4" style={{ width: '250px', minHeight: '100vh' }}>
          {/* Sidebar content would go here */}
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <h1 className="h4 mb-4">Category</h1>
            
            {categories.map((categories) => (
              <div key={categories.categoryId} className="mb-4 pb-4 border-bottom">
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 mb-0">{categories.categoryId}</h2>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="h5 mb-0">{categories.categoryName}</p>
                </div>
                
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <div className="bg-white p-4 rounded shadow-sm">
            <h1 className="h4 mb-4">Sub Category</h1>
            
            {subCategory.map((subCategory) => (
              <div key={subCategory.subCategoryId} className="mb-4 pb-4 border-bottom">
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 mb-0">Category - {subCategory.categoryId}</h2>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h5 mb-0">Sub Category - {subCategory.subCategoryId}</h2>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="h5 mb-0">{subCategory.subCategoryName}</p>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CategoryDetails