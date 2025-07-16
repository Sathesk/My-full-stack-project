import React, { useContext } from 'react';
import { WishlistContext } from '../../Contexts/WishlistContextProvider';
import { CartContext } from '../../Contexts/CartContextProvider';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const { wishlistItems = [], removeFromWishlist } = useContext(WishlistContext) || {};
  const { addToCart } = useContext(CartContext) || {};

  return (
    <>
      <div className="Page-section mb-5 text-center">
        <p className="text-muted">
          <Link to="/">Home</Link> / Wishlist
        </p>
        <h2 className="fw-bold">My Wishlist</h2>
      </div>

      <div className="container">
        {wishlistItems.length === 0 ? (
          <div className="alert alert-danger text-center">No Items in Wishlist</div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle text-center">
              <thead className="bg-light">
                <tr>
                  <th className="product-name w1-text fw-normal">Product</th>
                  <th className="product-name w1-text fw-normal">Price</th>
                  <th className="product-name w1-text fw-normal hide-element">Stock Status</th>
                  <th className="product-name w1-text fw-normal">Action</th>
                  <th className="product-name w1-text fw-normal">Remove</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((product) => (
                  <tr key={product.productId}>
                    <td className="d-flex align-items-center gap-3 text-start">
                      <img
                        src={product.productImageUrl}
                        alt={product.productName}
                        width={80}
                        height={80}
                        className="border rounded"
                      />
                      <div>
                        <p className="product-name w1-name m-0">{product.productName}</p>
                        <p className="mb-0 text-muted w1-name" style={{ fontSize: '14px' }}>
                          {product.description || 'Short description here'}
                        </p>
                      </div>
                    </td>
                    <td className="product-name fs-6">${product.price}</td>
                    <td className="text-success hide-element">In Stock</td>
                    <td>
                      <button
                        className="btn btn-success w1-btn"
                        onClick={() => {
                          addToCart(product);
                          toast.success(`${product.productName} added to cart!`);
                        }}
                      >
                        <span className="hide-element">
                          <i className="ri-shopping-cart-line me-2"></i>Add to Cart
                        </span>
                        <i className="ri-shopping-cart-line me-2 small-screen-icon"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger w1-btn"
                        onClick={() => {
                          removeFromWishlist(product.productId);
                          toast.success(`${product.productName} removed from Wishlist!`);
                        }}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
