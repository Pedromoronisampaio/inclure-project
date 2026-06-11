import { useState } from 'react'
import missaoImg from '../../assets/missao.png'
import visaoImg from '../../assets/visao.png'
import valoresImg from '../../assets/valores.png'
import './Sobre.css'

const equipe = [
  { nome: 'Adriano Fernandes', cargo: 'Desenvolvedor Frontend', img: 'https://placehold.co/70x70/90caf9/white?text=AF' },
  { nome: 'Arthur Carlos', cargo: 'Desenvolvedor Frontend', img: 'https://placehold.co/70x70/a5d6a7/white?text=AC' },
  { nome: 'Arthur Nascimento', cargo: 'Banco de Dados', img: 'https://placehold.co/70x70/ffcc80/white?text=AN' },
  { nome: 'Isabely Sampaio', cargo: 'Desenvolvedora de Projetos', img: 'https://placehold.co/70x70/f48fb1/white?text=IS' },
  { nome: 'Mateus Mendes', cargo: 'Desenvolvedor Backend', img: 'https://placehold.co/70x70/ce93d8/white?text=MM' },
  { nome: 'Matheus Santos', cargo: 'Desenvolvedor FullStack', img: 'https://placehold.co/70x70/9fa8da/white?text=MS' },
  { nome: 'Pedro Morôni', cargo: 'Desenvolvedor Backend', img: 'https://placehold.co/70x70/80cbc4/white?text=PM' },
]

const faqs = [
  { p: 'O Inclure é gratuito?', r: 'Sim, oferecemos uma versão gratuita com acesso a recursos básicos como jogos educativos, artigos sobre neurodivergências e listagem de profissionais e ONGs.' },
  { p: 'Quem pode usar o Inclure?', r: 'O Inclure é destinado a pessoas neurodivergentes, seus familiares, cuidadores e profissionais da área de saúde e educação.' },
  { p: 'Como faço para encontrar profissionais?', r: 'Acesse a seção "Profissionais" no menu de navegação. Você pode filtrar por especialidade, localização e tipo de atendimento.' },
  { p: 'Os conteúdos são verificados por especialistas?', r: 'Sim. Todo o conteúdo educacional é revisado e validado por profissionais especializados em saúde mental e educação inclusiva.' },
  { p: 'Como posso cadastrar minha ONG ou serviço?', r: 'Entre em contato pelo e-mail contato@inclure.com.br. Nossa equipe analisará seu cadastro em até 5 dias úteis.' },
]

export default function Sobre() {
  const [aberta, setAberta] = useState(null)
  return (
    <div className="principal">
      <div className="topo"><h1 className="titulo-sec">Sobre</h1></div>
      <div className="caixa historia">
        <h2>Nossa história</h2>
        <p>Durante nossa jornada educacional, percebemos a lacuna existente em ferramentas tecnológicas verdadeiramente acessíveis para pessoas neurodivergentes. Muitas plataformas educacionais não consideravam as necessidades específicas de pessoas com TEA, TDAH, Dislexia ou TOC. Movidos pela vontade de fazer a diferença, criamos o Inclure: uma plataforma completa que une educação, regulação emocional e comunidade em um ambiente seguro e acolhedor.</p>
      </div>
      <div className="mvv">
        {[
          { img: missaoImg, titulo: 'Missão', texto: 'Ser referência em plataformas educacionais inclusivas, reconhecida pela qualidade, acessibilidade e impacto positivo na vida de milhares de pessoas neurodivergentes.' },
          { img: visaoImg, titulo: 'Visão', texto: 'Ser a principal plataforma de apoio para pessoas neurodivergentes no Brasil, promovendo inclusão, autonomia e participação social por meio da tecnologia.' },
          { img: valoresImg, titulo: 'Valores', texto: 'Inclusão, empatia, acessibilidade, inovação e respeito à diversidade são os pilares que guiam todas as nossas decisões e ações.' },
        ].map((m, i) => (
          <div className="mvv-card" key={i}>
            <div className="icone-mvv"><img src={m.img} alt={m.titulo} /></div>
            <div className="texto-mvv"><h3>{m.titulo}</h3><p>{m.texto}</p></div>
          </div>
        ))}
      </div>
      <h2 className="titulo-sec">Nossa equipe</h2>
      <div className="equipe">
        {equipe.map((e, i) => (
          <div className="card-equipe" key={i}>
            <div className="avatar-equipe"><img src={e.img} alt={e.nome} /></div>
            <h4>{e.nome}</h4><p>{e.cargo}</p>
          </div>
        ))}
      </div>
      <h2 className="titulo-sec">Perguntas frequentes</h2>
      <div className="faq">
        {faqs.map((f, i) => (
          <div className="faq-item" key={i} onClick={() => setAberta(aberta === i ? null : i)}>
            <div className="faq-pergunta">
              {f.p}
              <span className={`faq-alt ${aberta === i ? 'menos aberto' : 'mais'}`}>{aberta === i ? '−' : '+'}</span>
            </div>
            <div className={`faq-resp${aberta === i ? ' aberta' : ''}`}>{f.r}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
