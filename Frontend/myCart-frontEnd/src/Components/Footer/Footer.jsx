import React from 'react';
import payment from './../../assets/images/payment.png';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div className="footer text-light py-5 footer-bg">
        <div className="container">
            <div className="row">
                <div className="col-lg-3">
                    <div className="fw-bold">CONTACT US</div>
                    <p><i className="ri-map-pin-2-fill me-2">No.29, Main Street, Hatton, Central Province, Sri Lanka.</i></p>
                    <p>
                      <i className="ri-phone-fill me-2"></i>(+94) 767-588-558
                    </p>
                    <p>
                      <i className="ri-mail-fill me-2"></i>Example@gmail.com
                    </p>
                </div>
                <div className="col-lg-6">
                  <div className="logo navbar-brand footer-logo">
                    <Link to='/' className='text-decoration-none'>My <span>Craft</span></Link>
                  </div>
                  <p className='text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dignissimos rerum corporis! Architecto tempore quos quia facere dignissimos aliquam reiciendis ex tenetur, ipsum voluptatem labore eius consequuntur quis cumque ipsa!</p>
                  <div className='d-flex justify-content-start justify-content-md-center gap-2 footer-social'>
                    <i className="ri-facebook-fill"></i>
                    <i className="ri-twitter-fill"></i>
                    <i className="ri-instagram-fill"></i>
                    <i className="ri-pinterest-fill"></i>
                    <i className="ri-youtube-fill"></i>
                  </div>
                  <div className='mt-5 d-flex align-items-center justify-content-center gap-4'>
                    <a href="#" className='text-decoration-none text-white'>Information</a>
                    <a href="#" className='text-decoration-none text-white'>Contact</a>
                    <a href="#" className='text-decoration-none text-white'>Privacy Policy</a>
                    <a href="#" className='text-decoration-none text-white'>About us</a>
                    <a href="#" className='text-decoration-none text-white'>FAQs</a>
                  </div>
                </div>
                <div className="col-lg-3 newsletter-wrap">
                    <h5 className='fw-bold'>OUR NEWSLETTER</h5>
                    <p className='text-white'>Subscribe to our newsletter to get news about special discounts.</p>
                    <div className="input-group">
                        <input type="email" className='form-control position-relative rounded' placeholder='Email'/>
                        <i className="ri-mail-ai-line position-absolute send-mail-icon"></i>
                    </div>
                </div>
            </div>
            <div className="row mt-5 pt-3 footer-bottom">
                <div className="col-lg-6 copyright-text">
                    <p>@ copyright 2025. All Rights Reserved By <a href="#">SKcom</a></p>
                </div>
                <div className="col-lg-6 payment-img">
                    <img src={payment} className='img-fluid' alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer