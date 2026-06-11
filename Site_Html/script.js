fetch("navegacao.html")
  .then(res => res.text())
  .then(data => {
  document.getElementById("navegacao-completa").innerHTML = data;
});

fetch("rodape-site.html")
  .then(res => res.text())
  .then(data => {
  document.getElementById("rodape-completo").innerHTML = data;
});



// ==================== DADOS GLOBAIS ====================
const profissionais = [
  {
    id: 1,
    nome: "Dra. Maria Silva",
    cargo: "Psicóloga",
    local: "São Paulo, SP",
    telefone: "(11) 3258-7568",
    email: "maria@clinicatea.com.br",
    redeSocial: "https://www.instagram.com/mariasilva.psi",
    tags: ["TEA/Autismo", "TDAH"],
    registro: "CRP 06/123456",
    experiencia: "12 anos",
    atendimento: "Presencial e Online",
    descricao:
      "Especialista em diagnóstico e intervenção em TEA, com foco em terapia ABA e desenvolvimento de habilidades sociais.",
    img: "https://placehold.co/64x64/f48fb1/white?text=MS",
  },
  {
    id: 2,
    nome: "Dr. Carlos Rocha",
    cargo: "Neurologista",
    local: "São Paulo, SP",
    telefone: "(11) 2987-4512",
    email: "carlos@neurospe.com.br",
    redeSocial: "https://www.linkedin.com/in/drcarlosrocha",
    tags: ["TEA/Autismo", "Dislexia"],
    registro: "CRM 123987-SP",
    experiencia: "18 anos",
    atendimento: "Presencial",
    descricao:
      "Neurologista pediátrico com vasta experiência em neurodivergências. Realiza avaliações neurológicas completas.",
    img: "https://placehold.co/64x64/90caf9/white?text=CR",
  },
  {
    id: 3,
    nome: "Dra. Ana Oliveira",
    cargo: "Psicopedagoga",
    local: "Guarulhos, SP",
    telefone: "(11) 3541-9870",
    email: "ana@aprendermais.com.br",
    redeSocial: "https://www.instagram.com/ana.psicopedagoga",
    tags: ["Dislexia", "TDAH"],
    registro: "CRP 06/234567",
    experiencia: "9 anos",
    atendimento: "Presencial e Online",
    descricao:
      "Especialista em dificuldades de aprendizagem, com metodologia baseada em evidências para dislexia e discalculia.",
    img: "https://placehold.co/64x64/a5d6a7/white?text=AO",
  },
  {
    id: 4,
    nome: "Dr. Paulo Lima",
    cargo: "Psiquiatra",
    local: "Santo André, SP",
    telefone: "(11) 4423-8821",
    email: "paulo@mentesaudavel.com.br",
    redeSocial: "https://www.linkedin.com/in/drpaulolima",
    tags: ["TOC", "TDAH"],
    registro: "CRM 654321-SP",
    experiencia: "15 anos",
    atendimento: "Presencial",
    descricao:
      "Psiquiatra com especialização em neurodivergência em adultos. Realiza avaliação diagnóstica e acompanhamento farmacológico.",
    img: "https://placehold.co/64x64/ffcc80/white?text=PL",
  },
  {
    id: 5,
    nome: "Dra. Fernanda Costa",
    cargo: "Fonoaudióloga",
    local: "São Paulo, SP",
    telefone: "(11) 3365-2214",
    email: "fernanda@fono.com.br",
    redeSocial: "https://www.instagram.com/fernandafono",
    tags: ["TEA/Autismo", "Dislexia"],
    registro: "CRFa 2-54321",
    experiencia: "11 anos",
    atendimento: "Presencial e Online",
    descricao:
      "Fonoaudióloga especializada em comunicação aumentativa e alternativa para pessoas com TEA.",
    img: "https://placehold.co/64x64/ce93d8/white?text=FC",
  },
  {
    id: 6,
    nome: "Dr. Ricardo Mendes",
    cargo: "Terapeuta Ocupacional",
    local: "Campinas, SP",
    telefone: "(19) 3254-7896",
    email: "ricardo@terapiaint.com.br",
    redeSocial: "https://www.linkedin.com/in/ricardomendes-to",
    tags: ["TEA/Autismo", "TDAH"],
    registro: "CREFITO 2/12345-TO",
    experiencia: "7 anos",
    atendimento: "Presencial",
    descricao:
      "Terapeuta ocupacional com foco em integração sensorial para crianças com TEA e TDAH.",
    img: "https://placehold.co/64x64/9fa8da/white?text=RM",
  },
  {
    id: 7,
    nome: "Dra. Juliana Neves",
    cargo: "Psicóloga",
    local: "São Paulo, SP",
    telefone: "(11) 3789-5423",
    email: "juliana@psicoinclusao.com.br",
    redeSocial: "https://www.instagram.com/juliananeves.psi",
    tags: ["TDAH", "TOC"],
    registro: "CRP 06/345678",
    experiencia: "6 anos",
    atendimento: "Online",
    descricao:
      "Psicóloga com abordagem cognitivo-comportamental focada em adultos e adolescentes com TDAH e TOC.",
    img: "https://placehold.co/64x64/80cbc4/white?text=JN",
  },
  {
    id: 8,
    nome: "Dr. Eduardo Alves",
    cargo: "Psicólogo",
    local: "São Bernardo do Campo, SP",
    telefone: "(11) 4565-3312",
    email: "eduardo@inclusaosp.com.br",
    redeSocial: "https://www.linkedin.com/in/eduardoalves-psi",
    tags: ["TEA/Autismo", "Dislexia"],
    registro: "CRP 06/456789",
    experiencia: "14 anos",
    atendimento: "Presencial e Online",
    descricao:
      "Psicólogo escolar e clínico especializado em inclusão educacional de crianças neurodivergentes.",
    img: "https://placehold.co/64x64/ef9a9a/white?text=EA",
  },
];

