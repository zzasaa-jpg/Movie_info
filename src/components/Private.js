import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  // Function to handle sign in
  const handleSignIn = () => {
    setIsSignedIn(true);
  };
  console.log(handleSignIn[0])
  // Check if the user is signed in
  const isAuthenticated = isSignedIn || localStorage.getItem('isSignIn');

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
