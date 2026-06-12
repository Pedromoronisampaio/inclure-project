import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import usuarioImg from "../../assets/usuario.png"
import sairIconImg from '../../assets/imagens-novas/sair-icon.png'
import './Perfil.css'


// Valores exatos do enum NeuroType.java da API
// ATENÇÃO: 'AUSTIM_SPECTRUM' é o nome real no enum da API (typo original)
const NEUROS = [
  { value: 'AUSTIM_SPECTRUM', label: 'Autismo (TEA)' },
  { value: 'TOC',             label: 'TOC' },
  { value: 'DYSLEXIA',        label: 'Dislexia' },
]

const CARGOS = [
  'Psicólogo(a)', 'Terapeuta', 'Fonoaudiólogo(a)',
  'Psiquiatra', 'Neurologista', 'Psicopedagogo(a)', 'Outro',
]

// Mapeia userRole (ou tipo legado) para badge de exibição
const ROLE_BADGE = {
  ROLE_NEURODIVERGENT: { label: 'Neurodivergente',     classe: 'perfil-badge--neurodivergente' },
  ROLE_PROFESSIONAL:   { label: 'Profissional',         classe: 'perfil-badge--profissional' },
  ROLE_COMMUN:         { label: 'Usuário',               classe: 'perfil-badge--comum' }, // enum exato da API
  ROLE_ADMIN:          { label: 'Administrador',         classe: 'perfil-badge--admin' },
  // compatibilidade com dados legados
  neurodivergente:     { label: 'Neurodivergente',     classe: 'perfil-badge--neurodivergente' },
  responsavel:         { label: 'Responsável',           classe: 'perfil-badge--responsavel' },
  profissional:        { label: 'Profissional',         classe: 'perfil-badge--profissional' },
  admin:               { label: 'Administrador',         classe: 'perfil-badge--admin' },
}

