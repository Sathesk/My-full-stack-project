import React, { useContext } from 'react';
import { CartContext } from '../../Contexts/CartContextProvider';
import { Link } from 'react-router-dom';

const Carts = () => {
  const { cartItems, removeFromCart, updateQuantity, total } = useContext(CartContext);

  return (
    <>
      <div className="Page-section mb-5 text-center">
        <p className="text-muted">
          <Link to="/">Home</Link> / Cart
        </p>
        <h2 className="fw-bold">Carts</h2>
      </div>

      <section className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2 className="mb-4">Shopping Cart</h2>
              {cartItems.length === 0 ? (
                <div className="alert alert-danger text-center">No Items in Cart!</div>
              ) : (
                <div className="table-responsive product-cart-wrap">
                  <table className="table align-middle text-center">
                    <thead className="table-light w-100">
                      <tr>
                        <th className="product-name w1-text fw-normal">Product</th>
                        <th className="product-name w1-text fw-normal">Price</th>
                        <th className="product-name w1-text fw-normal hide-element">Stock Status</th>
                        <th className="product-name w1-text fw-normal">Quantity</th>
                        <th className="product-name w1-text fw-normal">Total</th>
                        <th className="product-name w1-text fw-normal">Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="text-start d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="img-fluid"
                              style={{ width: '80px' }}
                            />
                            <p className="ms-2 product-name">{item.name}</p>
                          </td>
                          <td className="text-end">${item.price.toFixed(2)}</td>
                          <td className="text-center quantity-input">
                            <input
                              type="number"
                              value={item.quantity}
                              min={1}
                              onChange={(e) => updateQuantity(item.id, e.target.value)}
                            />
                          </td>
                          <td className="text-end">${(item.price * item.quantity).toFixed(2)}</td>
                          <td className="text-center">
                            <button
                              className="btn remove-cart-btn"
                              onClick={() => removeFromCart(item.id)}
                            >
                              &times;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Cart Totals Section */}
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="card p-4 total-product-price-wrap shadow-sm border">
                <h4 className="mb-3 fw-semibold">Cart Total</h4>
                <table>
                  <tbody>
                    <tr>
                      <td>Cart Subtotal</td>
                      <td className="text-end text-success cart-subtotal">${total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td>Shipping</td>
                      <td className="text-end">Free Shipping</td>
                    </tr>
                    <tr>
                      <td className="fw-semibold">Total</td>
                      <td className="text-end text-success cart-total">${total.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <Link to="/" className="btn checkout-btn d-inline-block mt-3">
                  <i className="ri-bank-card-line me-2"></i> Proceed To Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Carts;
