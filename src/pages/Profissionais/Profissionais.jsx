import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { getProfissionais, postProfissional, putProfissional, deleteProfissional, validarProfissional } from '../../services/api'
import lupaImg from '../../assets/lupa.png'
import localizacaoImg from '../../assets/localização.png'
import telefoneImg from '../../assets/telefone.png'
import emailImg from '../../assets/email.png'
import emailBrancoImg from '../../assets/imagens-novas/email-branco.png'
import telefoneBrancoImg from '../../assets/imagens-novas/telefone-branco.png'
import redeIconImg from '../../assets/imagens-novas/rede-icon.png'
import validarIconImg from '../../assets/imagens-novas/validar-icon.png'
import desvalidarIconImg from '../../assets/imagens-novas/desvalidar-icon.png'
import excluirIconImg from '../../assets/imagens-novas/excluir-icon.png'
import editarIconImg from '../../assets/imagens-novas/editar-icon.png'
import verIconImg from '../../assets/imagens-novas/ver-icon.png'
import adcionarIconImg from '../../assets/imagens-novas/adcionar-icon.png'
import filtrarIconImg from '../../assets/imagens-novas/filtrar-icon.png'
import cuidadoIconImg from '../../assets/imagens-novas/cuidado-icon.png'
import './Profissionais.css'

// --- CONFIGURAÇÕES / DADOS ---
const LIMITE = 4
const TAGS_DISP = ['TEA/Autismo', 'Dislexia', 'TOC']