const ongs = [
  {
    id: 1,
    nome: "ABD – Associação Brasileira de Dislexia",
    estado: "SP",
    condicao: "Dislexia",
    descricao:
      "Organização sem fins lucrativos que atua na divulgação científica e apoio a pessoas com Dislexia.",
    servicos: ["Informação", "Palestras", "Grupos de Apoio", "Orientação"],
    telefone: "(11) 3258-7568",
    email: "contato@dislexia.org.br",
    site: "www.dislexia.org.br",
    img: "https://placehold.co/800x200/7e57c2/white?text=ABD",
  },
  {
    id: 2,
    nome: "AMA – Associação de Amigos do Autista",
    estado: "SP",
    condicao: "TEA/Autismo",
    descricao:
      "Uma das maiores organizações de apoio ao autismo do Brasil, oferecendo atendimento especializado multidisciplinar.",
    servicos: ["Terapias", "Escola Especial", "Grupos de Apoio", "Capacitação"],
    telefone: "(11) 5572-4388",
    email: "contato@ama.org.br",
    site: "www.ama.org.br",
    img: "https://placehold.co/800x200/2196f3/white?text=AMA",
  },
  {
    id: 3,
    nome: "ABDA – Associação Brasileira do TDAH",
    estado: "SP",
    condicao: "TDAH",
    descricao:
      "Entidade dedicada a esclarecer e divulgar informações sobre o TDAH ao público em geral.",
    servicos: [
      "Informação",
      "Palestras",
      "Grupos de Apoio",
      "Orientação Jurídica",
    ],
    telefone: "(11) 3819-7204",
    email: "contato@tdah.org.br",
    site: "www.tdah.org.br",
    img: "https://placehold.co/800x200/ff9800/white?text=ABDA",
  },
  {
    id: 4,
    nome: "Instituto Inclusão Brasil",
    estado: "RJ",
    condicao: "Múltiplas",
    descricao:
      "Promove a inclusão social de pessoas com deficiências e neurodivergências por meio de programas educacionais.",
    servicos: ["Educação", "Capacitação", "Cultura", "Esporte"],
    telefone: "(21) 3456-7890",
    email: "contato@inclusaobrasil.org.br",
    site: "www.inclusaobrasil.org.br",
    img: "https://placehold.co/800x200/4caf50/white?text=Instituto",
  },
  {
    id: 5,
    nome: "PROTOC – Programa de TOC",
    estado: "SP",
    condicao: "TOC",
    descricao:
      "Programa vinculado ao IPq-HC-FMUSP dedicado ao tratamento e pesquisa do TOC.",
    servicos: [
      "Tratamento",
      "Pesquisa",
      "Grupos Terapêuticos",
      "Orientação Familiar",
    ],
    telefone: "(11) 2661-6972",
    email: "protoc@hcnet.usp.br",
    site: "www.protoc.com.br",
    img: "https://placehold.co/800x200/e91e63/white?text=PROTOC",
  },
  {
    id: 6,
    nome: "Abraça – Associação Brasileira pelo Autismo",
    estado: "RS",
    condicao: "TEA/Autismo",
    descricao:
      "Organização gaúcha que defende os direitos das pessoas com autismo e promove inclusão escolar.",
    servicos: [
      "Advocacia",
      "Inclusão Escolar",
      "Capacitação",
      "Apoio Jurídico",
    ],
    telefone: "(51) 3232-4567",
    email: "contato@abraca.org.br",
    site: "www.abraca.org.br",
    img: "https://placehold.co/800x200/9c27b0/white?text=Abraca",
  },
];

