import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import appStoreImg from '../../assets/app-store.png'
import playStoreImg from '../../assets/play-store.png'
import emailImg from '../../assets/email.png'
import telefoneImg from '../../assets/telefone.png'
import localizacaoImg from '../../assets/localização.png'
import instagramImg from '../../assets/instagram.png'
import facebookImg from '../../assets/facebook.png'
import twitterImg from '../../assets/twitter.png'
import enviarImg from '../../assets/enviar.png'
import mascoteImg from '../../assets/mascote.png'
import iconeAppImg from '../../assets/icone-app.png'
import recurso001 from '../../assets/recursos-site/recurso_001.jpeg'
import recurso002 from '../../assets/recursos-site/recurso_002.jpeg'
import recurso003 from '../../assets/recursos-site/recurso_003.jpeg'
import recurso004 from '../../assets/recursos-site/recurso_004.jpeg'
import './Home.css'

export default function Home() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  const recursos = [
    { icon: recurso001, titulo: 'Busca por Profissionais', desc: 'Encontre especialistas próximos a você' },
    { icon: recurso002, titulo: 'Informações sobre Neurodivergências', desc: 'Conteúdos explicativos sobre diferentes condições neurodivergentes' },
    { icon: recurso003, titulo: 'Blog', desc: 'Artigos, dicas e novidades sobre inclusão e desenvolvimento' },
    { icon: recurso004, titulo: 'ONGs', desc: 'Informações sobre organizações que apoiam pessoas neurodivergentes' }
  ];
  const handleEnviar = (e) => {
    e.preventDefault()
    alert('Mensagem enviada! Entraremos em contato em breve.')
    e.target.reset()
  }

  return (
    <div className="principal">
      <section className="destaque">
        <div className="txt-destaque">
          <h1>Bem-vindo ao <span>Inclure</span></h1>
          <p>Uma plataforma educacional pensada para pessoas neurodivergentes, seus familiares e profissionais. Aprenda, se conecte e encontre o apoio que precisa.</p>
          <div className="acoes">
            {!isLoggedIn && <Link to="/cadastro" className="btn btn-verm">Cadastrar</Link>}
            {!isLoggedIn && <Link to="/login" className="btn btn-ciano">Login</Link>}
            <Link to="/download" className="btn btn-verde">Baixar App</Link>
          </div>
        </div>
        <div className="img-destaque">
          <img src={mascoteImg} alt="Inclure" />
        </div>
      </section>

      <div className="rotulo">Recursos da Inclure</div>
      <div className="grade-cards">
        {recursos.map((r, i) => (
          <div className="card" key={i}>
            <div className="icone-card"><img src={r.icon} alt={r.titulo} /></div>
            <h3>{r.titulo}</h3>
            <p>{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="baixar-app">
        <div className="img-cel">
          <img src={iconeAppImg} alt="Celular com app" />
        </div>
        <div className="texto-app">
          <h2>Baixe nosso aplicativo</h2>
          <p>Tenha acesso a jogos, videoaulas e sons relaxantes onde estiver.</p>
          <div className="btn-loja">
            <Link to="/download"><img src={appStoreImg} alt="App Store" /></Link>
            <Link to="/download"><img src={playStoreImg} alt="Google Play" /></Link>
          </div>
        </div>
      </div>

      <div className="contato">
        <div className="info-contato">
          <h2>Entre em contato</h2>
          <p>Dúvidas, sugestões ou parcerias? Fale com a gente!</p>
          <div className="itens-cont">
            <div className="item-cont"><img src={telefoneImg} alt="Tel" />11 92929-2929</div>
            <div className="item-cont"><img src={emailImg} alt="Email" />contato@inclure.com.br</div>
            <div className="item-cont"><img src={localizacaoImg} alt="Local" />Avenida Inclure, 123 – São Paulo, SP</div>
          </div>
          <div className="tit-redes">Nossas redes</div>
          <div className="redes">
            <div className="btn-rede btn-rede-instagram"><img src={instagramImg} alt="Instagram" /></div>
            <div className="btn-rede btn-rede-facebook"><img src={facebookImg} alt="Facebook" /></div>
            <div className="btn-rede btn-rede-twitter"><img src={twitterImg} alt="Twitter" /></div>
          </div>
        </div>
        <form className="campos" onSubmit={handleEnviar}>
          <input className="campo-input" type="text" placeholder="Nome" required />
          <input className="campo-input" type="email" placeholder="Email" required />
          <input className="campo-input" type="text" placeholder="Assunto" required />
          <textarea className="campo-input area-txt" placeholder="Digite sua mensagem..." required />
          <button type="submit" className="btn-enviar">
            <img src={enviarImg} alt="" />Enviar
          </button>
        </form>
      </div>
    </div>
  )
}
