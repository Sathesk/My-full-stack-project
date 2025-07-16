import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import authService from './../../src/Components/Services/AuthService'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const { data } = await authService.login(credentials);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      toast.success('Login successful');
      await fetchUser(data.token); 
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
      throw err;
    }
  };

  const fetchUser = async (accessToken = token) => {
    if (!accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(accessToken);
      const { exp, sub: username } = decoded;

      if (!username || (exp && Date.now() > exp * 1000)) {
        logout();
        return;
      }

      const { data } = await authService.getProfile(username, accessToken);
      setUser(data);
      redirectBasedOnRole(data.role);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.info('Logged out');
    navigate('/login');
  };

  const redirectBasedOnRole = (role) => {
    const routes = {
      BUYER: '/buyer/dashboard',
      SUPPLIER: '/supplier/profile',
      ADMIN: '/admin/dashboard',
    };
    navigate(routes[role] || '/login');
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        hasRole: (role) => user?.role === role,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