const artigos = [
  {
    id: 1,
    categoria: "Políticas Públicas",
    data: "15 Mar 2025",
    titulo: "Lei nº 14.254/2021 – Programa Escola + Inclusiva",
    resumo:
      "Análise do impacto das novas diretrizes da Lei da Inclusão Escolar para estudantes neurodivergentes.",
    autor: "Dr. Roberto Campos – FMUSP",
    img: "https://placehold.co/800x200/2e7d32/white?text=Lei+14.254",
    conteudo: `<h2>Contexto da Lei</h2><p>A Lei nº 14.254/2021 representa um marco legislativo para a educação especial no Brasil. O programa prevê apoio especializado a estudantes com deficiência nas redes públicas de ensino.</p><h2>Avanços observados</h2><p>Desde a implementação, observou-se aumento de 34% no número de salas de recursos multifuncionais nas escolas públicas paulistas. Em São Paulo, 89% das escolas estaduais já possuem ao menos um professor especialista em educação inclusiva.</p><h2>Desafios na implementação</h2><p>Apesar dos avanços, pesquisas apontam lacunas significativas: apenas 41% das escolas públicas municipais no Rio de Janeiro possuem os recursos previstos pela lei.</p><ul><li>Falta de investimento em formação continuada</li><li>Ausência de infraestrutura em municípios menores</li><li>Rotatividade de profissionais especializados</li></ul>`,
  },
  {
    id: 2,
    categoria: "Pesquisas",
    data: "8 Abr 2025",
    titulo: "Estudo UNIFESP: Diagnóstico precoce de TEA reduz custos em 60%",
    resumo:
      "Pesquisa demonstra que intervenções antes dos 3 anos geram impacto significativo no desenvolvimento da criança.",
    autor: "Profa. Dra. Lúcia Mendonça – UNIFESP",
    img: "https://placehold.co/800x200/1565c0/white?text=Pesquisa+TEA",
    conteudo: `<h2>Sobre a pesquisa</h2><p>A pesquisa conduzida na UNIFESP acompanhou 420 crianças com TEA ao longo de 8 anos, comparando o desenvolvimento de crianças diagnosticadas antes e após os 3 anos.</p><h2>Principais resultados</h2><p>Crianças com diagnóstico precoce apresentaram redução de 60% nos custos terapêuticos ao longo da vida.</p><ul><li>78% desenvolveram linguagem funcional</li><li>Apenas 42% do grupo tardio alcançou o mesmo resultado</li><li>Redução média de R$ 180 mil em custos terapêuticos em 10 anos</li></ul>`,
  },
  {
    id: 3,
    categoria: "Internacional",
    data: "2 Abr 2025",
    titulo: "OMS atualiza diretrizes para diagnóstico de TDAH em adultos",
    resumo:
      "Novas recomendações reconhecem subdiagnóstico em mulheres adultas e estabelecem protocolos atualizados.",
    autor: "Tradução: Equipe Inclure",
    img: "https://placehold.co/800x200/6a1b9a/white?text=OMS+TDAH",
    conteudo: `<h2>Novas diretrizes</h2><p>A OMS publicou em março de 2025 uma atualização em suas diretrizes para diagnóstico de TDAH em adultos, reconhecendo formalmente o subdiagnóstico histórico em mulheres.</p><h2>Subdiagnóstico feminino</h2><ul><li>Mulheres têm 3x mais probabilidade de diagnóstico tardio</li><li>Ansiedade e depressão frequentemente mascaram o TDAH</li><li>Média de diagnóstico feminino é 10 anos mais tarde que o masculino</li></ul>`,
  },
  {
    id: 4,
    categoria: "Neurodivergência",
    data: "28 Mar 2025",
    titulo:
      "Tecnologia assistiva: Apps que mudam a vida de pessoas com dislexia",
    resumo:
      "Levantamento das melhores ferramentas digitais gratuitas para auxiliar leitores com dislexia.",
    autor: "Isabely Sampaio – Equipe Inclure",
    img: "https://placehold.co/800x200/bf360c/white?text=Tecnologia+Assistiva",
    conteudo: `<h2>O papel da tecnologia</h2><p>A dislexia afeta entre 5% e 17% da população mundial. Nos últimos anos, a tecnologia democratizou o acesso à informação para milhões de pessoas com dislexia.</p><h2>Aplicativos avaliados</h2><ul><li><strong>Leia para mim:</strong> Leitura em voz alta com fontes adaptadas</li><li><strong>OpenDyslexic:</strong> Fonte especialmente desenhada para facilitar a leitura</li><li><strong>Microsoft Immersive Reader:</strong> Integrado ao pacote Microsoft, gratuito e acessível</li></ul>`,
  },
  {
    id: 5,
    categoria: "Pesquisas",
    data: "20 Mar 2025",
    titulo:
      "Pesquisa USP mapeia lacunas no acesso a diagnóstico de TEA no interior",
    resumo:
      "Estudo revelou que 78% dos municípios com menos de 50 mil habitantes não têm profissionais habilitados.",
    autor: "Prof. Dr. André Nascimento – USP",
    img: "https://placehold.co/800x200/e65100/white?text=USP+TEA",
    conteudo: `<h2>A pesquisa</h2><p>O estudo mapeou a disponibilidade de serviços de diagnóstico e acompanhamento de TEA em municípios brasileiros com menos de 50 mil habitantes.</p><h2>Resultados</h2><ul><li>Tempo médio de espera: 2,8 anos no interior vs. 8 meses nas capitais</li><li>Apenas 12% dos CAPS possuem equipe especializada em TEA</li><li>Famílias percorrem em média 180 km para serviços especializados</li></ul>`,
  },
  {
    id: 6,
    categoria: "Políticas Públicas",
    data: "10 Mar 2025",
    titulo:
      "MEC lança edital para formação de 50 mil professores em educação inclusiva",
    resumo:
      "Novo programa de capacitação docente com foco em neurodivergências para escolas de regiões vulneráveis.",
    autor: "Redação Inclure",
    img: "https://placehold.co/800x200/1a237e/white?text=MEC+Inclusao",
    conteudo: `<h2>O programa</h2><p>O MEC lançou o Programa Nacional de Formação Docente em Educação Inclusiva, com meta de capacitar 50 mil professores até dezembro de 2025.</p><h2>Estrutura</h2><ul><li>120 horas (60 presenciais + 60 a distância)</li><li>Módulos em TEA, TDAH, Dislexia, Discalculia</li><li>Práticas supervisionadas (20h)</li></ul>`,
  },
  {
    id: 7,
    categoria: "Neurodivergência",
    data: "5 Abr 2025",
    titulo: "Como a escola pode incluir alunos com TDAH",
    resumo:
      "Estratégias práticas para professores criarem ambientes de aprendizagem mais inclusivos.",
    autor: "Equipe Inclure",
    img: "https://placehold.co/800x200/ffa000/white?text=TDAH+Escola",
    conteudo: `<h2>O TDAH no ambiente escolar</h2><p>O TDAH afeta entre 5% e 8% das crianças em idade escolar. Sem suporte adequado, estudantes enfrentam dificuldades acadêmicas e emocionais significativas.</p><h2>Estratégias eficazes</h2><ul><li>Dividir tarefas longas em etapas menores</li><li>Utilizar instruções visuais além das verbais</li><li>Oferecer pausas regulares para movimento</li><li>Usar temporizadores visuais para gestão do tempo</li></ul>`,
  },
  {
    id: 8,
    categoria: "Pesquisas",
    data: "1 Abr 2025",
    titulo: "Terapia ocupacional e autismo: revisão de 2024",
    resumo:
      "Revisão sistemática analisa os benefícios da integração sensorial no desenvolvimento de crianças autistas.",
    autor: "Dra. Beatriz Souza",
    img: "https://placehold.co/800x200/00acc1/white?text=TO+Autismo",
    conteudo: `<h2>Revisão sistemática</h2><p>A revisão analisou 47 estudos clínicos sobre terapia de integração sensorial (TIS) em crianças com TEA, totalizando dados de 2.340 participantes.</p><h2>Benefícios documentados</h2><ul><li>Redução de hipersensibilidade sensorial em 68% dos casos</li><li>Melhora em atividades de vida diária</li><li>Maior participação em atividades escolares e sociais</li></ul>`,
  },
  {
    id: 9,
    categoria: "Internacional",
    data: "28 Mar 2025",
    titulo: "Reino Unido aprova lei de neurodiversidade no trabalho",
    resumo:
      "Empresas com mais de 250 funcionários são obrigadas a oferecer ajustes razoáveis para neurodivergentes.",
    autor: "Redação Inclure",
    img: "https://placehold.co/800x200/7b1fa2/white?text=Reino+Unido",
    conteudo: `<h2>A legislação</h2><p>O Parlamento britânico aprovou o Neurodiversity at Work Act, afetando empresas com mais de 250 funcionários a partir de outubro de 2025.</p><h2>O que prevê</h2><ul><li>Ajustes razoáveis mediante solicitação documentada</li><li>Proibição de discriminação baseada em condições neurodivergentes</li><li>Flexibilidade de horário e formato de trabalho</li><li>Tecnologia assistiva fornecida pelo empregador</li></ul>`,
  },
];

