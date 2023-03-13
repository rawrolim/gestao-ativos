import { useRouter } from 'next/router'

export default function Ativos() {
    const router = useRouter();

    return (
        <main className="" >
            <button onClick={()=>{router.push('/ativos/formulario/')}}>Cadastrar</button>
        </main>
    )
}  