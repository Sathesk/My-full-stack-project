import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import productService from '../../Services/ProductService';
import userService from '../../Services/UserService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { useAuth } from '../../../Contexts/AuthContext';
import { toast } from 'react-toastify';
import '../../../Styles/ProductDetails.css'; // Create this CSS file for custom styles

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const { user: currentUser } = useAuth();
    const [userId, setUserId] = useState(null);

    // Fetch user ID
    useEffect(() => {
        const fetchUserId = async () => {
            if (!currentUser?.username) return;
            
            try {
                setUserLoading(true);
                const userResponse = await userService.getUserByUsername(currentUser.username);
                setUserId(userResponse.data.userId);
            } catch (error) {
                console.error('Error fetching userId:', error);
                toast.error('Failed to load user information');
            } finally {
                setUserLoading(false);
            }
        };
        fetchUserId();
    }, [currentUser]);

    // Fetch products when userId changes
    useEffect(() => {
        const fetchProducts = async () => {
            if (!userId) return;
            
            try {
                setLoading(true);
                const response = await productService.getProductsBySellerId(userId);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products', error);
                toast.error('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [userId]);

    return (
        <div className="profile-content">
            <div className="form-section">
                <h3>Your Products</h3>
                <div className='container my-5 pb-5 position-relative'>
                    <div className="row">
                        <div className="section-title d-flex flex-column justify-content-center align-items-center">
                            <h2>Your Inventory</h2>
                            <h1>MANAGE PRODUCTS</h1>
                        </div>
                    </div>

                    {userLoading || loading ? (
                        <div className='text-center py-5'>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : products.length > 0 ? (
                        <>
                            <Swiper
                                slidesPerView={4}
                                spaceBetween={20}
                                modules={[Navigation]}
                                navigation={{
                                    nextEl: ".product-swiper-next",
                                    prevEl: ".product-swiper-prev",
                                }}
                                breakpoints={{
                                    0: { slidesPerView: 1 },
                                    640: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    1024: { slidesPerView: 4 },
                                }}
                                className='mt-4 swiper'
                            >
                                {products.map((product) => (
                                    <SwiperSlide key={product.productId}>
                                        <div className="product-card text-center border rounded">
                                            <div className="position-relative product-img-container">
                                                <img 
                                                    src={product.productImageUrl} 
                                                    className='img-fluid product-img main-img' 
                                                    alt={product.productName}
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                                                    }} 
                                                />
                                            </div>
                                            <div className="product-info mt-4 p-3">
                                                <h5 className="mt-3">{product.productName}</h5>
                                                <div className="text-warning mb-2 stars">
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-half"></i>
                                                </div>
                                                <div className="mb-1 product-price">
                                                    <span>${product.price}</span>
                                                    {product.discountPrice && (
                                                        <span className="text-muted text-decoration-line-through ms-2">
                                                            ${product.discountPrice}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className='small text-muted'>
                                                    {product.categoryName} • {product.stockQuantity} in stock
                                                </p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="product-swiper-prev product-swiper-btn">
                                <i className="ri-arrow-left-s-line"></i>
                            </div>
                            <div className="product-swiper-next product-swiper-btn">
                                <i className="ri-arrow-right-s-line"></i>
                            </div>
                        </>
                    ) : (
                        <div className='text-center py-5'>
                            <div className="alert alert-info">
                                <i className="bi bi-info-circle me-2"></i>
                                {userId ? 'You have no products yet.' : 'Please login to view your products.'}
                            </div>
                            <button className="btn btn-primary mt-3">
                                <i className="bi bi-plus-circle me-2"></i> Add New Product
                            </button>
                        </div>
                    )}
                </div>  
            </div>
        </div>
    );
};

export default ProductDetails;