const detalheNeuro = {
  autismo: {
    img: "https://placehold.co/800x200/90caf9/white?text=Autismo+TEA",
    titulo: "Transtorno do Espectro Autista (TEA)",
    descricao:
      "O TEA é um transtorno neuropsiquiátrico do desenvolvimento que afeta a comunicação, as habilidades sociais e comportamentais.",
    caracteristicas: [
      "Dificuldade na comunicação verbal e não verbal",
      "Desafio em interações sociemocionais",
      "Padrões repetitivos e restritivos de comportamento",
      "Hiper ou hipossensibilidade a estímulos sensoriais",
      "Resistência a mudanças de rotina",
    ],
    tratamentos: [
      "Terapia ABA",
      "Terapia Fonoaudiológica",
      "Psicoterapia",
      "Intervenções educacionais",
      "Medicação em casos específicos",
    ],
    e1: { n: "1 em 36", l: "crianças diagnosticadas nos EUA (CDC, 2023)" },
    e2: { n: "3x", l: "mais comum em meninos" },
    e3: { n: "~1%", l: "da população mundial" },
  },
  toc: {
    img: "https://placehold.co/800x200/ffcc80/white?text=TOC",
    titulo: "Transtorno Obsessivo-Compulsivo (TOC)",
    descricao:
      "O TOC é caracterizado por obsessões e compulsões que causam sofrimento significativo e interferem no funcionamento diário.",
    caracteristicas: [
      "Obsessões recorrentes e indesejadas",
      "Compulsões para aliviar ansiedade",
      "Medo excessivo de contaminação ou dano",
      "Necessidade de simetria e ordem",
      "Pensamentos perturbadores",
    ],
    tratamentos: [
      "Terapia Cognitivo-Comportamental (TCC)",
      "Exposição e Prevenção de Resposta (EPR)",
      "Antidepressivos (ISRS)",
      "Mindfulness",
      "Grupos de apoio",
    ],
    e1: { n: "2-3%", l: "da população mundial" },
    e2: { n: "10-15", l: "anos até o diagnóstico correto" },
    e3: { n: "65%", l: "melhoram com tratamento adequado" },
  },
  dislexia: {
    img: "https://placehold.co/800x200/f48fb1/white?text=Dislexia",
    titulo: "Dislexia",
    descricao:
      "A dislexia é um transtorno específico de aprendizagem que dificulta a leitura, escrita e soletração.",
    caracteristicas: [
      "Dificuldade para ler palavras isoladas",
      "Trocas e inversões de letras",
      "Problemas de memória fonológica",
      "Leitura lenta e com esforço",
      "Dificuldade de compreensão textual",
    ],
    tratamentos: [
      "Métodos multissensoriais de ensino",
      "Fonoaudiologia especializada",
      "Psicopedagogia",
      "Tecnologia assistiva",
      "Adaptações curriculares",
    ],
    e1: { n: "5-17%", l: "da população mundial" },
    e2: { n: "80%", l: "das dificuldades de aprendizagem" },
    e3: { n: "1 em 5", l: "pessoas tem algum grau de dislexia" },
  },
  tdah: {
    img: "https://placehold.co/800x200/a5d6a7/white?text=TDAH",
    titulo: "Transtorno do Déficit de Atenção com Hiperatividade (TDAH)",
    descricao:
      "O TDAH é caracterizado por desatenção persistente, hiperatividade e impulsividade que comprometem múltiplas áreas da vida.",
    caracteristicas: [
      "Dificuldade de manter atenção sustentada",
      "Impulsividade",
      "Hiperatividade motora ou verbal",
      "Desorganização e esquecimento",
      "Dificuldade em iniciar e concluir tarefas",
    ],
    tratamentos: [
      "Medicação (metilfenidato)",
      "Psicoterapia comportamental",
      "Treino de habilidades organizacionais",
      "Intervenções escolares",
      "Orientação familiar",
    ],
    e1: { n: "5-8%", l: "das crianças em idade escolar" },
    e2: { n: "60%", l: "persistem na fase adulta" },
    e3: { n: "3x", l: "mais diagnosticado em meninos" },
  },
  asperger: {
    img: "https://placehold.co/800x200/ce93d8/white?text=Asperger",
    titulo: "Síndrome de Asperger",
    descricao:
      "Forma de TEA sem atraso significativo na linguagem, com dificuldades nas interações sociais e interesses restritos.",
    caracteristicas: [
      "Dificuldade em interpretar sinais sociais",
      "Hiperfoco em interesses específicos",
      "Rotinas rígidas",
      "Linguagem formal e literal",
      "Sensibilidade sensorial variada",
    ],
    tratamentos: [
      "Terapia de habilidades sociais",
      "TCC",
      "Suporte educacional",
      "Grupos de socialização",
      "Orientação familiar",
    ],
    e1: { n: "1 em 250", l: "pessoas" },
    e2: { n: "4x", l: "mais diagnosticado em homens" },
    e3: { n: ">70%", l: "têm altas habilidades em alguma área" },
  },
  discalculia: {
    img: "https://placehold.co/800x200/9fa8da/white?text=Discalculia",
    titulo: "Discalculia",
    descricao:
      "Transtorno de aprendizagem que afeta a capacidade de compreender e manipular números e conceitos matemáticos.",
    caracteristicas: [
      "Dificuldade com operações básicas",
      "Confusão com símbolos matemáticos",
      "Dificuldade com sequências numéricas",
      "Problemas com noção de tempo",
      "Dificuldade em memorizar fatos matemáticos",
    ],
    tratamentos: [
      "Ensino multissensorial da matemática",
      "Materiais concretos e manipuláveis",
      "Softwares adaptativos",
      "Psicopedagogia especializada",
      "Adaptações de avaliação",
    ],
    e1: { n: "3-7%", l: "da população escolar" },
    e2: { n: "Similar", l: "prevalência entre gêneros" },
    e3: { n: "50%", l: "de coexistência com dislexia" },
  },
};

