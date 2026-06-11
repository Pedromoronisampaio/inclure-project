import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getArtigos } from '../../services/api'
import './BlogDetalhe.css'

export default function BlogDetalhe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [artigo, setArtigo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArtigos().then(res => {
      const lista = res.data
      const encontrado = lista.find(a => String(a.id) === String(id))
      setArtigo(encontrado || null)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div className="artigo"><p className="texto-carregando">Carregando artigo...</p></div>
  if (!artigo) return (
    <div className="artigo artigo-centralizado">
      <p className="texto-vazio">Artigo não encontrado.</p>
      <button className="btn btn-verde" onClick={() => navigate('/blog')}>Voltar ao Blog</button>
    </div>
  )

  return (
    <div className="artigo">
      <div className="artigo-trilha">
        <Link to="/blog">Blog</Link> › {artigo.categoria}
      </div>
      <div className="artigo-banner"><img src={artigo.img} alt={artigo.titulo} /></div>
      <div className="artigo-topo">
        <div className="artigo-meta">
          <span className="artigo-badge">{artigo.categoria}</span>
          <span className="artigo-data">{artigo.data}</span>
        </div>
        <h1 className="artigo-tit">{artigo.titulo}</h1>
        <p className="artigo-resumo">{artigo.resumo}</p>
        <div className="artigo-autor">
          <div className="autor-nome">{artigo.autor}</div>
        </div>
      </div>
      <div className="artigo-corpo">
        <div dangerouslySetInnerHTML={{ __html: artigo.conteudo }} />
      </div>
      {artigo.fontes && artigo.fontes.length > 0 && (
        <div className="fontes-secao">
          <h2>Fontes e Referências</h2>
          <ul className="fontes-lista">
            {artigo.fontes.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}
      <div className="secao-voltar">
        <button className="btn btn-verde" onClick={() => navigate('/blog')}>Voltar ao Blog</button>
      </div>
    </div>
  )
}
