import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useTheme } from '../../contexts/ThemeContext'
import usuarioImg from '../../assets/usuario.png'
import avatarAdminImg from '../../assets/avatar-admin.png'
import simboloImg from '../../assets/simbolo.png'
import logotipoImg from '../../assets/logotipo.png'
import solIconImg from '../../assets/imagens-novas/sol-icon.png'
import luaIconImg from '../../assets/imagens-novas/lua-icon.png'
import sairIconImg from '../../assets/imagens-novas/sair-icon.png'
import './Navbar.css'

export default function Navbar() {
  const { isLoggedIn, isAdmin, user, logout } = useAuth()
  const { darkMode, alternarTema } = useTheme()
  const [menuAberto, setMenuAberto] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => { setMenuAberto(false) }, [location])

  const handleLogout = () => { logout(); navigate('/') }

  const links = [
    { to: '/sobre', label: 'Sobre' },
    { to: '/neurodivergencias', label: 'Neurodivergências' },
    { to: '/profissionais', label: 'Profissionais' },
    { to: '/ongs', label: 'ONGs' },
    { to: '/blog', label: 'Blog' },
    { to: '/download', label: 'Download' },
  ]

  const TemaBtn = () => (
    <button className="tema-btn" onClick={alternarTema} aria-label="Alternar tema">
      <span className="icone-sol"><img src={solIconImg} alt="Sol" className="icone-tema-img" /></span>
      <div className="thumb"><img src={darkMode ? luaIconImg : solIconImg} alt="" className="icone-tema-thumb" /></div>
      <span className="icone-lua"><img src={luaIconImg} alt="Lua" className="icone-tema-img" /></span>
    </button>
  )

  return (
    <>
      <div className="nav-topo" id="navTopo">
        <div className="bloco-nav">
          <Link to="/" className="logo-site">
            <img src={simboloImg} alt="Logo Inclure" />
            <img src={logotipoImg} alt="Inclure" />
          </Link>
          <div className="links-nav">
            <ul className="lista-nav">
              {links.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className={`link-nav${location.pathname === l.to ? ' ativo' : ''}`}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="area-tema"><TemaBtn /></div>
          <button
            className={`btn-menu${menuAberto ? ' aberto' : ''}`}
            id="btnMenu"
            onClick={() => setMenuAberto(v => !v)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>

        <div className="bloco-user">
          {isLoggedIn ? (
            <div className="area-login">
              <Link to={isAdmin ? '/admin' : '/perfil'} className="link-entrar nav-nome-user">
                {user?.nome?.split(' ')[0] || 'Perfil'}
              </Link>
              <Link to={isAdmin ? '/admin' : '/perfil'} className="link-avatar">
                <div className="avatar-usuario">
                  {isAdmin ? (
                    <img src={avatarAdminImg} alt="Avatar Admin" />
                  ) : user?.foto ? (
                    <img src={user.foto} alt="Avatar" />
                  ) : (
                    <img src={usuarioImg} alt="Avatar" />
                  )}
                </div>
              </Link>
            </div>
          ) : (
            <div className="area-login">
              <Link to="/login" className="link-entrar">Acessar conta</Link>
              <Link to="/perfil" className="link-avatar">
                <div className="avatar-usuario">
                  <img src={usuarioImg} alt="Avatar" />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className={`menu-mob${menuAberto ? ' aberto' : ''}`} id="menuMob">
        {links.map(l => (
          <Link key={l.to} to={l.to} className="link-nav">{l.label}</Link>
        ))}
        <div className="tema-mob">
          <span>Alternar tema</span>
          <TemaBtn />
        </div>
        {isLoggedIn ? (
          <>
            <Link to={isAdmin ? '/admin' : '/perfil'} className="btn-entrar-mob btn-entrar-mob-perfil">
              <div className="avatar-mini-menu">
                <img src={isAdmin ? avatarAdminImg : (user?.foto || usuarioImg)} className="avatar-mini-img" alt="Avatar" />
              </div>
              {user?.nome?.split(' ')[0] || 'Perfil'}
            </Link>
            <button onClick={handleLogout} className="btn-entrar-mob btn-entrar-mob-sair">
              <img src={sairIconImg} alt="" className="btn-icon-mob" /> Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-entrar-mob">Entrar</Link>
            <Link to="/cadastro" className="btn-entrar-mob btn-entrar-mob-cadastrar">Cadastrar</Link>
          </>
        )}
      </div>
    </>
  )
}