export default function Perfil() {
  // --- LÓGICA E ESTADO ---
  const { user, updateUser, updateFoto, logout } = useAuth()
  const navigate = useNavigate()
  const inputFotoRef = useRef()

  // Determina se é neurodivergente ou profissional com base nos novos campos ou nos legados
  const isNeuro = user?.userRole === 'ROLE_NEURODIVERGENT' || user?.tipo === 'neurodivergente' || user?.isNeurodivergente
  const isProf  = user?.userRole === 'ROLE_PROFESSIONAL'   || user?.tipo === 'profissional'   || user?.isProfissional

  const [form, setForm] = useState({
    nome:              user?.nome || '',
    email:             user?.email || '',
    dataNascimento:    user?.dataNascimento || '',
    sexo:              user?.sexo || 'Homem',
    isNeurodivergente: isNeuro,
    neurodivergencia:  user?.neurodivergencia || (user?.neurodivergencias?.[0]) || '',
    neurodivergencias: user?.neurodivergencias || [],
    cargo:             user?.cargo || '',
  })
  const [toast, setToast] = useState(null)

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000) }

  const handleFoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => { updateFoto(ev.target.result); showToast('✅ Foto atualizada!') }
    reader.readAsDataURL(file)
  }

  const handleSalvar = (e) => {
    e.preventDefault()
    // Sincroniza neurodivergencias como array para manter compatibilidade
    const dadosSalvar = {
      ...form,
      neurodivergencias: form.neurodivergencia ? [form.neurodivergencia] : [],
    }
    updateUser(dadosSalvar)
    showToast('✅ Perfil salvo com sucesso!')
  }

  const handleLogout = () => { logout(); navigate('/') }

  // Badge baseado em userRole (com fallback para tipo legado)
  const roleKey = user?.userRole || user?.tipo || 'ROLE_COMMON'
  const badge = ROLE_BADGE[roleKey] || ROLE_BADGE.ROLE_COMMON

  // Descrição de perfil
  const roleDesc =
    roleKey === 'ROLE_NEURODIVERGENT' || roleKey === 'neurodivergente'
      ? 'Sua conta está registrada como pessoa neurodivergente.'
      : roleKey === 'ROLE_PROFESSIONAL' || roleKey === 'profissional'
      ? 'Sua conta está registrada como profissional da área.'
      : roleKey === 'ROLE_ADMIN' || roleKey === 'admin'
      ? 'Sua conta possui acesso administrativo.'
      : 'Sua conta está registrada como usuário comum.'

  // --- VISUAL (HTML) ---
  return (
    <div className="perfil">
      {toast && <div className="toast">{toast}</div>}

      <div className="topo">
        <h1 className="titulo-sec">Meu Perfil</h1>
        <p className="subtitulo">Gerencie suas informações pessoais e preferências da conta</p>
      </div>

      <div className={`perfil-card ${user?.tipo === 'admin' || user?.userRole === 'ROLE_ADMIN' ? 'admin' : 'normal'}`}>
        <div className="perfil-avatar">
          <div className="perfil-avatar-img">
            <img src={user?.foto || usuarioImg} alt="Avatar" id="avatarPerfilImg" />
          </div>
          <button className="btn-foto" onClick={() => inputFotoRef.current.click()}>Editar foto</button>
          <input type="file" ref={inputFotoRef} accept="image/*" className="input-oculto" onChange={handleFoto} />
        </div>
        <div className="perfil-info">
          <div className="perfil-detalhes">
            <h2>{user?.nome || 'Nome do Usuário'}</h2>
            <div className="perfil-cargo">
              {isProf && (user?.cargo || form.cargo) ? (user?.cargo || form.cargo) : 'Usuário Inclure'}
            </div>
          </div>
          <span className={`perfil-badge ${badge.classe}`}>
            {badge.label}
          </span>
        </div>
      </div>

      <form onSubmit={handleSalvar}>
        <div className="perfil-secao">
          <h3>Informações pessoais</h3>
          <div className="perfil-campos">

            {/* Nome */}
            <div className="campo">
              <label>Nome completo</label>
              <input className="campo-input" type="text" value={form.nome}
                onChange={e => set('nome', e.target.value)} placeholder="Seu nome completo" />
            </div>

            {/* Email */}
            <div className="campo">
              <label>E-mail</label>
              <input className="campo-input" type="email" value={form.email}
                onChange={e => set('email', e.target.value)} placeholder="seu@email.com" />
            </div>

            {/* Data de nascimento */}
            <div className="campo">
              <label>Data de nascimento</label>
              <input className="campo-input" type="date" value={form.dataNascimento}
                min="1900-01-01"
                onChange={e => set('dataNascimento', e.target.value)} />
            </div>

            {/* Sexo */}
            <div className="campo">
              <label>Sexo</label>
              <div className="sexo">
                {['Homem', 'Mulher', 'Prefiro não dizer'].map(s => (
                  <button type="button" key={s}
                    className={`btn-sexo${form.sexo === s ? ' ativo' : ''}`}
                    onClick={() => set('sexo', s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Perfil: tipo e campos extras */}
            <div className="campo full">
              <label className="perfil-secao-subtitulo">Perfil</label>

              {/* Badge de role */}
              <div className="perfil-role-info">
                <span className={`perfil-badge perfil-badge-sm ${badge.classe}`}>
                  {badge.label}
                </span>
                <span className="perfil-role-desc">{roleDesc}</span>
              </div>

              {/* Campo de Neurodivergência — visível para neurodivergentes */}
              {isNeuro && (
                <div className="perfil-condicional">
                  <label className="label-neuro">Neurodivergência</label>
                  <select
                    className="campo-input seletor seletor-full"
                    value={form.neurodivergencia}
                    onChange={e => set('neurodivergencia', e.target.value)}
                  >
                    <option value="">Selecione (opcional)</option>
                    {NEUROS.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
                  </select>
                </div>
              )}

              {/* Campo de Cargo — visível para profissionais */}
              {isProf && (
                <div className="perfil-condicional">
                  <label className="label-neuro">Cargo / Especialidade</label>
                  <select
                    className="campo-input seletor seletor-full"
                    value={form.cargo}
                    onChange={e => set('cargo', e.target.value)}
                  >
                    <option value="">Selecione seu cargo</option>
                    {CARGOS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              )}

              {/* Para usuário comum: nenhum campo extra */}
              {!isNeuro && !isProf && roleKey !== 'ROLE_ADMIN' && roleKey !== 'admin' && (
                <div className="perfil-role-nota">
                  Você está cadastrado como usuário comum. Caso seja neurodivergente ou profissional da área,
                  crie uma nova conta com o perfil adequado.
                </div>
              )}
            </div>

          </div>

          <div className="perfil-acoes">
            <button type="button" className="btn-sair" onClick={handleLogout}>
              <img src={sairIconImg} alt="" className="btn-icon-sm" />Sair da conta
            </button>
            <button type="button" className="btn-senha" onClick={() => navigate('/trocar-senha')}>
              Alterar senha
            </button>
            <button type="submit" className="btn-salvar">Salvar alterações</button>
          </div>
        </div>
      </form>
    </div>
  )
}
