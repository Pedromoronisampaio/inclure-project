import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import sairIconImg from '../../assets/imagens-novas/sair-icon.png'
import avatarAdminImg from '../../assets/avatar-admin.png'
import './Admin.css'

export default function AdminPerfil() {
  // --- LÓGICA E ESTADO ---
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const acoes = [
    { icon: <img src="https://placehold.co/48x48/3f51b5/white?text=DB" alt="Dashboard" className="icone-acao-admin" />, titulo: 'Dashboard', desc: 'Estatísticas e gerenciamento geral', link: '/admin/dashboard' },
    { icon: <img src="https://placehold.co/48x48/3f51b5/white?text=PR" alt="Profissionais" className="icone-acao-admin" />, titulo: 'Profissionais', desc: 'Validar e gerenciar profissionais', link: '/profissionais' },
    { icon: <img src="https://placehold.co/48x48/3f51b5/white?text=ON" alt="ONGs" className="icone-acao-admin" />, titulo: 'ONGs', desc: 'Adicionar e remover ONGs', link: '/ongs' },
    { icon: <img src="https://placehold.co/48x48/3f51b5/white?text=BL" alt="Blog" className="icone-acao-admin" />, titulo: 'Blog', desc: 'Gerenciar artigos e pesquisas', link: '/blog' },
    { icon: <img src="https://placehold.co/48x48/3f51b5/white?text=NE" alt="Neurodivergências" className="icone-acao-admin" />, titulo: 'Neurodivergências', desc: 'Visualizar informações', link: '/neurodivergencias' },
    { icon: <img src="https://placehold.co/48x48/3f51b5/white?text=DW" alt="Download" className="icone-acao-admin" />, titulo: 'Download', desc: 'Visualizar página do app', link: '/download' },
  ]

  // --- VISUAL (HTML) ---
  return (
    <div className="admin-perfil">
      <div className="topo">
        <h1 className="titulo-sec">Painel do Administrador</h1>
        <p className="subtitulo">Bem-vindo de volta, Administrador</p>
      </div>

      <div className="admin-card">
        <div className="perfil-avatar">
          <div className="perfil-avatar-img">
            <img src={avatarAdminImg} alt="Admin" />
          </div>
        </div>
        <div className="info-admin">
          <h2 className="nome-admin">Administrador</h2>
          <div className="email-admin">admin@inclure.com.br</div>
          <div className="admin-badge">Administrador do Sistema</div>
          <div className="acoes-admin">
            <button className="btn btn-cinza" onClick={() => { logout(); navigate('/') }}><img src={sairIconImg} alt="" className="btn-icon" />Sair da conta</button>
            <Link to="/admin/dashboard" className="btn btn-azul">Ver Dashboard</Link>
          </div>
        </div>
      </div>

      <div className="admin-acoes">
        {acoes.map((a, i) => (
          <Link to={a.link} key={i} className="admin-acao-btn">
            <div className="icone-grande">{a.icon}</div>
            <h3>{a.titulo}</h3>
            <p>{a.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