// Variáveis de estado (usadas nas páginas que possuem filtros)
let profFiltrados = [...profissionais];
let ongsFiltradas = [...ongs];
let blogFiltrado = [...artigos];
let profViu = false,
  ongsViu = false,
  blogViu = false;
const LIMITE = 4;

// ==================== FUNÇÕES GLOBAIS ====================
function alternarTema() {
  document.body.classList.toggle("modo-escuro");
  const d = document.body.classList.contains("modo-escuro");
  document
    .querySelectorAll(".thumb")
    .forEach((t) => (t.textContent = d ? "🌙" : "☀️"));
  localStorage.setItem("inclure_tema", d ? "escuro" : "claro");
}

function carregarTema() {
  const d = localStorage.getItem("inclure_tema") === "escuro";
  if (d) document.body.classList.add("modo-escuro");
  document
    .querySelectorAll(".thumb")
    .forEach((t) => (t.textContent = d ? "🌙" : "☀️"));
}

function alternarMenuMob() {
  const menu = document.getElementById("menuMob");
  const btn = document.getElementById("btnMenu");
  if (menu) menu.classList.toggle("aberto");
  if (btn) btn.classList.toggle("aberto");
}

function fecharMenuMob() {
  const menu = document.getElementById("menuMob");
  const btn = document.getElementById("btnMenu");
  if (menu) menu.classList.remove("aberto");
  if (btn) btn.classList.remove("aberto");
}

// Fechar menu mobile ao clicar fora
document.addEventListener("click", (e) => {
  const mob = document.getElementById("menuMob");
  const btn = document.getElementById("btnMenu");
  if (
    mob?.classList.contains("aberto") &&
    !mob.contains(e.target) &&
    !btn?.contains(e.target)
  )
    fecharMenuMob();
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 769) fecharMenuMob();
});

function selecionarGenero(btn) {
  btn
    .closest(".genero")
    ?.querySelectorAll(".btn-genero")
    .forEach((b) => b.classList.remove("ativo"));
  btn.classList.add("ativo");
}

function alternarFaq(item) {
  const r = item.querySelector(".faq-resp");
  const a = item.querySelector(".faq-alt");
  const aberta = r.classList.toggle("aberta");
  a.classList.toggle("aberto", aberta);
  a.classList.toggle("mais", !aberta);
  a.classList.toggle("menos", aberta);
}

