import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import './../../Styles/BuyerNav.css';
import UserDetailsForm from '../Auth/UserDetailsForm';
import AddressDetailsForm from '../Auth/AddressDetailsForm';
import ProfileForm from '../Auth/ProfileForm';
import { WishlistContext } from '../../Contexts/WishlistContextProvider';
import { CartContext } from '../../Contexts/CartContextProvider';


const Nav = () => {
  const { wishlistItems = [] } = useContext(WishlistContext) || {};
  const { cartItems = [] } = useContext(CartContext) || {};
  const WishlistCount = wishlistItems.length;
  const CartCount = cartItems.length;

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const navigate = useNavigate();


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

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    
    
    <>
      {/* Navbar */}
      <div className={`nav fixed-top ${scrolled ? 'scrolled' : ''} ${hidden ? 'nav-hidden' : ''}`}>
        <nav className="navbar navbar-expand-lg container-fluid">
          {/* Left Side: Logo */}
          <div className="navbar-brand logo me-auto">
            <Link to='/' className="text-decoration-none">My<span>C</span>art.</Link>
          </div>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Right Side: Menu + Icons */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav d-flex align-items-center gap-4">
              <li className="nav-item"><Link to='/' className='nav-link'>Home</Link></li>
              <li className="nav-item"><Link to='/shop' className='nav-link'>Shop</Link></li>
              <li className="nav-item"><Link to='/blog' className='nav-link'>Blog</Link></li>
              <li className="nav-item"><Link to='/contact' className='nav-link'>Contact</Link></li>

              <li className="nav-item nav-icons d-flex align-items-center gap-3">
                {/* Search */}
                <a href="#" data-bs-toggle="modal" data-bs-target="#searchModel">
                  <i className="bi bi-search"></i>
                </a>

                {/* Profile Dropdown */}
                <div className="dropdown">
                  <a
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person"></i>
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <a className='dropdown-item'
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#profileModel"
                    >
                      Profile 
                    </a>
                    <a className='dropdown-item'
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#signupModel"
                    >
                      Add Profile Details 
                    </a>
                    <a className='dropdown-item'
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#addressModel"
                    >
                      Add Address Details 
                    </a>
                    <li><Link className="dropdown-item" to="/orders">Order Details</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div> 

                <Link to='/wishlist' className='position-relative'>
                    <i className='bi bi-heart'></i>
                    {WishlistCount > 0 && (
                      <span className='wishlist-count position-absolute top-0 start-100 translate-middle badge rounded-pill p-2'>
                        {WishlistCount}
                      </span>
                    )}
                </Link>
                <Link to='/carts' className='position-relative'>
                    <i className='bi bi-bag'></i>
                    {CartCount > 0 && (
                      <span className='cart-count position-absolute top-0 start-100 translate-middle rounded-pill p-2'>
                        {CartCount}
                      </span>
                    )}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Modals */}
      <div className='modal fade' id='signupModel' tabIndex="-1" aria-labelledby='signupModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content p-4'>
            <div className='modal-header border-0'>
              <h5 className='modal-title sign-up-title fw-bold' id='signupModalLabel'>Update Profile</h5>
              <button type='button' className='btn-close close-modal' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <UserDetailsForm/>
            </div>
          </div>
        </div>
      </div>
      
      <div className='modal fade' id='addressModel' tabIndex="-1" aria-labelledby='addressModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-xl modal-dialog-centered'>
          <div className='modal-content p-4'>
            <div className='modal-header border-0'>
              <h5 className='modal-title sign-up-title fw-bold' id='addressModalLabel'>Update Address</h5>
              <button type='button' className='btn-close close-modal' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <AddressDetailsForm/>
            </div>
          </div>
        </div>
      </div>

      <div className='modal fade' id='profileModel' tabIndex='-1' aria-labelledby='addressModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content p-4'>
            <div className='modal-header border-0'>
              <h5 className='modal-title sign-up-title fw-bold' id='addressModalLabel'>Update Address</h5>
              <button type='button' className='btn-close close-modal' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>


      {/* Search Modal */}
      <div className='modal fade' id='searchModel' tabIndex="-1" aria-labelledby='searchModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content p-4'>
            <div className='modal-header border-0'>
              <h5 className='modal-title fw-bold' id='searchModalLabel'>Search</h5>
              <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
            </div>
            <div className='modal-body'>
              <form>
                <input type="text" className='form-control shadow-sm' placeholder='Search for Products...' required />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
