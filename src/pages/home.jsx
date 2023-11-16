import axios from "@/config/axios";
import { useEffect, useState } from 'react'
import Chart from 'chart.js/auto';

export default function Home() {
  const [grafico, setGrafico] = useState(null);

  useEffect(() => {
    getLista();
  }, []);

  function getLista() {
    axios.get('/api/dashboard')
      .then(r => r.data)
      .then(data => {
        const body = data.body;
        drawChart('chart-locale', 'Ativos por localidade', 'pie', body.localidade.label, body.localidade.qtd);
        drawChart('chart-status', 'Ativos por status', 'pie', body.status.label, body.status.qtd);
        drawChart('chart-type', 'Tipos de ativo', 'bar', body.tipo_ativo.label, body.tipo_ativo.qtd);
        setGrafico(body);
      });
  }

  function drawChart(id, label, type, labels, data) {
    new Chart(
      document.getElementById(id),
      {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: data,
            hoverOffset: 4,
          }]
        }
      }
    );
  }

  return (
    <main className="col-12 d-flex flex-wrap" >
      <div className='col-12 col-md-4 mb-3 p-3'>
        <div className='border d-flex flex-wrap shadow bg-white text-dark rounded p-3'>
          <div className='fs-5 col-auto align-self-center'>
            Ativos por status
          </div>
          <div className='col-12'><canvas id="chart-status" style={{ width: 'auto' }}></canvas></div>
        </div>
      </div>

      <div className='col-12 col-md-4 mb-3 p-3'>
        <div className='border d-flex flex-wrap shadow bg-white text-dark rounded p-3'>
          <div className='fs-5 col-auto align-self-center'>
            Ativos por local
          </div>

          <div className='col-12'><canvas id="chart-locale" style={{ width: 'auto' }}></canvas></div>
        </div>
      </div>

      <div className='col-12 col-md-4 mb-3 p-3'>
        <div className='border d-flex flex-wrap shadow bg-white text-dark rounded p-3'>
          <div className='fs-5 col-auto align-self-center'>
            Quantidade de tipo de ativo
          </div>
          <div className='col-12'><canvas id="chart-type" style={{ width: 'auto' }}></canvas></div>
        </div>
      </div>
    </main>
  )
}  