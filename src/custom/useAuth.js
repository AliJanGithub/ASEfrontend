import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token); // Set true if token exists, false otherwise
    };

    // Listen for token changes dynamically
    window.addEventListener("storage", checkToken);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  return isAuthenticated;
};

export default useAuth;
