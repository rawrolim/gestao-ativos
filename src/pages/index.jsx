import { useRouter } from "next/router";
import iconAsset from '@/icons/assets.png';
import shield from '@/icons/shield.png'
import confiabilidade from '@/icons/confiabilidade.png'
import precisao from '@/icons/precisao.png'
import { FaFacebook, FaFacebookF, FaLinkedin, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Login() {
  const router = useRouter();

  return (
    <main className='col-12'>
      <section className='d-flex flex-wrap bg-white p-3 w-100'>
        <div className='col-auto'>
          <img src={iconAsset.src} style={{ width: '10vh' }} />
        </div>
        <div className='align-self-center text-end col'>
          <h5 className='text-dark'>
            Gestão de ativos
          </h5>
        </div>
      </section>

      <section className='text-center col-12 mt-5 pt-5 pb-5'>
        <h1>Asset Mate</h1>
        <h4>O sistema de getão de ativo que você pode confiar</h4>
        <div className='text-center d-flex frex-wrap justify-content-center mt-5'>
          <button onClick={() => { router.push('formularioUsuario') }} className='btn btn-outline-light border-0 col-4 col-md-4 col-lg-2 rounded-0'>Cadastrar</button>
          <button onClick={() => { router.push('login') }} className='btn btn-dark border-0 col-4 col-md-4 col-lg-2 rounded-0'>Entrar</button>
        </div>
      </section>

      <section className='d-flex flex-wrap bg-white text-dark justify-content-center mt-4 pt-5 pb-5 pe-3 ps-3'>
        <div className="col-12 col-md-4 col-xl-3 p-3">
          <div className='p-3 mb-3'>
            <div className='col-12 text-center'>
              <img src={confiabilidade.src} style={{ width: '50%' }} />
            </div>
            <div className='fs-5 fw-bolder'>Reduzir riscos e garantir conformidade</div>
            <p>
              Garantia que todos os equipamentos estejam em boas condições de funcionamento, em conformidade com as regulamentações de saúde e segurança, e que as inspeções e manutenções necessárias sejam realizadas em tempo hábil.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4 col-xl-3 p-3">
          <div className='p-3 mb-3'>
            <div className='col-12 text-center'>
              <img src={precisao.src} style={{ width: '50%' }} />
            </div>
            <div className='fs-5 fw-bolder' style={{ height: '60px' }}>Melhorar a precisão do inventário</div>
            <p>
              Manter um inventário preciso e atualizado de todos os ativos, facilitando a gestão de estoque e a tomada de decisão.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-4 col-xl-3 p-3">
          <div className='p-3 mb-3'>
            <div className='col-12 text-center'>
              <img src={shield.src} style={{ width: '50%' }} />
            </div>
            <div className='fs-5 fw-bolder'>Aumentar a confiabilidade dos ativos</div>
            <p>
              Garantia que os ativos sejam confiáveis, seguros e eficientes, melhorando a reputação da empresa e a satisfação do cliente.
            </p>
          </div>
        </div>
      </section>

      <section className="col-12 d-flex flex-wrap justify-content-center mt-3 mb-3 pt-3 pb-3 pe-3 ps-3">
        <FaTwitter size={30} className='m-1' />
        <FaLinkedinIn size={30} className='m-1' />
        <FaFacebookF size={30} className='m-1' />
        <FaYoutube size={30} className='m-1' />
      </section>

      <section className='col-12 text-center p-3 text-muted bg-white'>
        ©2023 sistema desenvolvido por Rawlinson Rolim
      </section>
    </main>
  )
}
