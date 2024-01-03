import Layout from '@/app/components/layout'
import CookieAuthProvider from '@/contexts/cookieAuth';
import { useState } from 'react'
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps}) {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  const updateNotifications = (newNotifications) => {
    setNotifications(newNotifications);
  };

  const isAuthRoute = router.pathname.startsWith('/auth');

  return (
    <CookieAuthProvider isAuthRoute={isAuthRoute}>
      {isAuthRoute ? 
      <Component {...pageProps} updateNotifications={updateNotifications} />
      :
      <Layout notifications={notifications}>
          <Component {...pageProps} updateNotifications={updateNotifications} />
      </Layout>
      }
    </CookieAuthProvider>
  )
}