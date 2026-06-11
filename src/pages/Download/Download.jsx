import { Link } from 'react-router-dom'
import appStoreImg from '../../assets/app-store.png'
import playStoreImg from '../../assets/play-store.png'
import './Download.css'

const funcionalidades = [
  { icon: 'https://placehold.co/64x64/e53935/white?text=VA', titulo: 'Videoaulas', desc: 'Acesse conteúdos educativos em vídeo com recursos de acessibilidade e adaptação.' },
  { icon: 'https://placehold.co/64x64/2196f3/white?text=TE', titulo: 'Textos Educativos', desc: 'Leia materiais explicativos sobre neurodivergências e desenvolvimento de forma acessível.' },
  { icon: 'https://placehold.co/64x64/9c27b0/white?text=JE', titulo: 'Jogos Educativos', desc: 'Atividades interativas e gamificadas para estimular habilidades cognitivas.' },
  { icon: 'https://placehold.co/64x64/4caf50/white?text=VP', titulo: 'Progresso no App', desc: 'Acompanhe seu desenvolvimento e evolução através de métricas e relatórios personalizados.' }
];

const telas = [
  { src: 'https://placehold.co/280x500/1b5e20/white?text=Tela+Inicio', alt: 'Tela de início' },
  { src: 'https://placehold.co/280x500/1565c0/white?text=Tela+Jogos', alt: 'Tela de jogos' },
  { src: 'https://placehold.co/280x500/6a1b9a/white?text=Tela+Sons', alt: 'Tela de sons' },
  { src: 'https://placehold.co/280x500/bf360c/white?text=Tela+Perfil', alt: 'Tela de perfil' },
]

export default function Download() {
  return (
    <div className="download">
      <div className="download-hero">
        <div className="hero-texto">
          <h1>Inclure no seu celular</h1>
          <p>Leve o apoio para pessoas neurodivergentes onde você for. Acesse jogos educativos, sons relaxantes, comunidade e muito mais diretamente do seu smartphone.</p>
          <div className="hero-acoes">
            <img src={appStoreImg} alt="Baixar na App Store" />
            <img src={playStoreImg} alt="Baixar no Google Play" />
          </div>
        </div>
        <div className="mockup">
          <img src="https://placehold.co/160x300/1565c0/white?text=Inclure+App" alt="Tela do app" />
          <img src="https://placehold.co/160x300/2e7d32/white?text=Tela+2" alt="Segunda tela" />
        </div>
      </div>

      <div className="rotulo">Funcionalidades do aplicativo</div>
      <div className="func-grade">
        {funcionalidades.map((f, i) => (
          <div className="func-card" key={i}>
            <div className="func-icone"><img src={f.icon} alt={f.titulo} /></div>
            <h3>{f.titulo}</h3><p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="telas">
        <h2>Conheça o aplicativo</h2>
        <p>Veja algumas das telas do Inclure em ação</p>
        <div className="telas-grade">
          {telas.map((t, i) => (
            <div className="tela" key={i}><img src={t.src} alt={t.alt} /></div>
          ))}
        </div>
      </div>

      <div className="download-chamada">
        <h2>Disponível gratuitamente</h2>
        <p>Baixe agora e tenha acesso imediato a dezenas de recursos inclusivos</p>
        <div className="btn-loja">
          <img src={appStoreImg} alt="App Store" />
          <img src={playStoreImg} alt="Google Play" />
        </div>
      </div>

      <div className="requisitos">
        <h3>Requisitos do sistema</h3>
        <div className="req-grade">
          <div className="req-item">
            <h4>iOS (iPhone / iPad)</h4>
            <ul>
              <li>iOS 14 ou superior</li>
              <li>iPhone 8 ou mais recente</li>
              <li>150 MB de espaço livre</li>
              <li>Conexão com a internet</li>
            </ul>
          </div>
          <div className="req-item">
            <h4>Android</h4>
            <ul>
              <li>Android 8.0 ou superior</li>
              <li>2 GB de RAM mínimo</li>
              <li>150 MB de espaço livre</li>
              <li>Conexão com a internet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
