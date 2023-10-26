import { useRouter } from 'next/router';
import React from 'react';

export default function ErrorComponent(props) {
    const router = useRouter();

    return (

        <div className="container h-100" style={{marginTop:'15%'}}>
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-md-6 text-center">
                    <h1 className="display-4">Erro 403</h1>
                    <p className="lead">Desculpe, é necessário estar logado no sistema para que consiga acessar páginas internas.</p>
                    <a onClick={()=>router.push('/')} className="btn btn-primary">Voltar para a página inicial</a>
                </div>
            </div>
        </div>
    )
}

