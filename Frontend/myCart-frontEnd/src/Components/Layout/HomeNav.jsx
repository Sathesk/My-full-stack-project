import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../Auth/SignUpForm';
import LoginForm from '../Auth/LoginForm';
import './../../Styles/HomeNav.css';

const HomeNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setScrolled(currentScrollPos > 50);
      setHidden(isScrollingDown && currentScrollPos > 50);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <div className={`nav w-100 fixed-top top-0 start-0 ${scrolled ? 'scrolled' : ''} ${hidden ? 'nav-hidden' : ''}`}>
        <nav className='navbar navbar-expand-lg w-100 px-4'>
          <div className='logo navbar-brand d-flex align-items-center'>
            <Link to='/' className='text-decoration-none logo-text'>
              My<span>C</span>art.
            </Link>
          </div>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse justify-content-between' id='navbarNav'>
            {/* Center Menu */}
            <ul className='menu navbar-nav mx-auto'>
              <li className='nav-item'><Link to='/' className="nav-link">Home</Link></li>
              <li className='nav-item'><Link to='/about' className="nav-link">About</Link></li>
              <li className='nav-item'><Link to='/blog' className="nav-link">Blog</Link></li>
              <li className='nav-item'><Link to='/contact' className="nav-link">Contact</Link></li>
            </ul>

            {/* Right Buttons */}
            <ul className='navbar-nav d-flex align-items-center gap-3'>
              <li className='nav-item'>
                <a
                  href="#"
                  className="nav-link login-link"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModel"
                >
                  Log in
                </a>
              </li>
              <li className='nav-item'>
                <a
                  href="#"
                  className="btn start-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#signupModel"
                >
                  Join
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Sign-up form */}
      <div className='modal fade' id='signupModel' tabIndex="-1" aria-labelledby='signupModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content p-4'>
            <div className='modal-header border-0'>
              <h5 className='modal-title sign-up-title fw-bold' id='signupModalLabel'>Sign Up</h5>
              <button type='button' className='btn-close close-modal' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <div className='modal fade' id='loginModel' tabIndex='-1' aria-labelledby='loginModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content p-4'>
            <div className='modal-header border-0'>
              <h5 className='modal-title sign-up-title fw-bold' id='loginModalLabel'>Sign In</h5>
              <button type='button' className='btn-close close-modal' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNav;
