# Documentação Completa: Projeto Inclure

Este documento fornece uma visão geral técnica e estratégica do desenvolvimento do sistema web **Inclure**, projetado para auxiliar pessoas neurodivergentes. Ele cobre o funcionamento atual do Front-end em React, a futura arquitetura com Spring Boot e MySQL, opções de hospedagem para o TCC e as melhores práticas de documentação.

---

## 1. Como o Front-end Funciona Atualmente (React + Vite)

O front-end do Inclure foi desenvolvido usando **React** com **Vite**. React é uma biblioteca JavaScript para criar interfaces de usuário dinâmicas. Ele funciona com base no conceito de **Componentes** (blocos visuais reaproveitáveis) e **Estado** (memória que guarda dados da tela, como se um botão foi clicado ou o que foi digitado em um formulário).

### Estrutura de Pastas e Arquivos

O projeto está organizado da seguinte forma dentro da pasta `src`:

*   **`components/`**: Contém pedaços da interface que se repetem.
    *   `Navbar/`: A barra de navegação superior (menus e responsividade).
    *   `Footer/`: O rodapé padrão do site.
*   **`contexts/`**: Contém o gerenciamento de estado global da aplicação (Context API).
    *   `AuthContext.jsx`: Guarda as informações do usuário logado. Ele sabe se é um usuário comum, um profissional ou o administrador, e compartilha essa informação com o site todo.
    *   `ThemeContext.jsx`: Controla o modo claro e escuro.
*   **`pages/`**: Contém as telas completas que o usuário acessa. Cada página (ex: `Home`, `Profissionais`, `Cadastro`) tem seu próprio arquivo `.jsx`.
*   **`services/`**:
    *   `api.js`: Atualmente, este arquivo simula a comunicação com o back-end usando chamadas "falsas" (Mocks) que retornam os dados do `mockData.js`.
*   **`data/`**:
    *   `mockData.js`: Um "banco de dados falso" feito em JavaScript com dados iniciais (profissionais, ONGs, artigos) para permitir que a interface funcione sem o back-end pronto.
*   **`styles/`**:
    *   `global.css`: Todas as regras visuais, cores, alinhamentos e responsividade do site.

### Manipulação e Armazenamento de Dados Atual

Como a API ainda não está conectada, os dados são manipulados da seguinte forma:
1.  O sistema lê os dados do arquivo `mockData.js`.
2.  Quando você cria uma nova ONG, um artigo ou edita o perfil, o React usa o `localStorage` do navegador para salvar essas mudanças.
3.  O `localStorage` é um banco de dados temporário dentro do seu próprio navegador. Ao limpar os dados do navegador, essas informações somem. Isso é perfeito para a fase atual (testes de UI/UX), mas insuficiente para o projeto real.

---

## 2. A Evolução para o Back-end (API com Spring Boot)

Para que o site e o aplicativo mobile (Flutter) funcionem juntos de forma centralizada e permanente, eles precisarão de uma API desenvolvida em **Java + Spring Boot**.

### Qual a função da API?
A API atua como um "garçom". O React (Front-end) faz um pedido à API: *"Me dê a lista de profissionais validados"*. A API vai até a cozinha (Banco de Dados MySQL), pega os dados, transforma tudo em um formato universal chamado **JSON** e devolve para o React mostrar na tela.

### Estrutura do Spring Boot
Um projeto típico de Spring Boot é dividido em camadas:
1.  **Controllers:** Recebem a requisição HTTP (ex: `GET /api/profissionais`). É o ponto de entrada da API.
2.  **Services:** Contém as "regras de negócio". Por exemplo, validar se a senha é forte ou verificar se um profissional tem CRM válido antes de salvar.
3.  **Repositories:** Usam o Spring Data JPA para se comunicar com o MySQL (salvar, deletar, buscar).
4.  **Entities (Models):** São as classes Java que representam as tabelas do MySQL (ex: `class Profissional { String nome; String cargo; }`).

### Como ocorre a comunicação com o React?
O arquivo atual `src/services/api.js` será modificado. Em vez de usar `mockData` e `setTimeout`, ele usará uma biblioteca chamada `axios` (ou o `fetch` nativo) para fazer requisições reais:
```javascript
// Exemplo de como ficará no React:
import axios from 'axios';
export const getProfissionais = () => axios.get('http://sua-api.com/api/profissionais');
```

---

## 3. Banco de Dados (MySQL)

O MySQL será responsável por salvar definitivamente todas as informações (persistência). O Spring Boot se conectará ao MySQL usando o conceito de ORM (Object-Relational Mapping - Hibernate), o que significa que as classes Java vão gerar e manipular as tabelas do MySQL automaticamente.

### Modelagem Básica (Sugestão)
*   **Tabela `usuarios`**: id, nome, email, senha, tipo (paciente, responsavel, profissional, admin), foto.
*   **Tabela `profissionais`**: id, usuario_id (Chave Estrangeira), registro, cargo, local, verificado (boolean).
*   **Tabela `ongs`**: id, nome, estado, condicao, descricao.
*   **Tabela `artigos`**: id, titulo, resumo, conteudo, autor, data.

