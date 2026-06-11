import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(config => {
  const user = localStorage.getItem('inclure_user')
  if (user) {
    const { token } = JSON.parse(user)
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Retorna uma Promise resolvida simulando resposta da API
const localResponse = (data) => Promise.resolve({ data })

// Auth
export const authLogin = (email, senha) => {
  // Rota e campos alinhados com UserAuthenticationDTO { userEmail, userPassword }
  return api.post('/login', { userEmail: email, userPassword: senha })
    .catch(() => localResponse({ token: null, user: { email } }))
}

// Cadastro usuário comum → POST /cadastro (UserRegisterDTO)
export const authCadastro = (dados) => {
  return api.post('/cadastro', dados)
    .catch(() => localResponse({ ok: true }))
}

// Cadastro neurodivergente → POST /cadastro/neurodivergente (NeurodivergentRegisterDTO)
export const authCadastroNeuro = (dados) => {
  return api.post('/cadastro/neurodivergente', dados)
    .catch(() => localResponse({ ok: true }))
}

// Cadastro profissional → POST /cadastro/profissional/ (ProfessionalRegisterDTO)
export const authCadastroProfissional = (dados) => {
  return api.post('/cadastro/profissional/', dados)
    .catch(() => localResponse({ ok: true }))
}

// Usuário
export const getMe = () => {
  return api.get('/usuarios/me')
    .catch(() => localResponse(JSON.parse(localStorage.getItem('inclure_user') || '{}')))
}

export const updateMe = (dados) => {
  return api.put('/usuarios/me', dados)
    .catch(() => localResponse({ ok: true }))
}

// Profissionais
export const getProfissionais = () => {
  return api.get('/profissionais').catch(() => {
    const extra = JSON.parse(localStorage.getItem('inclure_profissionais_extra') || '[]')
    return localResponse(extra)
  })
}

export const postProfissional = (dados) => {
  return api.post('/profissionais', dados).catch(() => {
    const extra = JSON.parse(localStorage.getItem('inclure_profissionais_extra') || '[]')
    const novo = { ...dados, id: Date.now(), validado: false }
    extra.push(novo)
    localStorage.setItem('inclure_profissionais_extra', JSON.stringify(extra))
    return localResponse(novo)
  })
}

export const putProfissional = (id, dados) => {
  return api.put(`/profissionais/${id}`, dados).catch(() => {
    const extra = JSON.parse(localStorage.getItem('inclure_profissionais_extra') || '[]')
    const idx = extra.findIndex(p => p.id === id)
    if (idx !== -1) {
      extra[idx] = { ...extra[idx], ...dados }
      localStorage.setItem('inclure_profissionais_extra', JSON.stringify(extra))
    }
    return localResponse({ ok: true })
  })
}

export const deleteProfissional = (id) => {
  return api.delete(`/profissionais/${id}`).catch(() => {
    const extra = JSON.parse(localStorage.getItem('inclure_profissionais_extra') || '[]')
    localStorage.setItem('inclure_profissionais_extra', JSON.stringify(extra.filter(p => p.id !== id)))
    return localResponse({ ok: true })
  })
}

export const validarProfissional = (id, validado) => {
  return api.put(`/profissionais/${id}/validar`, { validado }).catch(() => {
    const val = JSON.parse(localStorage.getItem('inclure_validacoes') || '{}')
    val[id] = validado
    localStorage.setItem('inclure_validacoes', JSON.stringify(val))
    return localResponse({ ok: true })
  })
}

// ONGs
export const getOngs = () => {
  return api.get('/ongs').catch(() => {
    const extra = JSON.parse(localStorage.getItem('inclure_ongs_extra') || '[]')
    return localResponse(extra)
  })
}

export const postOng = (dados) => {
  // Monta payload alinhado com a API
  const payload = {
    nameInstitution:        dados.nameInstitution        || dados.nome       || '',
    emailInstitution:       dados.emailInstitution       || dados.email      || '',
    localInstitution:       dados.localInstitution       || dados.estado     || '',
    focusInstitution:       dados.focusInstitution       || dados.condicao   || '',
    descriptionInstitution: dados.descriptionInstitution || dados.descricao  || '',
    urlOfficialWebsite:     dados.urlOfficialWebsite     || dados.site       || '',
    imageInstitution:       dados.imageInstitution       || dados.img        || '',
    cnpjInstitution:        dados.cnpjInstitution        || '',
    // campos auxiliares para compatibilidade de exibição local
    nome:      dados.nameInstitution  || dados.nome,
    email:     dados.emailInstitution || dados.email,
    estado:    dados.localInstitution || dados.estado,
    condicao:  dados.focusInstitution || dados.condicao,
    descricao: dados.descriptionInstitution || dados.descricao,
    site:      dados.urlOfficialWebsite || dados.site,
    img:       dados.imageInstitution || dados.img,
    telefone:  dados.telefone || '',
    servicos:  dados.servicos || [],
  }
  // Rota alinhada com ContentController → POST /ongs/registerInstitution
  return api.post('/ongs/registerInstitution', payload).catch(() => {
    const extra = JSON.parse(localStorage.getItem('inclure_ongs_extra') || '[]')
    const nova = { ...payload, id: Date.now() }
    extra.push(nova)
    localStorage.setItem('inclure_ongs_extra', JSON.stringify(extra))
    return localResponse(nova)
  })
}

export const deleteOng = (id) => {
  return api.delete(`/ongs/${id}`).catch(() => {
    const base = JSON.parse(localStorage.getItem('inclure_ongs_removidas') || '[]')
    base.push(id)
    localStorage.setItem('inclure_ongs_removidas', JSON.stringify(base))
    const extra = JSON.parse(localStorage.getItem('inclure_ongs_extra') || '[]')
    localStorage.setItem('inclure_ongs_extra', JSON.stringify(extra.filter(o => o.id !== id)))
    return localResponse({ ok: true })
  })
}

// Artigos
export const getArtigos = () => {
  return api.get('/artigos').catch(() => {
    const extra = JSON.parse(localStorage.getItem('inclure_artigos_extra') || '[]')
    return localResponse(extra)
  })
}

export const postArtigo = (dados) => {
  return api.post('/artigos', dados).catch(() => {
    const extra = JSON.parse(localStorage.getItem('inclure_artigos_extra') || '[]')
    const novo = { ...dados, id: Date.now() }
    extra.push(novo)
    localStorage.setItem('inclure_artigos_extra', JSON.stringify(extra))
    return localResponse(novo)
  })
}

export const deleteArtigo = (id) => {
  return api.delete(`/artigos/${id}`).catch(() => {
    const base = JSON.parse(localStorage.getItem('inclure_artigos_removidos') || '[]')
    base.push(id)
    localStorage.setItem('inclure_artigos_removidos', JSON.stringify(base))
    const extra = JSON.parse(localStorage.getItem('inclure_artigos_extra') || '[]')
    localStorage.setItem('inclure_artigos_extra', JSON.stringify(extra.filter(a => a.id !== id)))
    return localResponse({ ok: true })
  })
}

// Dashboard
export const getDashboard = () => {
  return api.get('/admin/dashboard').catch(() => {
    const users = JSON.parse(localStorage.getItem('inclure_users') || '[]')
    const extraProf = JSON.parse(localStorage.getItem('inclure_profissionais_extra') || '[]')
    const extraOngs = JSON.parse(localStorage.getItem('inclure_ongs_extra') || '[]')
    const extraArtigos = JSON.parse(localStorage.getItem('inclure_artigos_extra') || '[]')
    return localResponse({
      totalUsuarios: users.length,
      porTipo: {
        neurodivergente: users.filter(u => u.tipo === 'neurodivergente').length,
        responsavel: users.filter(u => u.tipo === 'responsavel').length,
        profissional: users.filter(u => u.tipo === 'profissional').length,
      },
      totalProfissionais: extraProf.length,
      profissionaisValidados: extraProf.filter(p => p.validado).length,
      totalOngs: extraOngs.length,
      totalArtigos: extraArtigos.length,
    })
  })
}

export default api
