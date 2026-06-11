import { useState } from 'react'
import { Link } from 'react-router-dom'
import './EsqueciSenha.css'

export default function EsqueciSenha() {
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleEnviar = (e) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErro('Por favor, informe um e-mail válido.')
      return
    }
    setErro('')
    setEnviado(true)
  }

  const reenviar = () => {
    alert('E-mail reenviado!')
  }

  if (enviado) return (
    <div className="auth">
      <div className="acesso-box">
        <div className="acesso-box-central">
          <img src="https://placehold.co/64x64/e8f5e9/2e7d32?text=✉" alt="Email" className="recuperacao-icone" />
          <h2 className="recuperacao-titulo-conf">E-mail enviado!</h2>
          <p className="recuperacao-subtitulo">Enviamos um link de recuperação para</p>
          <strong className="email-destaque">{email}</strong>
          <p className="recuperacao-texto-reenvio">
            Não recebeu? <span className="link-reenvio" onClick={reenviar}>Reenviar e-mail</span>
          </p>
          <div className="acesso-link"><Link to="/login">Voltar para o login</Link></div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="auth">
      <div className="acesso-box">
        <div className="recuperacao-header">
          <img src="https://placehold.co/64x64/e8f5e9/2e7d32?text=🔑" alt="Chave" className="recuperacao-icone" />
          <h2 className="recuperacao-titulo">Esqueci minha senha</h2>
          <p className="recuperacao-desc">Digite o e-mail cadastrado e enviaremos um link para criar uma nova senha.</p>
        </div>
        <form className="campos" onSubmit={handleEnviar}>
          <label className="recuperacao-label">E-mail</label>
          <input className="campo-input" type="email" placeholder="seu@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          {erro && <div className="recuperacao-erro">{erro}</div>}
          <button type="submit" className="btn btn-verde btn-recuperacao">Enviar link de recuperação</button>
          <div className="acesso-link"><Link to="/login">Voltar para o login</Link></div>
        </form>
      </div>
    </div>
  )
}
