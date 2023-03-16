import { UserContext } from "@/store/userContext";
import axios from "axios";
import { useContext, useEffect, useState } from 'react'

export default function Home() {
  const [ativos, setAtivos] = useState({ liberado: 0, total: 0 });
  const [locais, setLocais] = useState({ liberado: 0, total: 0 });
  const [marcas, setMarcas] = useState({ liberado: 0, total: 0 });
  const [tipos, setTipos] = useState({ liberado: 0, total: 0 });
  const [usuarios, setUsuarios] = useState({ liberado: 0, total: 0 });

  useEffect(() => {
    getLista()
  }, []);

  function getLista() {
    axios.get('/api/ativo')
      .then(r => r.data)
      .then(data => {
        setAtivos({
          liberado: data.filter(item => item.bloqueado === false).length,
          total: data.length
        })
      });

    axios.get('/api/localidade')
      .then(r => r.data)
      .then(data => {
        setLocais({
          liberado: data.filter(item => item.bloqueado === false).length,
          total: data.length
        })
      });

    axios.get('/api/marca')
      .then(r => r.data)
      .then(data => {
        setMarcas({
          liberado: data.filter(item => item.bloqueado === false).length,
          total: data.length
        })
      });

    axios.get('/api/tipo_ativo')
      .then(r => r.data)
      .then(data => {
        setTipos({
          liberado: data.filter(item => item.bloqueado === false).length,
          total: data.length
        })
      });

    axios.get('/api/usuario')
      .then(r => r.data)
      .then(data => {
        setUsuarios({
          liberado: data.filter(item => item.bloqueado === false).length,
          total: data.length
        })
      });
  }

  return (
    <main className="col-12 d-flex flex-wrap" >
      <div className='col-12 col-md-4 col-lg-3  mb-3 p-3'>
        <div className='border d-flex flex-wrap shadow bg-white text-dark rounded p-3'>
          <div className='fs-3 col-auto align-self-center'>
            Ativos
          </div>
          <div className='col'>
            <div className='d-flex flex-wrap text-center'>
              <div className='col'>Liberado</div>
              <div className='col'>Total</div>
            </div>
            <div className='d-flex flex-wrap text-center'>
              <div className='col'>{ativos.liberado}</div>
              <div className='col'>{ativos.total}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-12 col-md-4 col-lg-3  mb-3 p-3'>
        <div className='border d-flex flex-wrap shadow bg-white text-dark rounded p-3'>
          <div className='fs-3 col-auto align-self-center'>
            Locais
          </div>
          <div className='col'>
            <div className='d-flex flex-wrap text-center'>
              <div className='col'>Liberado</div>
              <div className='col'>Total</div>
            </div>
            <div className='d-flex flex-wrap text-center'>
              <div className='col'>{locais.liberado}</div>
              <div className='col'>{locais.total}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-12 col-md-4 col-lg-3  mb-3 p-3'>
        <div className='border d-flex flex-wrap shadow bg-white text-dark rounded p-3'>
          <div className='fs-3 col-auto align-self-center'>
            Marcas
          </div>
          <div className='col'>
            <div className='d-flex flex-wrap text-center'>
              <div className='col'>Liberado</div>
              <div className='col'>Total</div>
            </div>
            <div className='d-flex flex-wrap text-center'>
              <div className='col'>{marcas.liberado}</div>
              <div className='col'>{marcas.total}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-12 col-md-4 col-lg-3  mb-3 p-3'>
        <div className='border d-flex flex-wrap shadow bg-white text-dark rounded p-3'>
          <div className='fs-3 col-auto align-self-center'>
            Tipos
          </div>
          <div className='col'>
            <div className='d-flex flex-wrap text-center'>
              <div className='col'>Liberado</div>
              <div className='col'>Total</div>
            </div>
            <div className='d-flex flex-wrap text-center'>
              <div className='col'>{tipos.liberado}</div>
              <div className='col'>{tipos.total}</div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-12 col-md-4 col-lg-3  mb-3 p-3'>
        <div className='border d-flex flex-wrap shadow bg-white text-dark rounded p-3'>
          <div className='fs-3 col-auto align-self-center'>
            Usuários
          </div>
          <div className='col'>
            <div className='d-flex flex-wrap text-center'>
              <div className='col'>Liberado</div>
              <div className='col'>Total</div>
            </div>
            <div className='d-flex flex-wrap text-center'>
              <div className='col'>{usuarios.liberado}</div>
              <div className='col'>{usuarios.total}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}  