import { createContext, useContext, useState } from 'react'
import { authLogin, authCadastro, authCadastroNeuro, authCadastroProfissional } from '../services/api'

const AuthContext = createContext()

const ADMIN_EMAIL = 'admin@inclure.com.br'
const ADMIN_SENHA = 'inclure@admin2025'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('inclure_user')
    return saved ? JSON.parse(saved) : null
  })

  const isLoggedIn = !!user
  const isAdmin = user?.email === ADMIN_EMAIL
  const isProfissional = user?.userRole === 'ROLE_PROFESSIONAL' || user?.tipo === 'profissional'

  // Login: tenta a API real primeiro; se offline, cai no fallback local
  const login = async (email, senha) => {
    // Admin hardcoded (não passa pela API)
    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
      const adminUser = {
        id: 0, nome: 'Administrador', email: ADMIN_EMAIL,
        tipo: 'admin', userRole: 'ROLE_ADMIN', foto: null, isAdmin: true,
        isNeurodivergente: false, isProfissional: false, sexo: 'Homem'
      }
      setUser(adminUser)
      localStorage.setItem('inclure_user', JSON.stringify(adminUser))
      return { ok: true }
    }

    try {
      const res = await authLogin(email, senha)
      const data = res.data

      // API online: retornou token JWT
      if (data?.token) {
        const userObj = {
          email,
          token: data.token,
          userRole: data.userRole || data.user?.userRole || 'ROLE_COMMON',
          nome: data.userNickname || data.user?.userNickname || email,
          ...(data.user || {}),
        }
        setUser(userObj)
        localStorage.setItem('inclure_user', JSON.stringify(userObj))
        return { ok: true }
      }

      // API offline: fallback no localStorage
      const users = JSON.parse(localStorage.getItem('inclure_users') || '[]')
      const found = users.find(u => u.email === email && u.senha === senha)
      if (!found) return { ok: false, msg: 'Email ou senha incorretos.' }
      const { senha: _, ...safe } = found
      setUser(safe)
      localStorage.setItem('inclure_user', JSON.stringify(safe))
      return { ok: true }
    } catch {
      return { ok: false, msg: 'Erro ao conectar. Verifique sua conexão.' }
    }
  }

  // Cadastro: tenta a API real (rota correta por tipo); se offline, cai no fallback local
  const cadastro = async (dadosLocais, payloadApi, tipo) => {
    // Tenta enviar para a API
    try {
      if (payloadApi) {
        if (tipo === 'neurodivergente') {
          await authCadastroNeuro(payloadApi)
        } else if (tipo === 'profissional') {
          await authCadastroProfissional(payloadApi)
        } else {
          await authCadastro(payloadApi)
        }
      }
    } catch {
      // API indisponível: segue com fallback local silenciosamente
    }

    // Fallback local (funciona offline e serve de cache)
    const users = JSON.parse(localStorage.getItem('inclure_users') || '[]')
    if (users.find(u => u.email === dadosLocais.email)) {
      return { ok: false, msg: 'Este email já está cadastrado.' }
    }
    const newUser = {
      ...dadosLocais,
      id: Date.now(),
      foto: null,
      userRole: dadosLocais.userRole || 'ROLE_COMMUN', // enum exato da API
    }
    users.push(newUser)
    localStorage.setItem('inclure_users', JSON.stringify(users))
    const { senha: _, ...safe } = newUser
    setUser(safe)
    localStorage.setItem('inclure_user', JSON.stringify(safe))
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('inclure_user')
  }

  const updateUser = (dados) => {
    const updated = { ...user, ...dados }
    setUser(updated)
    localStorage.setItem('inclure_user', JSON.stringify(updated))
    const users = JSON.parse(localStorage.getItem('inclure_users') || '[]')
    const idx = users.findIndex(u => u.id === user.id)
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...dados }
      localStorage.setItem('inclure_users', JSON.stringify(users))
    }
  }

  const updateFoto = (fotoBase64) => {
    updateUser({ foto: fotoBase64 })
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, isProfissional, login, cadastro, logout, updateUser, updateFoto }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
