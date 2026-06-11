import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function RotaProtegida({ children, apenasAdmin = false }) {
  const { isLoggedIn, isAdmin } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  if (apenasAdmin && !isAdmin) return <Navigate to="/" replace />
  return children
}