### Armazenamento de Imagens
Atualmente, as fotos fazem upload via arquivo local (Blob Base64). No MySQL, você tem duas opções para o TCC:
1.  **Salvar como String (URL):** O jeito mais profissional. As imagens são hospedadas num serviço de arquivos (como AWS S3 ou Cloudinary), e o banco salva apenas o link da imagem: `https://.../foto1.png`.
2.  **Salvar no próprio servidor (Diretório):** A API recebe o arquivo, salva na pasta local do servidor da API, e o banco guarda o nome do arquivo.
3.  **Salvar no Banco (BLOB):** (Menos recomendado) Salva o arquivo de imagem diretamente como texto longo dentro do MySQL. É fácil de implementar, mas deixa o banco de dados pesado e lento.

---

## 4. Análise de Hospedagem (Onde publicar o TCC)

Para que a banca avaliadora acesse seu TCC por um link na internet, é preciso hospedar o código em servidores. Nem todo servidor roda Java/Spring Boot.

### Hospedagens Tradicionais Analisadas:
1.  **GitHub Pages:**
    *   **Compatibilidade:** Apenas para o Front-end (React).
    *   **Limitações:** Não roda Spring Boot nem MySQL. Não tem servidor para rodar regras de back-end. Você precisaria hospedar a API e o Banco em outro lugar.
2.  **InfinityFree (Gratuito):**
    *   **Compatibilidade:** Focado em PHP e MySQL.
    *   **Limitações:** Não oferece suporte para aplicações Java/Spring Boot em seus planos gratuitos padrão. Seria uma dor de cabeça configurar o ambiente lá.
3.  **HostGator:**
    *   **Compatibilidade:** O plano de "Hospedagem Compartilhada" (o mais barato) é focado em sites PHP, WordPress e Node.js básico.
    *   **Limitações para Java:** Para rodar aplicações em Java/Spring Boot e um Banco MySQL robusto com liberdade de instalação, seria necessário assinar um **Servidor VPS** na HostGator, o que tem um custo mensal considerável.

### 🏆 Cenário Recomendado para o TCC (Moderno e Gratuito)
Como é um projeto acadêmico que possui Front, API em Java e um App Flutter, divida a hospedagem (Arquitetura em Nuvem):

*   **Front-end (React):** Hospede na **Vercel** ou no **Netlify**. É 100% gratuito, basta conectar seu GitHub e eles compilam e colocam o site no ar (com HTTPS).
*   **Back-end (Spring Boot):** Hospede no **Render.com** ou **Railway.app**. Eles possuem planos gratuitos/trial que permitem rodar containers Docker ou aplicações Spring Boot diretamente do repositório.
*   **Banco de Dados (MySQL):** O **Railway.app** ou **Aiven.io** fornecem bancos MySQL remotos gratuitos na nuvem. A API se conecta a eles via URL de conexão.

---

## 5. Orientações para Documentar o Projeto Corretamente

Para que sua documentação seja profissional e ganhe destaque na avaliação do TCC, utilize a seguinte estrutura de documentação no seu projeto final:

### A. Documentação do Front-end (React)
1.  **README.md (Repositório Principal):**
    *   Escreva uma introdução, tecnologias usadas (React 19, Vite, Context API).
    *   Adicione as instruções de execução (`npm install` -> `npm run dev`).
2.  **Comentários de Código (JSDoc):**
    *   Documente o objetivo principal de componentes complexos:
    ```javascript
    /**
     * Componente responsável por exibir a lista paginada de profissionais.
     * @param {Object} props
     * @param {Array} props.lista - Lista completa de profissionais.
     */
    ```
3.  **Wrappers e Contextos:** Explique claramente no seu TCC o uso do `AuthContext` como Wrapper para proteger rotas privadas (ex: só o admin acessa `/admin/dashboard`).

### B. Documentação da API (Back-end)
1.  **Uso do Swagger / OpenAPI:**
    *   Inclua a dependência `springdoc-openapi-starter-webmvc-ui` no seu Spring Boot.
    *   Isso gerará automaticamente uma página web (ex: `localhost:8080/swagger-ui.html`) com toda a documentação da sua API. Ele lista cada rota, parâmetros exigidos e o formato de saída (JSON). É excelente para apresentar na banca e testar.

### C. Estrutura Final da Arquitetura
Crie um diagrama de sistema (usando ferramentas como *Draw.io* ou *Figma*) que ilustre as integrações:
*   [ React (Website) ] ---> Requisições HTTP (JSON) ---> [ Spring Boot API ]
*   [ Flutter (Mobile) ] ---> Requisições HTTP (JSON) ---> [ Spring Boot API ]
*   [ Spring Boot API ] <--- Conexão JDBC ---> [ Banco de Dados MySQL ]

Isso demonstrará aos professores que você compreende perfeitamente como os três pilares (Front-end, Back-end e Banco de Dados) conversam de maneira isolada (Microsserviços) e prática.
