import { UserContext } from "@/store/userContext";
import { useContext } from 'react'

export default function Home() {
  const { usuario } = useContext(UserContext);
  console.log(usuario)
  return (
      <main className="" >
        HOME
      </main>
    )
  }  