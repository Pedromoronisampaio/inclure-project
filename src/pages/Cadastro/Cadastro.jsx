import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import visivelImg from '../../assets/imagens-novas/visivel.png'
import naoVisivelImg from '../../assets/imagens-novas/nao-visivel.png'
import './Cadastro.css'

// --- CONFIGURAÇÕES / DADOS ---
// Valores exatos dos enums da API (NeuroType.java)
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

function getMaxDate() {
  const d = new Date()
  d.setFullYear(d.getFullYear() - 6)
  return d.toISOString().split('T')[0]
}

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '', dataNascimento: '', sexo: '',
    isNeurodivergente: false, isProfissional: false,
    neurodivergencia: '', cargo: '',
    email: '', senha: '', confirmarSenha: '',
  })
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)
  const [verSenha, setVerSenha] = useState(false)
  const [verConfirmar, setVerConfirmar] = useState(false)
  const { cadastro, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (isLoggedIn) { navigate('/', { replace: true }); return null }

  const set = (field, value) => setForm(f => ({ ...f, [field]: value }))

  // Sincroniza URL com estado das checkboxes
  useEffect(() => {
    const path = location.pathname
    if (path === '/cadastro/neurodivergente' && !form.isNeurodivergente) {
      setForm(f => ({ ...f, isNeurodivergente: true, isProfissional: false }))
    } else if (path === '/cadastro/profissional' && !form.isProfissional) {
      setForm(f => ({ ...f, isProfissional: true, isNeurodivergente: false }))
    } else if (path === '/cadastro' && (form.isNeurodivergente || form.isProfissional)) {
      setForm(f => ({ ...f, isNeurodivergente: false, isProfissional: false }))
    }
  }, [location.pathname])

  // Ao marcar neurodivergente
  const handleNeuroChange = (checked) => {
    if (checked) {
      setForm(f => ({ ...f, isNeurodivergente: true, isProfissional: false, cargo: '' }))
      navigate('/cadastro/neurodivergente')
    } else {
      setForm(f => ({ ...f, isNeurodivergente: false, neurodivergencia: '' }))
      navigate('/cadastro')
    }
  }

  // Ao marcar profissional
  const handleProfissionalChange = (checked) => {
    if (checked) {
      setForm(f => ({ ...f, isProfissional: true, isNeurodivergente: false, neurodivergencia: '' }))
      navigate('/cadastro/profissional')
    } else {
      setForm(f => ({ ...f, isProfissional: false, cargo: '' }))
      navigate('/cadastro')
    }
  }

  // Mapeamento de sexo para API
  const sexoParaApi = (sexo) => {
    if (sexo === 'Homem') return 'MALE'
    if (sexo === 'Mulher') return 'FEMALE'
    return 'NOT_INFORMED'
  }

  // Determina o userRole — valores exatos do enum UserRoles.java da API
  const getUserRole = () => {
    if (form.isNeurodivergente) return 'ROLE_NEURODIVERGENT'
    if (form.isProfissional) return 'ROLE_PROFESSIONAL'
    return 'ROLE_COMMUN'   // ← enum chama ROLE_COMMUN (sem N final)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    if (form.senha !== form.confirmarSenha) { setErro('As senhas não coincidem.'); return }
    
    // Validação da Senha
    const senha = form.senha
    if (senha.length < 6) { setErro('A senha deve ter pelo menos 6 caracteres.'); return }
    if (!/[A-Z]/.test(senha)) { setErro('A senha deve conter pelo menos uma letra maiúscula.'); return }
    if (!/[a-z]/.test(senha)) { setErro('A senha deve conter pelo menos uma letra minúscula.'); return }
    if (!/[0-9]/.test(senha)) { setErro('A senha deve conter pelo menos um número.'); return }
    if (!/[^A-Za-z0-9]/.test(senha)) { setErro('A senha deve conter pelo menos um símbolo especial (ex: @, #, $, !).'); return }

    if (form.isProfissional && !form.cargo) { setErro('Selecione seu cargo profissional.'); return }

    const userRole = getUserRole()

    // Payload no formato da API (enviado ao backend)
    const payload = {
      userNickname: form.nome,
      dateBirth: form.dataNascimento,
      sexOfUser: sexoParaApi(form.sexo),
      yesOrNoNeurodivergent: form.isNeurodivergente,
      userEmail: form.email,
      userPassword: form.senha,
      userPhoto: '',
      userRole,
    }

    // Campos extras para neurodivergente
    if (form.isNeurodivergente) {
      payload.neurodivergence = form.neurodivergencia || null
      payload.emailParent = ''
    }

    // Campos extras para profissional
    if (form.isProfissional) {
      payload.specialty = form.cargo
      payload.professionalName = form.nome
      payload.professionalEmail = form.email
      payload.registrationNumber = null
      payload.socialNetwork = null
      payload.experienceTime = null
      payload.description = null
      payload.typeService = null
      payload.contactNumber = null
      payload.validate = false
    }

    // Tipo do usuário (para o AuthContext escolher a rota correta)
    const tipo = form.isNeurodivergente ? 'neurodivergente'
               : form.isProfissional    ? 'profissional'
               : 'comum'

    // Dados locais (armazenamento local / fallback)
    const dadosLocais = {
      nome: form.nome,
      dataNascimento: form.dataNascimento,
      sexo: form.sexo,
      tipo,
      isNeurodivergente: form.isNeurodivergente,
      isProfissional: form.isProfissional,
      neurodivergencias: form.neurodivergencia ? [form.neurodivergencia] : [],
      neurodivergencia: form.neurodivergencia,
      cargo: form.cargo,
      email: form.email,
      senha: form.senha,
      userRole,
    }

    setLoading(true)
    // Passa payload (API), dadosLocais (fallback) e tipo (rota correta)
    const res = await cadastro(dadosLocais, payload, tipo)
    if (res.ok) { navigate('/', { replace: true }) }
    else { setErro(res.msg) }
    setLoading(false)
  }

  const maxDate = getMaxDate()

  // --- VISUAL (HTML) ---
  return (
    <div className="auth auth-wide">
      <div className="acesso-box">
        <h2>Cadastre-se</h2>
        <form className="campos" onSubmit={handleSubmit}>

          {/* Nome */}
          <input
            className="campo-input"
            type="text"
            placeholder="Nome completo"
            value={form.nome}
            onChange={e => set('nome', e.target.value)}
            required
          />

          {/* Data de Nascimento */}
          <input
            className="campo-input"
            type="date"
            value={form.dataNascimento}
            min="1900-01-01"
            max={maxDate}
            onChange={e => set('dataNascimento', e.target.value)}
            required
            title="Data de nascimento (mínimo 6 anos de idade, a partir de 1900)"
          />

          {/* Sexo */}
          <div>
            <div className="label-sexo">Sexo</div>
            <div className="sexo">
              {['Homem', 'Mulher', 'Prefiro não dizer'].map(s => (
                <button
                  type="button"
                  key={s}
                  className={`btn-sexo${form.sexo === s ? ' ativo' : ''}`}
                  onClick={() => set('sexo', s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="def">
            <h3>
              Perfil de usuário
            </h3>
            <div className="texto-tipos">
              <strong>Quem pode usar o Inclure?</strong>
              <ul>
                <li><strong>Usuário Comum:</strong> Familiar, responsável ou pessoa buscando informações e suporte na plataforma.</li>
                <li><strong>Neurodivergente:</strong> Pessoa com TEA, TDAH, Dislexia, TOC ou outra neurodivergência.</li>
                <li><strong>Profissional:</strong> Psicólogo, terapeuta, médico ou outro profissional da saúde.</li>
              </ul>
            </div>
          </div>

          {/* Checkbox: Neurodivergente */}
          <div>
            <label className={`toggle-neuro${form.isProfissional ? ' campo-bloqueado' : ''}`}>
              <input
                type="checkbox"
                checked={form.isNeurodivergente}
                disabled={form.isProfissional}
                onChange={e => handleNeuroChange(e.target.checked)}
              />
              <label className="link-cursor">Sou uma pessoa neurodivergente</label>
            </label>
          </div>

          {/* Campos condicionais: Neurodivergente */}
          <div className={`${!form.isNeurodivergente ? 'campo-bloqueado' : ''} campo-relativo`}>
            <div className="label-sexo">
              Qual a sua neurodivergência?
            </div>
            <select
              className="campo-input seletor seletor-full"
              value={form.neurodivergencia}
              onChange={e => set('neurodivergencia', e.target.value)}
              disabled={!form.isNeurodivergente}
            >
              <option value="">Selecione (opcional)</option>
              {NEUROS.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
            </select>
            {!form.isNeurodivergente && (
              <div className="aviso-campo">
                Marque "Sou uma pessoa neurodivergente" para habilitar este campo.
              </div>
            )}
          </div>

          {/* Checkbox: Profissional */}
          <div>
            <label className={`toggle-neuro${form.isNeurodivergente ? ' campo-bloqueado' : ''}`}>
              <input
                type="checkbox"
                checked={form.isProfissional}
                disabled={form.isNeurodivergente}
                onChange={e => handleProfissionalChange(e.target.checked)}
              />
              <label className="link-cursor">Sou profissional e atuo na área</label>
            </label>
          </div>

          {/* Campos condicionais: Profissional */}
          <div className={`${!form.isProfissional ? 'campo-bloqueado' : ''} campo-relativo`}>
            <div className="label-sexo">Cargo / Especialidade</div>
            <select
              className="campo-input seletor seletor-full"
              value={form.cargo}
              onChange={e => set('cargo', e.target.value)}
              disabled={!form.isProfissional}
              required={form.isProfissional}
            >
              <option value="">Selecione seu cargo</option>
              {CARGOS.map(c => <option key={c}>{c}</option>)}
            </select>
            {!form.isProfissional && (
              <div className="aviso-campo">
                Marque "Sou profissional e atuo na área" para habilitar este campo.
              </div>
            )}
          </div>

          {/* Email */}
          <input
            className="campo-input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            required
          />

          {/* Senha */}
          <div className="campo-senha-wrap">
            <input
              className="campo-input"
              type={verSenha ? 'text' : 'password'}
              placeholder="Senha (mínimo 6 caracteres)"
              value={form.senha}
              onChange={e => set('senha', e.target.value)}
              required
            />
            <button type="button" className="btn-visibilidade" onClick={() => setVerSenha(v => !v)} tabIndex={-1}>
              <img src={verSenha ? visivelImg : naoVisivelImg} alt={verSenha ? 'Ocultar senha' : 'Mostrar senha'} />
            </button>
          </div>

          {/* Confirmar Senha */}
          <div className="campo-senha-wrap">
            <input
              className="campo-input"
              type={verConfirmar ? 'text' : 'password'}
              placeholder="Confirmar senha"
              value={form.confirmarSenha}
              onChange={e => set('confirmarSenha', e.target.value)}
              required
            />
            <button type="button" className="btn-visibilidade" onClick={() => setVerConfirmar(v => !v)} tabIndex={-1}>
              <img src={verConfirmar ? visivelImg : naoVisivelImg} alt={verConfirmar ? 'Ocultar senha' : 'Mostrar senha'} />
            </button>
          </div>

          {erro && <div className="caixa-erro">{erro}</div>}

          <button type="submit" className="btn btn-verm btn-submit-full" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          <div className="acesso-link">Já tenho conta? <Link to="/login">Entrar</Link></div>
        </form>
      </div>
    </div>
  )
}
