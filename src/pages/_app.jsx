import Header from '@/components/header'
import Menu from '@/components/menu'
import '@/styles/globals.scss'
import { UserProvider } from '../store/userContext'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider >
      <Header showUser={true} />
      <div className='d-flex flex-wrap'>
        <Menu />
        <div className='col p-3 d-flex flex-wrap'>
          <Component {...pageProps} />
        </div>
      </div>
    </UserProvider>
  )
}
