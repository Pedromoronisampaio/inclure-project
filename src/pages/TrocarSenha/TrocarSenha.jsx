import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import visivelImg from '../../assets/imagens-novas/visivel.png'
import naoVisivelImg from '../../assets/imagens-novas/nao-visivel.png'
import './TrocarSenha.css'

export default function TrocarSenha() {
  const [form, setForm] = useState({ senhaAtual: '', novaSenha: '', confirmar: '' })
  const [erro, setErro] = useState('')
  const [ok, setOk] = useState(false)
  const [verAtual, setVerAtual] = useState(false)
  const [verNova, setVerNova] = useState(false)
  const [verConfirmar, setVerConfirmar] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setErro('')
    const users = JSON.parse(localStorage.getItem('inclure_users') || '[]')
    const found = users.find(u => u.email === user.email && u.senha === form.senhaAtual)
    if (!found) { setErro('Senha atual incorreta.'); return }
    if (form.novaSenha.length < 6) { setErro('A nova senha deve ter pelo menos 6 caracteres.'); return }
    if (form.novaSenha !== form.confirmar) { setErro('As senhas não coincidem.'); return }
    const atualizados = users.map(u => u.email === user.email ? { ...u, senha: form.novaSenha } : u)
    localStorage.setItem('inclure_users', JSON.stringify(atualizados))
    setOk(true)
  }

  if (ok) return (
    <div className="auth">
      <div className="acesso-box acesso-box-central">
        <div className="icone-confirmacao"><img src="https://placehold.co/64x64/4caf50/white?text=OK" alt="Sucesso" /></div>
        <h2>Senha alterada!</h2>
        <p className="mensagem-sucesso">Sua senha foi alterada com sucesso.</p>
        <button className="btn btn-verde btn-largura-total" onClick={() => navigate('/perfil')}>Voltar ao perfil</button>
      </div>
    </div>
  )

  return (
    <div className="auth">
      <div className="acesso-box">
        <h2>Alterar senha</h2>
        <form className="campos" onSubmit={handleSubmit}>
          <div className="campo-senha-wrap">
            <input className="campo-input" type={verAtual ? 'text' : 'password'} placeholder="Senha atual" value={form.senhaAtual} onChange={e => setForm(f => ({ ...f, senhaAtual: e.target.value }))} required />
            <button type="button" className="btn-visibilidade" onClick={() => setVerAtual(v => !v)} tabIndex={-1}>
              <img src={verAtual ? visivelImg : naoVisivelImg} alt={verAtual ? 'Ocultar' : 'Mostrar'} />
            </button>
          </div>
          <div className="campo-senha-wrap">
            <input className="campo-input" type={verNova ? 'text' : 'password'} placeholder="Nova senha (mínimo 6 caracteres)" value={form.novaSenha} onChange={e => setForm(f => ({ ...f, novaSenha: e.target.value }))} required />
            <button type="button" className="btn-visibilidade" onClick={() => setVerNova(v => !v)} tabIndex={-1}>
              <img src={verNova ? visivelImg : naoVisivelImg} alt={verNova ? 'Ocultar' : 'Mostrar'} />
            </button>
          </div>
          <div className="campo-senha-wrap">
            <input className="campo-input" type={verConfirmar ? 'text' : 'password'} placeholder="Confirmar nova senha" value={form.confirmar} onChange={e => setForm(f => ({ ...f, confirmar: e.target.value }))} required />
            <button type="button" className="btn-visibilidade" onClick={() => setVerConfirmar(v => !v)} tabIndex={-1}>
              <img src={verConfirmar ? visivelImg : naoVisivelImg} alt={verConfirmar ? 'Ocultar' : 'Mostrar'} />
            </button>
          </div>
          {erro && <div className="caixa-erro">{erro}</div>}
          <button type="submit" className="btn btn-azul btn-submit-full">Alterar senha</button>
          <div className="acesso-link"><span onClick={() => navigate('/perfil')} className="link-voltar">Voltar ao perfil</span></div>
        </form>
      </div>
    </div>
  )
}
