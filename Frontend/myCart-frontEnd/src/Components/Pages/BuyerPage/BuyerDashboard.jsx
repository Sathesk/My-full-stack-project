import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper/modules'
import { Link } from 'react-router-dom';
import BuyerNav from '../../Layout/BuyerNav';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import './../../../Styles/BuyerDashboard.css';
import productService from '../../Services/ProductService';

const BuyerDashboard = () => {

  const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
  const swiperRef = useRef(null);
    const [sortOption, setSortOption] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
  
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
          }finally{
            setLoading(false);
          }
        };
        fetchProducts();
      }, []);
    
    
  
    // Sort products based on selected option
    const sortedProducts = [...products].sort((a, b) => {
      switch(sortOption) {
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
  
    // Pagination logic
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
        <div className=" header-hero row mb-4" >
          <div className="col-12" style={{ paddingTop: '160px', paddingLeft: '60px' }}>
            <h1 className="fw-bold mb-2">Summer Collection</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item text-ligh"><a href="">Home</a></li>
                <li className="breadcrumb-item active text-light" aria-current="page">Listing Modern</li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container  py-4" >
        
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
                <li><button className="dropdown-item" onClick={() => handleSortChange('default')}>Default</button></li>
                <li><button className="dropdown-item" onClick={() => handleSortChange('price-low-high')}>Price: Low to High</button></li>
                <li><button className="dropdown-item" onClick={() => handleSortChange('price-high-low')}>Price: High to Low</button></li>
                <li><button className="dropdown-item" onClick={() => handleSortChange('name-asc')}>Name: A-Z</button></li>
                <li><button className="dropdown-item" onClick={() => handleSortChange('name-desc')}>Name: Z-A</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Product Card */}
      <div className="container mt-4" style={{marginTop:'80px'}}>
        <div className="row product-list">
          {currentProducts.map((product) => (
            <div key={product.productId} className="col-md-3 mb-4" style={{height: "500px", width:"400px"}}>
              <Link to={`/product/${product.productId}`} className="text-decoration-none">
                <div 
                  className="product-card card h-100 border-0 shadow-sm"
                  style={{
                    backgroundImage: `url(${product.productImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                >
                  <div className="card-body d-flex flex-column justify-content-end"
                  
                  >
                    <h5 className="card-title mb-1" style={{position: "relative", color:'white', fontSize:'1.5rem',fontWeight:'300'}}>{product.productName}</h5>
                    {product.price && (
                      <p className="card-text fw-bold mb-0" style={{color:'white', fontSize:'3rem', }}>${product.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
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

export default BuyerDashboard;