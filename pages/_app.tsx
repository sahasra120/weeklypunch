import '../styles/globals.css';
import Layout from '../components/HOC/Layout';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MOBILE_SITE_URL } from '../data/constants';
import OneSignal from 'react-onesignal';

function MyApp({ Component, pageProps }: AppProps) {
  const Router = useRouter();

  const redirectHandler = () => {
    if (window.innerWidth <= 820) {
      Router.push(MOBILE_SITE_URL + Router.asPath);
    }
  };

  useEffect(() => {
    OneSignal.init({
      appId: '9b36e5a0-3f9c-4d16-803f-17a5fb067db9',
      notifyButton: {
        enable: true,
      },
    });

    if (window.innerWidth <= 820) {
      Router.push(MOBILE_SITE_URL + Router.asPath);
    } else {
      window.addEventListener('resize', redirectHandler);
    }
    return () => window.removeEventListener('resize', redirectHandler);
  }, []);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
