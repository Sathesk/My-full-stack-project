import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './../src/Contexts/AuthContext.jsx';
import WishlistContextProvider from './Contexts/WishlistContextProvider';
import CartContextProvider from './Contexts/CartContextProvider';

import Index from './../src/Components/Pages/Index.jsx';
import About from './../src/Components/Pages/About.jsx';
import Blog from './../src/Components/Pages/Blog.jsx';
import Contact from './../src/Components/Pages/Contact.jsx';
import Footer from './../src/Components/Footer/Footer.jsx';
import Shop from './Components/Pages/Shop.jsx';

import BuyerDashboard from './../src/Components/Pages/BuyerPage/BuyerDashboard.jsx';
import SupplierDashboard from './../src/Components/Pages/SupplierPage/SupplierDashboard.jsx';

import { ToastContainer } from 'react-toastify';
import ProfileForm from './Components/Auth/ProfileForm.jsx';
import ProductsForm from './Components/Auth/ProductsForm.jsx';
import CategoryForm from './Components/Auth/CategoryForm.jsx';
import CategoryDetails from './Components/Pages/CategoryDetails.jsx';
import ProductDetails from './Components/Pages/SupplierPage/ProductDetails.jsx';
import Wishlist from './Components/Pages/Wishlist.jsx';
import Carts from './Components/Pages/Carts.jsx';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthProvider>
      <WishlistContextProvider>
        <CartContextProvider>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/about' element={<About />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/carts' element={<Carts/>}/>

            <Route
              path="/buyer/dashboard"
              element={
                <ProtectedRoute>
                  <BuyerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/supplier"
              element={
                <ProtectedRoute>
                  <SupplierDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="profile" element={<ProfileForm />} />
              <Route path="productsForm" element={<ProductsForm />} />
              <Route path="categories" element={<CategoryForm />} />
              <Route path="categoryDetails" element={<CategoryDetails />} />
              <Route path="productDetails" element={<ProductDetails />} />
            </Route>
          </Routes>

          <Footer />
          <ToastContainer />
        </CartContextProvider>
      </WishlistContextProvider>
    </AuthProvider>
  );
};

export default App;
