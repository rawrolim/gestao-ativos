import '@/styles/globals.scss'
import { UserProvider } from '../store/userContext'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider >
      <Component {...pageProps} />
    </UserProvider>
  )
}
