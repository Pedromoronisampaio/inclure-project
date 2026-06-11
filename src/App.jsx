import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import RotaProtegida from './components/RotaProtegida/RotaProtegida'
import Home from './pages/Home/Home'
import Sobre from './pages/Sobre/Sobre'
import Neurodivergencias from './pages/Neurodivergencias/Neurodivergencias'
import NeuroDetalhe from './pages/NeuroDetalhe/NeuroDetalhe'
import Profissionais from './pages/Profissionais/Profissionais'
import ONGs from './pages/ONGs/ONGs'
import Blog from './pages/Blog/Blog'
import BlogDetalhe from './pages/BlogDetalhe/BlogDetalhe'
import Download from './pages/Download/Download'
import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Perfil from './pages/Perfil/Perfil'
import EsqueciSenha from './pages/EsqueciSenha/EsqueciSenha'
import TrocarSenha from './pages/TrocarSenha/TrocarSenha'
import AdminPerfil from './pages/Admin/AdminPerfil'
import AdminDashboard from './pages/Admin/AdminDashboard'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/neurodivergencias" element={<Neurodivergencias />} />
        <Route path="/neurodivergencias/:slug" element={<NeuroDetalhe />} />
        <Route path="/profissionais" element={<Profissionais />} />
        <Route path="/profissionais/:id" element={<Profissionais />} />
        <Route path="/deletar-usuario/:id" element={<Profissionais />} />
        <Route path="/ongs" element={<ONGs />} />
        <Route path="/ongs/adicionar" element={<ONGs />} />
        <Route path="/deletar-ong/:id" element={<ONGs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetalhe />} />
        <Route path="/download" element={<Download />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro/neurodivergente" element={<Cadastro />} />
        <Route path="/cadastro/profissional" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/trocar-senha" element={<TrocarSenha />} />
        <Route path="/perfil" element={<RotaProtegida><Perfil /></RotaProtegida>} />
        <Route path="/admin" element={<RotaProtegida apenasAdmin><AdminPerfil /></RotaProtegida>} />
        <Route path="/admin/dashboard" element={<RotaProtegida apenasAdmin><AdminDashboard /></RotaProtegida>} />
      </Routes>
      <Footer />
    </>
  )
}