// ==================== PÁGINA: PROFISSIONAIS ====================
function renderProf() {
  const g = document.getElementById("gradeProf");
  if (!g) return;
  g.innerHTML = profFiltrados
    .map(
      (p, i) =>
        `<div class="prof-card${i >= LIMITE && !profViu ? " oculto" : ""}" data-id="${p.id}"><div class="prof-dados"><div class="prof-topo"><div class="prof-avatar"><img src="${p.img}" alt="${p.nome}"></div><div><div class="prof-nome">${p.nome}</div><div class="prof-cargo">${p.cargo}</div></div></div><div class="prof-info"><div class="info-item"><img src="https://placehold.co/16x16/777/white?text=L" alt="Local"> ${p.local}</div><div class="info-item"><img src="https://placehold.co/16x16/777/white?text=T" alt="Tel"> ${p.telefone}</div><div class="info-item"><img src="https://placehold.co/16x16/777/white?text=E" alt="Email"> ${p.email}</div></div><div class="tags">${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div></div><button class="btn-laranja" onclick="abrirPerfil(${p.id})">Ver perfil</button></div>`,
    )
    .join("");
  const btn = document.getElementById("btnVerMaisProf");
  if (btn)
    btn.style.display =
      !profViu && profFiltrados.length > LIMITE ? "block" : "none";
}

function filtrarProf() {
  const b = document.getElementById("buscaProf")?.value.toLowerCase() || "";
  const e = document.getElementById("filtroEmprego")?.value.toLowerCase() || "";
  const s = document.getElementById("filtroEspec")?.value.toLowerCase() || "";
  profFiltrados = profissionais.filter(
    (p) =>
      (p.nome.toLowerCase().includes(b) || p.cargo.toLowerCase().includes(b)) &&
      (!e || p.cargo.toLowerCase().includes(e)) &&
      (!s || p.tags.some((t) => t.toLowerCase().includes(s))),
  );
  profViu = false;
  renderProf();
}

