import { createContext, useState, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export const cookieAuth = createContext();

const CookieAuthProvider = ({ children, isAuthRoute }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setAdmin] = useState(false);

  const handleUserLogin = async () => {
    const user = await Cookies.get('userId');
    if (user) {
      setCurrentUser(parseInt(user));
    } else if (!isAuthRoute) {
      handleUserLogout();
      router.push('/auth/login');
    }

    const admin = await Cookies.get('administrator');
    if (admin === 'true') {
      setAdmin(true);
    }
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    setAdmin(false);
    Cookies.remove('userId');
    Cookies.remove('administrator');
  };

  useEffect(() => {
    handleUserLogin();
  }, []);

  const userStatus = useMemo(
    () => ({ currentUser, isAdmin, handleUserLogin, handleUserLogout }),
    [currentUser, isAdmin, handleUserLogin, handleUserLogout],
  );

  return (
    <cookieAuth.Provider value={userStatus}>
      {children}
    </cookieAuth.Provider>
  );
};

export default CookieAuthProvider;
