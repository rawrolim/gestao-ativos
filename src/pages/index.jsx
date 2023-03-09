import { useRouter } from "next/router"

export default function Login() {
  const router = useRouter();

  return (
    <main>
      LANDING PAGE
      <button onClick={()=>{router.push('login')}}>Login</button>
    </main>
  )
}