// --- COMPONENTE: MODAL DE CONFIRMAÇÃO DE EXCLUSÃO ---
function ModalConfirmacaoDelete({ nome, onConfirmar, onCancelar }) {
  return (
    <div className="admin-modal-overlay" onClick={e => e.target.className.includes('admin-modal-overlay') && onCancelar()}>
      <div className="confirm-modal">
        <img src={excluirIconImg} alt="Excluir" className="icone-exclusao" />
        <p>
          Tem certeza que deseja excluir <strong>{nome}</strong>?<br />
          <span className="texto-acao-irreversivel">Esta ação não pode ser desfeita.</span>
        </p>
        <div className="confirm-modal-btns">
          <button className="btn btn-cinza" onClick={onCancelar}>Cancelar</button>
          <button className="btn btn-verm" onClick={onConfirmar}>
            <img src={excluirIconImg} alt="" className="btn-icon" />
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}

// --- COMPONENTE: DETALHES DO PROFISSIONAL (MODAL) ---
function ModalProfissional({ prof, onClose }) {
  const [modalSaida, setModalSaida] = useState(null)

  if (!prof) return null

  const abrirModalSaida = (url) => { setModalSaida(url) }
  const confirmarSaida = () => {
    window.open(modalSaida, '_blank', 'noopener,noreferrer')
    setModalSaida(null)
  }

  return (
    <div className="modal aberto" onClick={e => e.target.className.includes('modal aberto') && onClose()}>
      <div className="modal-box">
        <div className="modal-topo">
          <button className="modal-fechar" onClick={onClose}>✕</button>
          <div className="modal-avatar"><img src={prof.img || 'https://placehold.co/64x64/a5d6a7/white?text=P'} alt={prof.nome} /></div>
          <div className="modal-texto"><h2>{prof.nome}</h2><p>{prof.cargo} · {prof.local}</p></div>
        </div>
        <div className="modal-janela">
          <div className="modal-secao">
            <h3>Sobre o Profissional</h3>
            <p className="modal-desc">{prof.descricao}</p>
          </div>
          <div className="modal-secao">
            <h3>Informações Profissionais</h3>
            <div className="modal-grade">
              {[['Registro', prof.registro], ['Experiência', prof.experiencia], ['Atendimento', prof.atendimento], ['Localização', prof.local]].map(([r, v]) => (
                <div className="modal-dado" key={r}><span className="rotulo-m">{r}</span><span className="valor">{v}</span></div>
              ))}
            </div>
          </div>
          <div className="modal-secao">
            <h3>Especialidades</h3>
            <div className="modal-tags">{prof.tags?.map(t => <span className="modal-tag" key={t}>{t}</span>)}</div>
          </div>
          <div className="modal-secao">
            <h3>Contato</h3>
            <div className="modal-contatos-coluna">
              <button className="modal-btn modal-btn-verde"><img src={telefoneBrancoImg} alt="" className="modal-btn-icon" />{prof.telefone}</button>
              <button className="modal-btn modal-btn-azul"><img src={emailBrancoImg} alt="" className="modal-btn-icon" />{prof.email}</button>
              {prof.redeSocial && (
                <button className="modal-btn modal-btn-rede" onClick={() => abrirModalSaida(prof.redeSocial)}>
                  <img src={redeIconImg} alt="" className="modal-btn-icon" />Rede Social
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalSaida && (
        <div className="saida-overlay" onClick={e => e.target.className === 'saida-overlay' && setModalSaida(null)}>
          <div className="saida-modal">
            <img src={cuidadoIconImg} className="saida-icone" alt="Aviso" />
            <h3 className="saida-titulo">Você está saindo da Inclure</h3>
            <p className="saida-texto">
              Você está prestes a acessar um site externo. A Inclure não se responsabiliza pelo conteúdo de sites de terceiros.
            </p>
            <div className="saida-destino">
              <span className="saida-destino-label">Destino:</span>
              <span className="saida-destino-url">{modalSaida}</span>
            </div>
            <div className="saida-btns">
              <button className="saida-btn saida-btn-cancelar" onClick={() => setModalSaida(null)}>Cancelar</button>
              <button className="saida-btn saida-btn-continuar" onClick={confirmarSaida}>Continuar mesmo assim</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- COMPONENTE PRINCIPAL E LÓGICA ---
const FORM_INICIAL = (userCargo = '') => ({ nome: '', cargo: userCargo, local: '', telefone: '', email: '', redeSocial: '', registro: '', experiencia: '', atendimento: 'Presencial', descricao: '', img: '', tags: [] })

export default function Profissionais() {
  const { isLoggedIn, isAdmin, isProfissional, user } = useAuth()
  const navigate = useNavigate()
  const { id: paramId } = useParams()

  const [lista, setLista] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [busca, setBusca] = useState('')
  const [filtEmp, setFiltEmp] = useState('')
  const [filtEspec, setFiltEspec] = useState('')
  const [filtValidados, setFiltValidados] = useState(false)
  const [viu, setViu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modalProf, setModalProf] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState(() => FORM_INICIAL(user?.cargo || ''))
  const [editandoId, setEditandoId] = useState(null)
  const [validacoes, setValidacoes] = useState({})
  const [toast, setToast] = useState(null)
  const [meuPerfil, setMeuPerfil] = useState(null)
  // Estado do modal de confirmação de exclusão
  const [confirmDelete, setConfirmDelete] = useState(null) // { id, nome }

  const showToast = (msg, erro = false) => {
    setToast({ msg, erro })
    setTimeout(() => setToast(null), 3000)
  }

  const handleFotoProf = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => { setForm(f => ({ ...f, img: ev.target.result })) }
    reader.readAsDataURL(file)
  }

  const carregar = () => {
    const val = JSON.parse(localStorage.getItem('inclure_validacoes') || '{}')
    setValidacoes(val)
    getProfissionais().then(res => {
      const todos = res.data.map(p => ({ ...p, validado: val[p.id] !== undefined ? val[p.id] : p.validado }))
      setLista(todos)
      setFiltrados(todos)
      if (isProfissional && user?.id) {
        setMeuPerfil(todos.find(p => p.usuarioId === user.id) || null)
      }
      setLoading(false)

      // Se URL tem :id (rota /profissionais/:id), abre o modal do profissional correspondente
      if (paramId) {
        const profEncontrado = todos.find(p => String(p.id) === String(paramId))
        if (profEncontrado) setModalProf(profEncontrado)
      }
    })
  }

  useEffect(() => { carregar() }, [])

  // Quando a URL é /deletar-usuario/:id, abre o modal de confirmação correspondente
  useEffect(() => {
    if (paramId && lista.length > 0) {
      const path = window.location.pathname
      if (path.startsWith('/deletar-usuario/')) {
        const profEncontrado = lista.find(p => String(p.id) === String(paramId))
        if (profEncontrado && !confirmDelete) {
          setConfirmDelete({ id: profEncontrado.id, nome: profEncontrado.nome })
        }
      } else if (path.startsWith('/profissionais/')) {
        const profEncontrado = lista.find(p => String(p.id) === String(paramId))
        if (profEncontrado && !modalProf) {
          setModalProf(profEncontrado)
        }
      }
    }
  }, [paramId, lista])

  const aplicarFiltros = (lst, b, e, s, v) => lst.filter(p =>
    (p.nome.toLowerCase().includes(b.toLowerCase()) || p.cargo.toLowerCase().includes(b.toLowerCase())) &&
    (!e || p.cargo.toLowerCase().includes(e.toLowerCase())) &&
    (!s || p.tags?.some(t => t.toLowerCase().includes(s.toLowerCase()))) &&
    (!v || p.validado)
  )

  const filtrar = () => { setFiltrados(aplicarFiltros(lista, busca, filtEmp, filtEspec, filtValidados)); setViu(false) }
  const limpar = () => { setBusca(''); setFiltEmp(''); setFiltEspec(''); setFiltValidados(false); setFiltrados(lista); setViu(false) }

  const handleValidar = (id, validado) => {
    const msg = validado ? 'Deseja validar este profissional?' : 'Deseja remover a validação?'
    if (!window.confirm(msg)) return
    validarProfissional(id, validado).then(() => {
      const novas = { ...validacoes, [id]: validado }
      setValidacoes(novas)
      const atualizada = lista.map(p => p.id === id ? { ...p, validado } : p)
      setLista(atualizada)
      setFiltrados(aplicarFiltros(atualizada, busca, filtEmp, filtEspec, filtValidados))
      showToast(validado ? 'Profissional validado!' : 'Validação removida.')
    })
  }

  // Abre modal de confirmação e muda URL para /deletar-usuario/:id
  const abrirConfirmDelete = (prof) => {
    navigate(`/deletar-usuario/${prof.id}`)
    setConfirmDelete({ id: prof.id, nome: prof.nome })
  }

  // Fecha modal de confirmação e volta URL
  const cancelarDelete = () => {
    setConfirmDelete(null)
    navigate('/profissionais')
  }

  // Confirma a exclusão
  const confirmarDelete = () => {
    const id = confirmDelete.id
    setConfirmDelete(null)
    navigate('/profissionais')
    deleteProfissional(id).then(() => {
      const nova = lista.filter(p => p.id !== id)
      setLista(nova)
      setFiltrados(aplicarFiltros(nova, busca, filtEmp, filtEspec, filtValidados))
      if (meuPerfil?.id === id) setMeuPerfil(null)
      showToast('Profissional excluído.')
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    if (editandoId) {
      putProfissional(editandoId, form).then(() => {
        const nova = lista.map(p => p.id === editandoId ? { ...p, ...form } : p)
        setLista(nova); setFiltrados(aplicarFiltros(nova, busca, filtEmp, filtEspec, filtValidados))
        if (meuPerfil?.id === editandoId) setMeuPerfil({ ...meuPerfil, ...form })
        showToast('Publicação atualizada!'); setMostrarForm(false); setEditandoId(null); setForm(FORM_INICIAL(user?.cargo || ''))
      })
    } else {
      const novoDado = { ...form, usuarioId: user?.id }
      postProfissional(novoDado).then(res => {
        const novo = res.data || { ...novoDado, id: Date.now(), validado: false }
        const nova = [...lista, novo]
        setLista(nova); setFiltrados(aplicarFiltros(nova, busca, filtEmp, filtEspec, filtValidados))
        setMeuPerfil(novo)
        showToast('Publicação criada!'); setMostrarForm(false); setForm(FORM_INICIAL(user?.cargo || ''))
      })
    }
  }

  const iniciarEdicao = (p) => {
    setForm({ nome: p.nome, cargo: p.cargo, local: p.local, telefone: p.telefone, email: p.email, redeSocial: p.redeSocial || '', registro: p.registro, experiencia: p.experiencia, atendimento: p.atendimento, descricao: p.descricao, img: p.img || '', tags: p.tags || [] })
    setEditandoId(p.id); setMostrarForm(true)
  }

  // Abre modal do profissional e muda URL para /profissionais/:id
  const abrirPerfil = (prof) => {
    navigate(`/profissionais/${prof.id}`)
    setModalProf(prof)
  }

  // Fecha modal do profissional e volta URL
  const fecharPerfil = () => {
    setModalProf(null)
    navigate('/profissionais')
  }

  const toggleTag = (tag) => {
    setForm(f => ({ ...f, tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag] }))
  }

  const visiveis = viu ? filtrados : filtrados.slice(0, LIMITE)

  // --- VISUAL (HTML) ---
  return (
    <div className="principal">
      {toast && <div className={`toast${toast.erro ? ' erro' : ''}`}>{toast.msg}</div>}

      <div className="topo">
        <h1 className="titulo-sec">Profissionais Especializados</h1>
        <p className="subtitulo">Conecte-se com psicólogos, terapeutas e especialistas próximos a você</p>
      </div>

      {isProfissional && isLoggedIn && (
        <div className="barra-status-prof">
          <div>
            <strong>Seu perfil profissional:</strong>{' '}
            {meuPerfil ? <span className="status-publicado">Publicado</span> : <span className="status-nao-publicado">Não publicado</span>}
          </div>
          <div className="acoes-perfil-prof">
            {meuPerfil && <button className="btn btn-ciano" onClick={() => abrirPerfil(meuPerfil)}><img src={verIconImg} alt="" className="btn-icon" />Ver Perfil</button>}
            <button className="btn btn-verde" onClick={() => { setMostrarForm(true); if (!meuPerfil) setForm(FORM_INICIAL(user?.cargo || '')) }}>
              {meuPerfil ? <><img src={editarIconImg} alt="" className="btn-icon" />Editar Publicação</> : <><img src={adcionarIconImg} alt="" className="btn-icon" />Publicar Trabalho</>}
            </button>
            {meuPerfil && <button className="btn-admin-del" onClick={() => abrirConfirmDelete(meuPerfil)}><img src={excluirIconImg} alt="" className="btn-icon-sm" />Excluir</button>}
          </div>
        </div>
      )}

      {mostrarForm && isProfissional && (
        <div className="admin-modal-overlay" onClick={e => e.target.className.includes('admin-modal-overlay') && (setMostrarForm(false), setEditandoId(null), setForm(FORM_INICIAL))}>
          <div className="admin-modal">
            <h3>{editandoId ? 'Editar Publicação' : 'Publicar Trabalho'}</h3>
            <form onSubmit={handleSubmitForm} className="campos">
              {[['Nome completo', 'nome', 'text'], ['Cargo/Especialidade', 'cargo', 'select'], ['Localização', 'local', 'text'], ['Telefone', 'telefone', 'tel'], ['Email profissional', 'email', 'email'], ['Rede Social (URL)', 'redeSocial', 'url'], ['Nº de Registro', 'registro', 'text'], ['Tempo de experiência', 'experiencia', 'text']].map(([label, field, type]) => (
                <div key={field}>
                  <label className="form-label">{label}</label>
                  {type === 'select' && field === 'cargo' ? (
                    <select className="campo-input seletor" value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} required>
                      <option value="">Selecione seu cargo</option>
                      {['Psicólogo(a)', 'Terapeuta', 'Fonoaudiólogo(a)', 'Psiquiatra', 'Neurologista', 'Psicopedagogo(a)', 'Outro'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input className="campo-input" type={type} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} required={['nome', 'cargo', 'local', 'telefone', 'email', 'registro'].includes(field)} />
                  )}
                </div>
              ))}
              <div>
                <label className="form-label">Tipo de atendimento</label>
                <select className="campo-input seletor" value={form.atendimento} onChange={e => setForm(f => ({ ...f, atendimento: e.target.value }))}>
                  <option>Presencial</option><option>Online</option><option>Presencial e Online</option>
                </select>
              </div>
              <div className="campo-foto-upload">
                <label className="form-label">Foto (opcional)</label>
                <input type="file" accept="image/*" onChange={handleFotoProf} className="campo-input input-arquivo" />
                {form.img && <img src={form.img} alt="Preview" className="preview-avatar" />}
              </div>
              <div>
                <label className="form-label">Descrição</label>
                <textarea className="campo-input area-txt area-txt-curta" value={form.descricao} onChange={e => setForm(f => ({ ...f, descricao: e.target.value }))} required />
              </div>
              <div>
                <label className="form-label">Especialidades</label>
                <div className="lista-tags-form">
                  {TAGS_DISP.map(tag => (
                    <button type="button" key={tag} onClick={() => toggleTag(tag)}
                      className={`btn-tag${form.tags.includes(tag) ? ' ativo' : ''}`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div className="admin-modal-btns">
                <button type="button" className="btn btn-cinza" onClick={() => { setMostrarForm(false); setEditandoId(null); setForm(FORM_INICIAL(user?.cargo || '')) }}>Cancelar</button>
                <button type="submit" className="btn btn-verde">{editandoId ? 'Salvar alterações' : 'Publicar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="filtro">
        <div className="busca">
          <input type="text" placeholder="Buscar nome..." value={busca} onChange={e => setBusca(e.target.value)} />
          <img src={lupaImg} alt="Buscar" />
        </div>
        <select className="seletor" value={filtEmp} onChange={e => setFiltEmp(e.target.value)}>
          <option value="">Emprego</option>
          {['Psicólogo(a)', 'Terapeuta', 'Fonoaudiólogo(a)', 'Psiquiatra', 'Neurologista', 'Psicopedagogo(a)', 'Terapeuta Ocupacional'].map(o => <option key={o}>{o}</option>)}
        </select>
        <select className="seletor" value={filtEspec} onChange={e => setFiltEspec(e.target.value)}>
          <option value="">Especialidade</option>
          {TAGS_DISP.map(o => <option key={o}>{o}</option>)}
        </select>
        <button className="btn-filtrar" onClick={filtrar}><img src={filtrarIconImg} alt="" className="btn-icon-sm" />Filtrar</button>
        <button className="btn-limpar" onClick={limpar}>Limpar</button>
      </div>

      <div className="filtro-validados">
        <input type="checkbox" id="filtValCheck" checked={filtValidados} onChange={e => { setFiltValidados(e.target.checked); setFiltrados(aplicarFiltros(lista, busca, filtEmp, filtEspec, e.target.checked)); setViu(false) }} />
        <label htmlFor="filtValCheck" className="link-cursor">Mostrar apenas profissionais validados</label>
      </div>

      {loading ? <p className="texto-carregando">Carregando...</p> : (
        <>
          <div className="prof-grade" id="gradeProf">
            {visiveis.map(p => (
              <div className="prof-card" key={p.id}>
                <div className="prof-dados">
                  <div className="prof-topo">
                    <div className="prof-avatar"><img src={p.img || 'https://placehold.co/64x64/a5d6a7/white?text=P'} alt={p.nome} /></div>
                    <div>
                      <div className="prof-nome">{p.nome}</div>
                      <div className="prof-cargo">{p.cargo}</div>
                      {p.validado && (
                        <span className="selo-validado" data-tooltip="Verificado pela Inclure">Verificado</span>
                      )}
                    </div>
                  </div>
                  <div className="prof-info">
                    <div className="info-item"><img src={localizacaoImg} alt="Local" />{p.local}</div>
                    <div className="info-item"><img src={telefoneImg} alt="Tel" />{p.telefone}</div>
                    <div className="info-item"><img src={emailImg} alt="Email" />{p.email}</div>
                  </div>
                  <div className="tags">{p.tags?.map(t => <span className="tag" key={t}>{t}</span>)}</div>
                  {isAdmin && (
                    <div className="admin-btns">
                      {p.validado
                        ? <button className="btn-admin-inval" onClick={() => handleValidar(p.id, false)}><img src={desvalidarIconImg} alt="" className="btn-icon-sm" />Desvalidar</button>
                        : <button className="btn-admin-val" onClick={() => handleValidar(p.id, true)}><img src={validarIconImg} alt="" className="btn-icon-sm" />Validar</button>
                      }
                      <button className="btn-admin-del" onClick={() => abrirConfirmDelete(p)}><img src={excluirIconImg} alt="" className="btn-icon-sm" />Excluir</button>
                    </div>
                  )}
                  {isProfissional && p.usuarioId === user?.id && !isAdmin && (
                    <div className="admin-btns">
                      <button className="btn-admin-val" onClick={() => iniciarEdicao(p)}><img src={editarIconImg} alt="" className="btn-icon-sm" />Editar</button>
                      <button className="btn-admin-del" onClick={() => abrirConfirmDelete(p)}><img src={excluirIconImg} alt="" className="btn-icon-sm" />Excluir</button>
                    </div>
                  )}
                </div>
                <button className="btn-laranja" onClick={() => abrirPerfil(p)}>Ver perfil</button>
              </div>
            ))}
          </div>
          {!viu && filtrados.length > LIMITE && (
            <div className="ver-mais"><button className="btn btn-teal" onClick={() => setViu(true)}>Ver Mais</button></div>
          )}
          {filtrados.length === 0 && <p className="texto-vazio">Nenhum profissional encontrado.</p>}
        </>
      )}

      {/* Modal de perfil do profissional */}
      <ModalProfissional prof={modalProf} onClose={fecharPerfil} />

      {/* Modal de confirmação de exclusão */}
      {confirmDelete && (
        <ModalConfirmacaoDelete
          nome={confirmDelete.nome}
          onConfirmar={confirmarDelete}
          onCancelar={cancelarDelete}
        />
      )}
    </div>
  )
}
