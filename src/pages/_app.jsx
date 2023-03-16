import Header from '@/components/header';
import Menu from '@/components/menu';
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '../store/userContext';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  console.log()

  return (
    <UserProvider >
      <Header showUser={true} />
      <ToastContainer />
      <div className='d-flex flex-wrap'>
        <Menu />
        <div className={`col d-flex flex-wrap ${router.pathname==='/'?'':'p-3'}`} >
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  )
}
