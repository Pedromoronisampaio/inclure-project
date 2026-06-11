import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDashboard } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'
import './Admin.css'

export default function AdminDashboard() {
  // --- LÓGICA E ESTADO ---
  const [dash, setDash] = useState(null)
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const carregar = () => {
    getDashboard().then(res => {
      setDash(res.data)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }

  useEffect(() => { carregar() }, [])

  if (loading) return <div className="principal"><p className="texto-carregando">Carregando dashboard...</p></div>

  // --- VISUAL (HTML) ---
  return (
    <div className="principal principal-estreito">
      
      <div className="trilha">
        <Link to="/admin">Painel do Administrador</Link> › <span>Dashboard</span>
      </div>

      <div className="topo topo-sem-padding">
        <h1 className="titulo-sec">Dashboard do Sistema</h1>
        <p className="subtitulo">Visão geral e estatísticas da plataforma Inclure</p>
      </div>

      <div className="dashboard-grid">
        <div className="dash-card">
          <h3>Usuários Cadastrados</h3>
          <div className="dash-total">{dash?.totalUsuarios || 0}</div>
          <div className="dash-stat">
            <span>Neurodivergentes</span>
            <strong>{dash?.porTipo?.neurodivergente || 0}</strong>
          </div>
          <div className="dash-stat">
            <span>Responsáveis/Familiares</span>
            <strong>{dash?.porTipo?.responsavel || 0}</strong>
          </div>
          <div className="dash-stat">
            <span>Profissionais</span>
            <strong>{dash?.porTipo?.profissional || 0}</strong>
          </div>
        </div>

        <div className="dash-card">
          <h3>Conteúdo da Plataforma</h3>
          <div className="dash-stat dash-stat-amplo">
            <div className="stat-grupo">
              <div className="stat-num-azul">{dash?.totalProfissionais || 0}</div>
              <div className="stat-rotulo">Profissionais</div>
            </div>
            <div className="stat-grupo-dir">
              <div className="stat-num-verde">{dash?.profissionaisValidados || 0}</div>
              <div className="stat-rotulo">Validados</div>
            </div>
          </div>
          <div className="dash-stat dash-stat-amplo">
            <div className="stat-grupo">
              <div className="stat-num-laranja">{dash?.totalOngs || 0}</div>
              <div className="stat-rotulo">ONGs e Recursos</div>
            </div>
            <div className="stat-grupo-dir">
              <div className="stat-num-roxo">{dash?.totalArtigos || 0}</div>
              <div className="stat-rotulo">Artigos / Pesquisas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
