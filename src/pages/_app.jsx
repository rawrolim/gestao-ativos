import Header from '@/components/header';
import Menu from '@/components/menu';
import '@/styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '../store/userContext';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  return (
    <UserProvider >
      <Header showUser={true} />
      <ToastContainer />
      <div className='d-flex flex-wrap'>
        <Menu />
        <div className='col p-3 d-flex flex-wrap'>
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  )
}
