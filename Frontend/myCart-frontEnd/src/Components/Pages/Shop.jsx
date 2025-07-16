import React, { useContext, useEffect, useRef, useState } from 'react';
import BuyerNav from '../Layout/BuyerNav';

import productService from './../../Components/Services/ProductService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './../../Styles/Shop.css';
import { useAuth } from '../../Contexts/AuthContext';
import userService from '../Services/UserService';
import { WishlistContext } from '../../Contexts/WishlistContextProvider';
import { CartContext } from '../../Contexts/CartContextProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Shop = ({ onSave }) => {
  const { user: currentUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(0);

  const { addToCart } = useContext(CartContext) || {};
  const { addToWishlist } = useContext(WishlistContext) || {};

  const swiperRef = useRef(null);
  const [sortOption, setSortOption] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await userService.getUserByUsername(currentUser.username);
        if (userResponse.data.sellerId) {
          setUserId(userResponse.data.sellerId);
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

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiperInstance = swiperRef.current.swiper;

      const animateSlide = (slide) => {
        const heroWrap = slide.querySelector('.hero-wrap, .hero-wrap2');
        if (heroWrap) {
          heroWrap.style.animation = 'none';
          void heroWrap.offsetWidth;
          heroWrap.style.animation = 'backgroundZoomIn 1.5s ease-out forwards';
        }
      };

      animateSlide(swiperInstance.slides[swiperInstance.activeIndex]);

      swiperInstance.on('slideChangeTransitionStart', () => {
        animateSlide(swiperInstance.slides[swiperInstance.activeIndex]);
      });

      return () => {
        swiperInstance.off('slideChangeTransitionStart');
      };
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.getAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <BuyerNav />
      {/* Header Section */}
      <div className="header-hero row mb-4">
        <div className="col-12" style={{ paddingTop: '160px', paddingLeft: '60px' }}>
          <h1 className="fw-bold mb-2">Summer Collection</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item text-ligh">
                <a href="">Home</a>
              </li>
              <li className="breadcrumb-item active text-light" aria-current="page">
                Listing Modern
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container py-4">
        {/* Filter/Sort Section */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="d-flex align-items-center">
              <span className="me-3">Store S.M</span>
              <div className="input-group" style={{ width: '150px' }}>
                <select className="form-select form-select-sm">
                  <option>$0 to $500</option>
                  <option>$500 to $1000</option>
                  <option>Above $1000</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-outline-dark btn-sm dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                SORT
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" onClick={() => handleSortChange('default')}>
                    Default
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSortChange('price-low-high')}>
                    Price: Low to High
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSortChange('price-high-low')}>
                    Price: High to Low
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSortChange('name-asc')}>
                    Name: A-Z
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={() => handleSortChange('name-desc')}>
                    Name: Z-A
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {currentProducts.map((product, index) => (
            <div className="col" key={index}>
              <div className="card h-100 border-0 product-card text-center rounded">
                <div className="position-relative product-image-container">
                  <img src={product.productImageUrl} alt={product.productName} className="img-fluid product-image main-image" />
                  <img
                    src={product.secondImageUrl || product.productImageUrl}
                    alt={product.productName}
                    className="img-fluid product-image hover-image"
                  />
                  <div className="product-option position-absolute">
                    <i
                      className="bi bi-heart"
                      role="button"
                      onClick={() => {
                        addToWishlist &&
                          addToWishlist({
                            productId: product.productId,
                            productName: product.productName,
                            price: product.price,
                            productImageUrl: product.productImageUrl,
                            description: product.description,
                          });
                      }}
                    ></i>
                  </div>
                  <button
                    className="btn add-cart-btn position-absolute"
                    onClick={() => {
                      addToCart &&
                        addToCart({
                          id: product.productId,
                          name: product.productName,
                          price: product.price,
                          image: product.productImageUrl,
                          quantity: 1,
                        });
                      toast.success(`${product.productName} added to cart!`);
                    }}
                  >
                    {' '}
                    ADD TO CART{' '}
                  </button>
                </div>
                <div className="card-body px-0">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text fw-bold">${product.price.toLocaleString()}</p>
                  <div className="text-warning mb-2 stars">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-half"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation" className="mt-5">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                &laquo;
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}

            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Shop;