function limparFiltroProf() {
  ["buscaProf", "filtroEmprego", "filtroEspec"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  profFiltrados = [...profissionais];
  profViu = false;
  renderProf();
}

function verMaisProf() {
  profViu = true;
  document
    .querySelectorAll("#gradeProf .oculto")
    .forEach((el) => el.classList.remove("oculto"));
  const btn = document.getElementById("btnVerMaisProf");
  if (btn) btn.style.display = "none";
}

function abrirPerfil(id) {
  const p = profissionais.find((x) => x.id === id);
  const m = document.getElementById("contModal");
  if (!p || !m) return;
  m.innerHTML = `<div class="modal-topo"><button class="modal-fechar" onclick="document.getElementById('modalPerfil').classList.remove('aberto')">&#x2715;</button><div class="modal-avatar"><img src="${p.img}" alt="${p.nome}"></div><div class="modal-texto"><h2>${p.nome}</h2><p>${p.cargo} &middot; ${p.local}</p></div></div><div class="modal-janela"><div class="modal-secao"><h3>Sobre o Profissional</h3><p class="modal-desc">${p.descricao}</p></div><div class="modal-secao"><h3>Informações Profissionais</h3><div class="modal-grade"><div class="modal-dado"><span class="rotulo">Registro</span><span class="valor">${p.registro}</span></div><div class="modal-dado"><span class="rotulo">Experiência</span><span class="valor">${p.experiencia}</span></div><div class="modal-dado"><span class="rotulo">Atendimento</span><span class="valor">${p.atendimento}</span></div><div class="modal-dado"><span class="rotulo">Localização</span><span class="valor">${p.local}</span></div></div></div><div class="modal-secao"><h3>Especialidades</h3><div class="modal-tags">${p.tags.map((t) => `<span class="modal-tag">${t}</span>`).join("")}</div></div><div class="modal-secao"><h3>Contato</h3><div class="modal-contatos"><button class="modal-btn modal-btn-verde">${p.telefone}</button><button class="modal-btn modal-btn-azul">${p.email}</button>${p.redeSocial ? `<a href="${p.redeSocial}" target="_blank" rel="noopener noreferrer" class="modal-btn modal-btn-rede">Rede Social</a>` : ""}</div></div></div>`;
  document.getElementById("modalPerfil").classList.add("aberto");
}

function fecharModal(e) {
  if (e.target.id === "modalPerfil")
    document.getElementById("modalPerfil").classList.remove("aberto");
}

// ==================== PÁGINA: ONGs ====================
function renderOngs() {
  const l = document.getElementById("listaOngs");
  if (!l) return;
  l.innerHTML = ongsFiltradas
    .map(
      (o, i) =>
        `<div class="ong-card${i >= LIMITE && !ongsViu ? " oculto" : ""}"><div class="ong-banner"><img src="${o.img}" alt="${o.nome}"></div><div class="ong-dados"><div class="ong-nome">${o.nome}</div><div class="ong-meta"><span class="tag">${o.condicao}</span><span class="ong-estado">${o.estado}</span></div><div class="ong-desc">${o.descricao}</div><div class="ong-servicos"><strong>Serviços:</strong><div class="ong-tags">${o.servicos.map((s) => `<span class="ong-tag">${s}</span>`).join("")}</div></div><div class="ong-barra"><span><img src="https://placehold.co/14x14/666/white?text=T" alt="Tel"> ${o.telefone}</span><span><img src="https://placehold.co/14x14/666/white?text=E" alt="Email"> ${o.email}</span><span><img src="https://placehold.co/14x14/666/white?text=W" alt="Site"> ${o.site}</span></div></div></div>`,
    )
    .join("");
  const btn = document.getElementById("btnVerMaisOngs");
  if (btn)
    btn.style.display =
      !ongsViu && ongsFiltradas.length > LIMITE ? "block" : "none";
}

function filtrarOngs() {
  const b = document.getElementById("buscaOng")?.value.toLowerCase() || "";
  const e = document.getElementById("filtroEstOng")?.value || "";
  const c = document.getElementById("filtroCondOng")?.value || "";
  ongsFiltradas = ongs.filter(
    (o) =>
      o.nome.toLowerCase().includes(b) &&
      (!e || o.estado === e) &&
      (!c || o.condicao.includes(c)),
  );
  ongsViu = false;
  renderOngs();
}

function limparFiltroOngs() {
  ["buscaOng", "filtroEstOng", "filtroCondOng"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  ongsFiltradas = [...ongs];
  ongsViu = false;
  renderOngs();
}

function verMaisOngs() {
  ongsViu = true;
  document
    .querySelectorAll("#listaOngs .oculto")
    .forEach((el) => el.classList.remove("oculto"));
  const btn = document.getElementById("btnVerMaisOngs");
  if (btn) btn.style.display = "none";
}

// ==================== PÁGINA: BLOG ====================
function renderBlog() {
  const g = document.getElementById("gradeBlog");
  if (!g) return;
  g.innerHTML = blogFiltrado
    .map(
      (b, i) =>
        `<div class="blog-card${i >= LIMITE && !blogViu ? " oculto" : ""}"><div class="blog-banner"><img src="${b.img}" alt="${b.titulo}"></div><div class="blog-dados"><div class="blog-meta"><span class="blog-categ">${b.categoria}</span><span class="blog-data">${b.data}</span></div><h3>${b.titulo}</h3><p>${b.resumo}</p><div class="blog-rod"><span class="blog-autor">${b.autor}</span><button class="btn-ler" onclick="window.location.href='blog-detalhe.html?id=${b.id}'">Ler mais</button></div></div></div>`,
    )
    .join("");
  const btn = document.getElementById("btnVerMaisBlog");
  if (btn)
    btn.style.display =
      !blogViu && blogFiltrado.length > LIMITE ? "block" : "none";
}

function filtrarBlog() {
  const b = document.getElementById("buscaBlog")?.value.toLowerCase() || "";
  const c = document.getElementById("filtroCategBlog")?.value || "";
  blogFiltrado = artigos.filter(
    (a) =>
      (a.titulo.toLowerCase().includes(b) ||
        a.resumo.toLowerCase().includes(b)) &&
      (!c || a.categoria === c),
  );
  blogViu = false;
  renderBlog();
}

function limparFiltroBlog() {
  ["buscaBlog", "filtroCategBlog"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
  blogFiltrado = [...artigos];
  blogViu = false;
  renderBlog();
}

function verMaisBlog() {
  blogViu = true;
  document
    .querySelectorAll("#gradeBlog .oculto")
    .forEach((el) => el.classList.remove("oculto"));
  const btn = document.getElementById("btnVerMaisBlog");
  if (btn) btn.style.display = "none";
}

// ==================== PÁGINA: NEURODIVERGÊNCIAS (lista) ====================
function renderNeuroGrade() {
  const g = document.getElementById("neuroGrade");
  if (!g) return;
  g.innerHTML = Object.keys(detalheNeuro)
    .map((chave) => {
      const d = detalheNeuro[chave];
      return `<div class="neuro-card"><div class="neuro-banner"><img src="${d.img}" alt="${d.titulo}"></div><div class="neuro-dados"><h3>${d.titulo}</h3><p>${d.descricao.substring(0, 120)}...</p><button class="btn-detalhe" onclick="window.location.href='neuro-detalhe.html?id=${chave}'">Mais detalhes</button></div></div>`;
    })
    .join("");
}

// ==================== PÁGINA: DETALHE NEURO ====================
function renderDetalheNeuro(chave) {
  const d = detalheNeuro[chave];
  const bc = document.getElementById("breadcrumbNeuro");
  const c = document.getElementById("contNeuroDetalhe");
  if (!d || !c) return;
  if (bc) bc.textContent = d.titulo;
  c.innerHTML = `<div class="neuro-topo"><div class="neuro-banner-det"><img src="${d.img}" alt="${d.titulo}"></div><div class="neuro-tit"><h1>${d.titulo}</h1><p>${d.descricao}</p></div></div><div class="neuro-det"><div><div class="neuro-secao"><h2>Principais Características</h2><ul>${d.caracteristicas.map((c) => `<li>${c}</li>`).join("")}</ul></div><div class="neuro-secao"><h2>Tratamento e Intervenções</h2><ul>${d.tratamentos.map((t) => `<li>${t}</li>`).join("")}</ul></div></div><div><div class="estat-card"><div class="estat-num">${d.e1.n}</div><div class="estat-rot">${d.e1.l}</div></div><div class="estat-card"><div class="estat-num">${d.e2.n}</div><div class="estat-rot">${d.e2.l}</div></div><div class="estat-card"><div class="estat-num">${d.e3.n}</div><div class="estat-rot">${d.e3.l}</div></div></div></div><div style="text-align:center;margin-bottom:32px"><button class="btn btn-verde" onclick="window.location.href='neurodivergencias.html'">Ver todas as neurodivergências</button></div>`;
}

// ==================== PÁGINA: DETALHE ARTIGO ====================
function renderDetalheArtigo(id) {
  const a = artigos.find((x) => x.id === id);
  const c = document.getElementById("contArtigo");
  if (!a || !c) {
    if (c)
      c.innerHTML =
        '<p style="text-align:center;padding:40px;color:#888">Artigo não encontrado.</p>';
    return;
  }
  c.innerHTML = `<div class="artigo-trilha"><span onclick="window.location.href='blog.html'">Blog</span> › ${a.categoria}</div><div class="artigo-banner"><img src="${a.img}" alt="${a.titulo}"></div><div class="artigo-topo"><div class="artigo-meta"><span class="artigo-badge">${a.categoria}</span><span class="artigo-data">${a.data}</span><span class="artigo-leit">5 min de leitura</span></div><h1 class="artigo-tit">${a.titulo}</h1><p class="artigo-resumo">${a.resumo}</p><div class="artigo-autor"><div class="autor-avatar"><img src="https://placehold.co/40x40/a5d6a7/white?text=A" alt="${a.autor}"></div><div><div class="autor-nome">${a.autor}</div><div class="autor-cargo">Especialista Inclure</div></div></div></div><div class="artigo-corpo">${a.conteudo}<div class="artigo-tags"><span class="artigo-tag">${a.categoria}</span><span class="artigo-tag">Neurodivergência</span><span class="artigo-tag">Inclure</span></div></div><div style="text-align:center;margin-top:24px"><button class="btn btn-verde" onclick="window.location.href='blog.html'">Voltar ao Blog</button></div>`;
}

// ==================== PÁGINA: ESQUECI SENHA ====================
function enviarRecuperacao() {
  const i = document.getElementById("emailRecuperacao");
  const m = document.getElementById("msgErroEmail");
  const email = i?.value.trim() || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (m) m.style.display = "block";
    if (i) i.style.borderColor = "#e53935";
    return;
  }
  if (m) m.style.display = "none";
  if (i) i.style.borderColor = "";
  document.getElementById("emailConfirmado").textContent = email;
  document.getElementById("etapa-email").style.display = "none";
  document.getElementById("etapa-confirmacao").style.display = "block";
}

function reenviarEmail() {
  const btn = event.target;
  btn.textContent = "Reenviado!";
  btn.style.color = "#2e7d32";
  btn.style.pointerEvents = "none";
  setTimeout(() => {
    btn.textContent = "Reenviar e-mail";
    btn.style.color = "";
    btn.style.pointerEvents = "";
  }, 4000);
}

// ==================== PÁGINA: PERFIL ====================
function editarFotoPerfil() {
  document.getElementById("inputFotoPerfil").click();
}

function previewFoto(input) {
  if (input.files && input.files[0]) {
    const r = new FileReader();
    r.onload = (e) => {
      document.getElementById("avatarPerfilImg").src = e.target.result;
    };
    r.readAsDataURL(input.files[0]);
  }
}

function salvarPerfil() {
  const nome = document.getElementById("perfilNome")?.value || "";
  document.getElementById("nomePerfilTopo").textContent = nome;
  alert("Perfil salvo com sucesso!");
}

function confirmarSenha() {
  const atual = document.getElementById("senhaAtual")?.value || "";
  const nova = document.getElementById("senhaNova")?.value || "";
  const conf = document.getElementById("senhaConfirmar")?.value || "";
  const msg = document.getElementById("msgErroSenha");
  if (!atual) {
    msg.textContent = "Digite a senha atual.";
    msg.style.display = "block";
    return;
  }
  if (nova.length < 8) {
    msg.textContent = "A nova senha deve ter pelo menos 8 caracteres.";
    msg.style.display = "block";
    return;
  }
  if (nova !== conf) {
    msg.textContent = "As senhas não coincidem.";
    msg.style.display = "block";
    return;
  }
  msg.style.display = "none";
  alert("Senha alterada com sucesso!");
  window.location.href = "perfil.html";
}

// ==================== INICIALIZAÇÃO POR PÁGINA ====================
document.addEventListener("DOMContentLoaded", () => {
  carregarTema();

  // Fechar modal ao clicar fora
  const modal = document.getElementById("modalPerfil");
  if (modal) modal.addEventListener("click", fecharModal);

  // Detectar qual página está carregada e executar funções específicas
  const path = window.location.pathname;
  const page = path.split("/").pop();

  if (page === "profissionais.html") {
    renderProf();
  } else if (page === "ongs.html") {
    renderOngs();
  } else if (page === "blog.html") {
    renderBlog();
  } else if (page === "neurodivergencias.html") {
    renderNeuroGrade();
  } else if (page === "neuro-detalhe.html") {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id && detalheNeuro[id]) renderDetalheNeuro(id);
    else
      document.getElementById("contNeuroDetalhe").innerHTML =
        "<p>Neurodivergência não encontrada.</p>";
  } else if (page === "blog-detalhe.html") {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    if (id) renderDetalheArtigo(id);
    else
      document.getElementById("contArtigo").innerHTML =
        "<p>Artigo não encontrado.</p>";
  }
});
