import { useParams, Link, useNavigate } from 'react-router-dom'
import { detalheNeuro } from '../Neurodivergencias/Neurodivergencias'
import './NeuroDetalhe.css'

export default function NeuroDetalhe() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const d = detalheNeuro[slug]

  if (!d) return (
    <div className="principal principal-centralizado">
      <p>Neurodivergência não encontrada.</p>
      <button className="btn btn-verde" onClick={() => navigate('/neurodivergencias')}>Voltar</button>
    </div>
  )

  return (
    <div className="principal">
      <div className="trilha">
        <Link to="/neurodivergencias">Neurodivergências</Link> › <span>{d.titulo}</span>
      </div>

      <div className="neuro-topo">
        <div className="neuro-banner-det"><img src={d.img} alt={d.titulo} /></div>
        <div className="neuro-tit">
          <h1>{d.titulo}</h1>
          <p>{d.descricao}</p>
        </div>
      </div>

      <div className="neuro-det">
        <div>
          <div className="neuro-secao">
            <h2>Principais Características</h2>
            <ul>{d.caracteristicas.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
          <div className="neuro-secao">
            <h2>Tratamento e Intervenções</h2>
            <ul>{d.tratamentos.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </div>
        </div>
        <div>
          {[d.e1, d.e2, d.e3].map((e, i) => (
            <div className="estat-card" key={i}>
              <div className="estat-num">{e.n}</div>
              <div className="estat-rot">{e.l}</div>
            </div>
          ))}
        </div>
      </div>

      {d.fontes && d.fontes.length > 0 && (
        <div className="fontes-secao">
          <h2>Fontes e Referências</h2>
          <ul className="fontes-lista">
            {d.fontes.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}

      <div className="secao-voltar">
        <button className="btn btn-verde" onClick={() => navigate('/neurodivergencias')}>
          Ver todas as neurodivergências
        </button>
      </div>
    </div>
  )
}
