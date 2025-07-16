import React from 'react';
import { Link } from 'react-router';
import about_banner1 from './../../assets/images/about-banner-01.jpg';
import about_banner2 from './../../assets/images/about-banner-02.jpg';
import about_banner3 from './../../assets/images/about-banner-03.jpg';
import about_banner4 from './../../assets/images/about-banner-04.jpg';
import about_banner5 from './../../assets/images/about-banner-05.png';
import HomeNav from '../Layout/HomeNav';

import './../../Styles/About.css';

const About = () => {
  return (
    <div className="about-page">
      {/*About Hero Section */}
      <div className="about-hero text-white">
        <div className="container text-center">
          <p className='text-muted'> <Link to='/'>Home</Link> / About </p>
          <h1 className="about-title">Our Story</h1>
          <div className="about-description">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore quas omnis
              iure perferendis tempore et nulla sed neque eligendi. Nemo temporibus omnis
              neque consequatur illum quae et, laudantium minus nam!
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam cumque consectetur a porro natus
              maiores repellendus nostrum voluptates praesentium. Velt enim quibusdam teneur nisi eaque
              veriam debitis, labore modi at!
            </p>
          </div>
          {/* Banner Grid Section */}
          <div className="about-banner-grid">
            <div className="banner-grid-row">
              <div className="banner-grid-large">
                <img src={about_banner1} alt="Main Banner" className="banner-img" />
              </div>
              <div className="banner-grid-stack">
                <img src={about_banner2} alt="Banner 2" className="banner-img" />
                <div className="banner-grid-half-row">
                  <img src={about_banner3} alt="Banner 3" className="banner-img" />
                  <img src={about_banner4} alt="Banner 4" className="banner-img" />
                </div>      
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Opportunities Section */}
      <div className='opportunities'>
        <div className='container py-5'>
          <div className="row align-items-center">
            <div className="col-xl-6 mb-4 opportunities_title">
              <h2 className='mb-3'>
                INSPIRATION, INNOVATION,<br /> AND OPPORTUNITIES.
              </h2>
              <p className='text-muted mb-4'>
                Many Desktop Publishing Packages And Web Page Editors Now Use Lorem Ipsum As Their Default Model Text.
              </p>
              <div className='accordion' id='businessAccordion'>
                {[
                  { title: "Business's Vision", content: "Lorem ipsum dolor sit amet...", id: 'One', show: true },
                  { title: "Our Vision", content: "Lorem ipsum dolor sit amet...", id: 'Two' },
                  { title: "Our Support", content: "Lorem ipsum dolor sit amet...", id: 'Three' }
                ].map(({ title, content, id, show }, index) => (
                  <div className="accordion-item" key={index}>
                    <h2 className='accordion-header'>
                      <button className={`accordion-button ${!show ? 'collapsed' : ''}`} type='button' data-bs-toggle='collapse' data-bs-target={`#collapse${id}`}>
                        {title}
                      </button>
                    </h2>
                    <div id={`collapse${id}`} className={`accordion-collapse collapse ${show ? 'show' : ''}`} data-bs-parent="#businessAccordion">
                      <div className="accordion-body text-muted">
                        {content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-xl-6 text-center">
              <img src={about_banner5} alt="Idea" className='img-fluid' />
            </div>
          </div>
        </div>
      </div>
      {/* Cards Section */}
      <div className="container cards my-5 py-5">
        <div className="row g-4">
          {['SUBMIT A TASK', 'SEND MESSAGE', 'TRUSTED EXPERIENCE'].map((title, i) => (
            <div className='col-md-4' key={i}>
              <div className='About_card card text-center border-0'>
                <div className='mb-3'>
                  <i className="bi bi-check-square fs-1 text-success"></i>
                </div>
                <h5 className='fw-normal'>{title}</h5>
                <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Stats Section */}
      <div className="stats_section text-white text-center py-5 my-3">
        <div className="container my-5 py-5">
          <div className="row justify-content-center">
            <div className="about_col col-6 col-md-3 mb-4 mb-md-0">
              <h2>18+</h2>
              <p>Years</p>
            </div>
            <div className="about_col col-6 col-md-3 mb-4 mb-md-0">
              <h2>200+</h2>
              <p>Employee</p>
            </div>
            <div className="about_col col-6 col-md-3 mb-4 mb-md-0">
              <h2>85%</h2>
              <p>Page views</p>
            </div>
            <div className="about_col col-6 col-md-3 mb-4 mb-md-0">
              <h2>27++</h2>
              <p>Awards</p>
            </div>
          </div>
        </div>
      </div>
      {/* Contact CTA */}
      <div className="container text-center my-5 py-5">
        <p className="text-muted mb-2">Contact Us</p>
        <h2 className='fw-bold mb-4 text-uppercase'>About Us Info</h2>
        <p className='text-muted mx-auto mb-5' style={{ maxWidth: '600px' }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam corrupti
          modi laudantium omnis distinctio. Nesciunt quam necessitatibus consequatur odio,
          placeat saepe eum repellendus rerum esse nulla asperiores, libero at perferendis?
        </p>
        <a href="#contact" className='contact_btn px-4 py-2'>CLICK HERE TO CONTACT US</a>
      </div>
    </div>
  );
};

export default About;
