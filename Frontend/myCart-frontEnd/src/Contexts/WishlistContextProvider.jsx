import React, { useEffect, useState, createContext } from 'react';
import { toast } from 'react-toastify';

export const WishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    const exists = wishlistItems.some(item => item.productId === product.productId);
    if (!exists) {
      setWishlistItems([...wishlistItems, product]);
      toast.success(`${product.productName} added to wishlist`);
    } else {
      toast.warn(`${product.productName} is already in your wishlist`);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item.productId !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
