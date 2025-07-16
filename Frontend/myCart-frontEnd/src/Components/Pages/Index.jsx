import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectFade, Navigation} from 'swiper/modules';
import productService from '../../Components/Services/ProductService';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import subBanner1 from './../../assets/images/banner-1.jpg';
import subBanner2 from './../../assets/images/banner-4.jpg';
import subBanner3 from './../../assets/images/banner-2.jpg'
import checkout from './../../assets/images/banner-3.jpg';
import shopping from './../../assets/images/shopping-banner.jpeg';
import HomeNav from '../Layout/HomeNav';

const Index = () => {

  const swiperRef = useRef(null);

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


  return (
    <>
      {/* Hero Home Navigation */}
      <HomeNav/>

      {/* Hero - head */}
      <div className='hero'>
        <Swiper
          ref={swiperRef}
          modules={[Navigation, EffectFade]}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          effect='fade'
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
        >
            <SwiperSlide>
              <div className='hero-wrap hero-wrap1 position-relative'>
                <div className='hero-content position-absolute text-center'> 
                  <h1> Your <br /><span>Perfect Workspace</span><br /> Be the Next <span>Global Empire.</span></h1>
                  <a href="#" className='btn hero-btn mt-3'> Shop Now</a>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className='hero-wrap hero-wrap2 position-relative'>
                <div className='hero-content position-absolute text-center'>
                  <h1> <span>Transform your</span> life style <br />Be the next <span>Big Thing.</span></h1>
                  <a href="#" className='btn hero-btn mt-3'> Shop Now</a>
                </div>
              </div>
            </SwiperSlide>
        </Swiper>

        <div className="swiper-button-prev swiper-btn swiper-prev"> <i className="ri-arrow-left-long-line"></i> </div>
        <div className="swiper-button-next swiper-btn swiper-next"> <i className="ri-arrow-right-long-line"></i> </div>
      </div>

      {/* hero - Banners */}
      <div className="banners py-5 bg-light">
          <div className="container">
            <div className="text-center mb-4">
              <h2 className="fw-bold">For everyone from entrepreneurs to enterprise</h2>
              <p className="text-muted">
                Millions of merchants of every size have collectively made over $1,000,000,000,000 in sales on MyCart.
              </p>
            </div>
          <div className="row g-4">
          {[
            {
              img: subBanner1,
              title: 'Get started fast',
              description: (
                <>
                  Solo seller Megan Bre Camp started <strong>Summer Solace Tallow</strong> to sell her organic candles and skincare online and at local farmers markets.
                </>
              ),
            },
            {
              img: subBanner2,
              title: 'Grow as big as you want',
              description: (
                <>
                  Athleisure brand <strong>Gymshark</strong> grew from working out of a garage to the global juggernaut it is today, with $500M+ sales annually.
                </>
              ),
            },
            {
              img: subBanner3,
              title: 'Raise the bar',
              description: (
                <>
                  With the help of MyCart for enterprise, <strong>Mattel</strong> sells their iconic toys direct to customers around the world.
                </>
              ),
            },
            ].map((item, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="custom-card d-flex flex-column h-100 shadow-sm rounded overflow-hidden bg-white">
                  <div className="img-wrapper">
                    <img
                      src={item.img}
                      alt={`Card ${index + 1}`}
                      className="card-img-top banner-img"
                    />
                  </div>
                  <div className="p-3 d-flex flex-column flex-grow-1 justify-content-between">
                    <div>
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.description}</p>
                    </div>
                    <button className="btn banner-btn mt-3 align-self-start">SHOP NOW</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* hero - cehckeout*/}
      <div className="checkout-hero-section py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            
            <div className="col-lg-6 text-white">
              <h1 className="display-4 fw-bold">There’s no better place<br />for you to build</h1>
              <p className="lead mt-4">The world’s best-converting checkout</p>

              <div className="row mt-4">
                <div className="col-6">
                  <div className="stat-label">HIGHER CONVERSIONS</div>
                  <div className="stat-value">15%</div>
                </div>
                <div className="col-6">
                  <div className="stat-label">HIGH-INTENT SHOPPERS</div>
                  <div className="stat-value">150M+</div>
                </div>
              </div>

              <p className="stat-description mt-3">
                <strong>MyCart Checkout</strong> converts 15% higher on average than other commerce platforms
                and exposes your brand to 150 million buy-ready shoppers.
              </p>
            </div>

            <div className="col-lg-6 text-center">
              <img
                src={checkout} 
                  alt="Checkout mockup"
                  className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </div>

      {/* hero - Parallax Banner */}
      <div className="parallax-banner">
        <div className="parallax-content">
          <h2>Take care of business</h2>
          <h1>Grow Arround the World</h1>
          <p className="my-3 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto quod, facilis quidem aliquam adipisci cumque voluptatum libero.
          </p>
          <button className='btn'>SHOP NOW</button>
        </div>
      </div>


      {/* hero - capital */}
      <div className="capital-section py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 position-relative">
              <img
                src={shopping}
                alt="MyCart Seller"
                className="img-fluid rounded testimonial-image"
              />
              <div className="testimonial-box p-4 rounded shadow-sm">
                <p className="testimonial-text">
                  “MyCart Capital has given us the funding we need to stock up on inventory and grow rapidly.”
                </p>
                <p className="testimonial-author mb-0">
                  <strong>Chandramohan Satheskanth</strong><br />
                  CEO, <a href="#" className="text-white text-decoration-underline">Kuppi.</a>
                </p>
              </div>
            </div>

            <div className="col-lg-6 text-white">
              <h2 className="fw-bold mb-3">MyCart has your back</h2>
              <p className="mb-4">
                Whether you need help expanding the team, ramping up marketing, or keeping surprise bestsellers in stock, 
                <a href="#" className="text-decoration-underline text-white"> MyCart Capital </a> 
                is here to lend a hand.
              </p>

              <div className="stat-group">
                <div className="stat-item mb-4">
                  <div className="stat-value">$5B loaned out so far</div>
                  <div className="stat-label">Invested in MyCart merchants</div>
                </div>
                <div className="stat-item mb-4">
                  <div className="stat-value">Loans up to $2M</div>
                  <div className="stat-label">Offers tailored to meet your needs</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">0% equity</div>
                  <div className="stat-label">No stake taken—ever</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* hero - store- setup */}
      <div className="store-setup-container">
        <div className="background-section">
          <div className="content-wrapper">
            <h1 className="title">Start selling in no time</h1>
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">01</div>
                <h2 className="step-title">Add your first product</h2>
                <p className="step-description">Upload product details and images</p>
              </div>
              <div className="step-card">
                <div className="step-number">02</div>
                <h2 className="step-title">Customize your store</h2>
                <p className="step-description">Choose colors and layout</p>
              </div>
              <div className="step-card">
                <div className="step-number">03</div>
                <h2 className="step-title">Set up payments</h2>
                <p className="step-description">Connect payment providers</p>
              </div>
            </div>
            <button className="cta-button">Take your shot</button>
          </div>
        </div>
      </div>
  
      
    </>
  )
}

export default Index