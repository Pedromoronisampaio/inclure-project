import { Link } from 'react-router-dom'
import simboloImg from '../../assets/simbolo.png'
import logotipoImg from '../../assets/logotipo.png'
import instagramImg from '../../assets/instagram.png'
import facebookImg from '../../assets/facebook.png'
import twitterImg from '../../assets/twitter.png'
import telefoneImg from '../../assets/telefone.png'
import emailImg from '../../assets/email.png'
import localizacaoImg from '../../assets/localização.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="rodape-int">
        <div className="marca-rod">
          <div className="logo-rod">
            <img src={simboloImg} alt="Logo" />
            <img src={logotipoImg} alt="Inclure" />
          </div>
          <p>Tecnologia e acessibilidade para pessoas neurodivergentes. Conectando famílias, profissionais e comunidades.</p>
          <div className="redes-rod">
            <a href="#" aria-label="Instagram"><img src={instagramImg} alt="Instagram" /></a>
            <a href="#" aria-label="Facebook"><img src={facebookImg} alt="Facebook" /></a>
            <a href="#" aria-label="Twitter/X"><img src={twitterImg} alt="Twitter" /></a>
          </div>
        </div>
        <div className="col-rod">
          <h4>Navegação</h4>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/neurodivergencias">Neurodivergências</Link></li>
            <li><Link to="/profissionais">Profissionais</Link></li>
            <li><Link to="/ongs">ONGs</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
        <div className="col-rod">
          <h4>Sobre a Inclure</h4>
          <ul>
            <li><Link to="/sobre">Nossa História</Link></li>
            <li><Link to="/sobre">Missão e Valores</Link></li>
            <li><Link to="/sobre">Nossa Equipe</Link></li>
            <li><Link to="/sobre">Perguntas Frequentes</Link></li>
            <li><span>Política de Privacidade</span></li>
            <li><Link to="/download">Baixar App</Link></li>
          </ul>
        </div>
        <div className="col-rod">
          <h4>Contato</h4>
          <div className="itens-rod">
            <div className="item-rod">
              <img src={telefoneImg} alt="Tel" />
              11 92929-2929
            </div>
            <div className="item-rod">
              <img src={emailImg} alt="Email" />
              contato@inclure.com.br
            </div>
            <div className="item-rod">
              <img src={localizacaoImg} alt="Local" />
              São Paulo, SP
            </div>
          </div>
        </div>
      </div>
      <div className="rodape-inf">
        <span>© 2025 Inclure. Todos os direitos reservados.</span>
        <span>Desenvolvido por alunos da ETEC de Itaquera – Desenvolvimento de Sistemas</span>
      </div>
    </footer>
  )
}
