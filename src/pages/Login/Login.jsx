import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import visivelImg from '../../assets/imagens-novas/visivel.png'
import naoVisivelImg from '../../assets/imagens-novas/nao-visivel.png'
import './Login.css'

export default function Login() {
  // --- LÓGICA E ESTADO ---
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [verSenha, setVerSenha] = useState(false)
  const { login, isLoggedIn, isAdmin } = useAuth()
  const navigate = useNavigate()

  if (isLoggedIn) {
    navigate(isAdmin ? '/admin' : '/perfil', { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setLoading(true)
    const res = await login(email, senha)
    if (res.ok) {
      navigate(email === 'admin@inclure.com.br' ? '/admin' : '/', { replace: true })
    } else {
      setErro(res.msg)
    }
    setLoading(false)
  }

  // --- VISUAL (HTML) ---
  return (
    <div className="auth">
      <div className="acesso-box">
        <h2>Entrar</h2>
        <form className="campos" onSubmit={handleSubmit}>
          <input className="campo-input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <div className="campo-senha-wrap">
            <input className="campo-input" type={verSenha ? 'text' : 'password'} placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
            <button type="button" className="btn-visibilidade" onClick={() => setVerSenha(v => !v)} tabIndex={-1}>
              <img src={verSenha ? visivelImg : naoVisivelImg} alt={verSenha ? 'Ocultar senha' : 'Mostrar senha'} />
            </button>
          </div>
          {erro && <div className="caixa-erro">{erro}</div>}
          <button type="submit" className="btn btn-verm btn-submit-full" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          <div className="acesso-link">Não tem conta? <Link to="/cadastro">Cadastre-se</Link></div>
          <div className="acesso-link"><Link to="/esqueci-senha">Esqueci minha senha</Link></div>
        </form>
      </div>
    </div>
  )
}
