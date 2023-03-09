
export default function Home() {
    return (
        <main className="p-3" >
            <div className='form-floating btn-group col-12'>
                <input className='form-control' id='cadastrar' type='text' placeholder="Cadastrar" />
                <label htmlFor='cadastrar'>Nome</label>
                <button className="btn btn-primary">Cadastrar</button>
            </div>

            <div className='mt-5'>
                <div className='d-flex justify-content-end'>
                    <div className="col-xs-12 col-md-6 col-xl-4">
                        <input className='form-control' placeholder='Buscar' />
                    </div>
                </div>  
            </div>
        </main>
    )
}
