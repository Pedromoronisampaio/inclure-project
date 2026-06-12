import { useNavigate } from 'react-router-dom'
import autismoImg from '../../assets/neurodivergencias/neurodivergencia_001.jpeg'
import tocImg from '../../assets/neurodivergencias/neurodivergencia_002.jpeg'
import dislexiaImg from '../../assets/neurodivergencias/neurodivergencia_003.jpeg'
import './Neurodivergencias.css'

// --- CONFIGURAÇÕES / DADOS ---
export const detalheNeuro = {
  autismo: { slug:'autismo', img: autismoImg, titulo:'Transtorno do Espectro Autista (TEA)', descricao:'O TEA é um transtorno neuropsiquiátrico do desenvolvimento que afeta a comunicação, as habilidades sociais e comportamentais.', caracteristicas:['Dificuldade na comunicação verbal e não verbal','Desafio em interações socioemocionais','Padrões repetitivos e restritivos de comportamento','Hiper ou hipossensibilidade a estímulos sensoriais','Resistência a mudanças de rotina'], tratamentos:['Terapia ABA','Terapia Fonoaudiológica','Psicoterapia','Intervenções educacionais','Medicação em casos específicos'], e1:{n:'1 em 36',l:'crianças diagnosticadas nos EUA (CDC, 2023)'}, e2:{n:'3x',l:'mais comum em meninos'}, e3:{n:'~1%',l:'da população mundial'}, fontes:['CDC – Autism and Developmental Disabilities Monitoring Network, 2023','DSM-5-TR – APA, 2022','AMA – Protocolo de Diagnóstico TEA, 2023'] },
  toc: { slug:'toc', img: tocImg, titulo:'Transtorno Obsessivo-Compulsivo (TOC)', descricao:'O TOC é caracterizado por obsessões e compulsões que causam sofrimento significativo e interferem no funcionamento diário.', caracteristicas:['Obsessões recorrentes e indesejadas','Compulsões para aliviar ansiedade','Medo excessivo de contaminação ou dano','Necessidade de simetria e ordem','Pensamentos perturbadores'], tratamentos:['Terapia Cognitivo-Comoperatmental (TCC)','Exposição e Prevenção de Resposta (EPR)','Antidepressivos (ISRS)','Mindfulness','Grupos de apoio'], e1:{n:'2-3%',l:'da população mundial'}, e2:{n:'10-15',l:'anos até o diagnóstico correto'}, e3:{n:'65%',l:'melhoram com tratamento adequado'}, fontes:['OMS – ICD-11, 2022','PROTOC – IPq-HC-FMUSP, 2023','International OCD Foundation – Annual Report 2024'] },
  dislexia: { slug:'dislexia', img: dislexiaImg, titulo:'Dislexia', descricao:'A dislexia é um transtorno específico de aprendizagem que dificulta a leitura, escrita e soletração.', caracteristicas:['Dificuldade para ler palavras isoladas','Trocas e inversões de letras','Problemas de memória fonológica','Leitura lenta e com esforço','Dificuldade de compreensão textual'], tratamentos:['Métodos multissensoriais de ensino','Fonoaudiologia especializada','Psicopedagogia','Tecnologia assistiva','Adaptações curriculares'], e1:{n:'5-17%',l:'da população mundial'}, e2:{n:'80%',l:'das dificuldades de aprendizagem'}, e3:{n:'1 em 5',l:'pessoas tem algum grau de dislexia'}, fontes:['International Dyslexia Association, 2024','ABD – Associação Brasileira de Dislexia, 2023','Yale Center for Dyslexia & Creativity, 2024'] },
}

export default function Neurodivergencias() {
  // --- LÓGICA E ESTADO ---
  const navigate = useNavigate()
  const itens = Object.entries(detalheNeuro)

  // --- VISUAL (HTML) ---
  return (
    <div className="principal">
      <div className="topo">
        <h1 className="titulo-sec">Neurodivergências</h1>
        <p className="subtitulo">Conheça as principais neurodivergências, suas características e formas de apoio</p>
      </div>
      <div className="neuro-grade">
        {itens.map(([slug, d]) => (
          <div className="neuro-card" key={slug}>
            <div className="neuro-banner"><img src={d.img} alt={d.titulo} /></div>
            <div className="neuro-dados">
              <h3>{d.titulo}</h3>
              <p>{d.descricao.substring(0, 120)}...</p>
              <button className="btn-detalhe" onClick={() => navigate(`/neurodivergencias/${slug}`)}>
                Mais detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
