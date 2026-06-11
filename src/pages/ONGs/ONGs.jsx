import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { getOngs, postOng, deleteOng } from '../../services/api'
import lupaImg from '../../assets/lupa.png'
import telefoneImg from '../../assets/telefone.png'
import emailImg from '../../assets/email.png'
import webIconImg from '../../assets/web-icon.png'
import duvidaIconImg from '../../assets/imagens-novas/duvida-icon.png'
import excluirIconImg from '../../assets/imagens-novas/excluir-icon.png'
import adcionarIconImg from '../../assets/imagens-novas/adcionar-icon.png'
import filtrarIconImg from '../../assets/imagens-novas/filtrar-icon.png'
import './ONGs.css'

const LIMITE = 4
const ESTADOS = ['SP', 'RJ', 'MG', 'RS', 'PR']
const CONDICOES = ['TEA/Autismo', 'TDAH', 'Dislexia', 'TOC', 'Múltiplas']

const FORM_ONG_INICIAL = {
  nameInstitution: '',
  emailInstitution: '',
  localInstitution: 'SP',
  focusInstitution: 'TEA/Autismo',
  descriptionInstitution: '',
  urlOfficialWebsite: '',
  imageInstitution: '',
  cnpjInstitution: '',
  // campos auxiliares de exibição (mantidos localmente)
  telefone: '',
  servicos: '',
}

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

// Formata CNPJ: XX.XXX.XXX/XXXX-XX
function formatarCnpj(valor) {
  const nums = valor.replace(/\D/g, '').slice(0, 14)
  return nums
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export default function ONGs() {
  const [lista, setLista] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [busca, setBusca] = useState('')
  const [estado, setEstado] = useState('')
  const [cond, setCond] = useState('')
  const [modalOng, setModalOng] = useState(false)
  const [formOng, setFormOng] = useState(FORM_ONG_INICIAL)
  const [viu, setViu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState(null) // { id, nome }
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const { id: paramId } = useParams()

  const carregar = () => {
    const removidas = JSON.parse(localStorage.getItem('inclure_ongs_removidas') || '[]')
    getOngs().then(res => {
      const todas = res.data.filter(o => !removidas.includes(o.id))
      setLista(todas); setFiltrados(todas); setLoading(false)
    })
  }

  useEffect(() => { carregar() }, [])

  // Detecta rota /ongs/adicionar ao montar
  useEffect(() => {
    if (window.location.pathname === '/ongs/adicionar') {
      setModalOng(true)
    }
  }, [])

  // Detecta rota /deletar-ong/:id ao montar
  useEffect(() => {
    if (paramId && lista.length > 0) {
      const path = window.location.pathname
      if (path.startsWith('/deletar-ong/')) {
        const ongEncontrada = lista.find(o => String(o.id) === String(paramId))
        if (ongEncontrada && !confirmDelete) {
          setConfirmDelete({ id: ongEncontrada.id, nome: ongEncontrada.nome || ongEncontrada.nameInstitution })
        }
      }
    }
  }, [paramId, lista])

  const filtrar = () => {
    const b = busca.toLowerCase()
    setFiltrados(lista.filter(o =>
      (o.nome || o.nameInstitution || '').toLowerCase().includes(b) &&
      (!estado || (o.estado || o.localInstitution) === estado) &&
      (!cond || (o.condicao || o.focusInstitution || '').includes(cond))
    ))
    setViu(false)
  }

  const limpar = () => { setBusca(''); setEstado(''); setCond(''); setFiltrados(lista); setViu(false) }

  const handleFotoOng = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => { setFormOng(f => ({ ...f, imageInstitution: ev.target.result })) }
    reader.readAsDataURL(file)
  }

  // Abre modal de adicionar e muda URL
  const abrirModalAdicionar = () => {
    navigate('/ongs/adicionar')
    setModalOng(true)
  }

  // Fecha modal de adicionar e volta URL
  const fecharModalAdicionar = () => {
    setModalOng(false)
    setFormOng(FORM_ONG_INICIAL)
    navigate('/ongs')
  }

  const handleAddOng = (e) => {
    e.preventDefault()
    const payload = {
      nameInstitution: formOng.nameInstitution,
      emailInstitution: formOng.emailInstitution,
      localInstitution: formOng.localInstitution,
      focusInstitution: formOng.focusInstitution,
      descriptionInstitution: formOng.descriptionInstitution,
      urlOfficialWebsite: formOng.urlOfficialWebsite,
      imageInstitution: formOng.imageInstitution || 'https://placehold.co/800x200/cccccc/ffffff?text=Capa',
      cnpjInstitution: formOng.cnpjInstitution,
      // compatibilidade local
      nome: formOng.nameInstitution,
      email: formOng.emailInstitution,
      estado: formOng.localInstitution,
      condicao: formOng.focusInstitution,
      descricao: formOng.descriptionInstitution,
      site: formOng.urlOfficialWebsite,
      img: formOng.imageInstitution || 'https://placehold.co/800x200/cccccc/ffffff?text=Capa',
      telefone: formOng.telefone,
      servicos: formOng.servicos.split(',').map(s => s.trim()).filter(s => s),
    }
    postOng(payload).then(() => {
      fecharModalAdicionar()
      carregar()
    })
  }

  // Abre modal de confirmação e muda URL
  const abrirConfirmDelete = (ong) => {
    navigate(`/deletar-ong/${ong.id}`)
    setConfirmDelete({ id: ong.id, nome: ong.nome || ong.nameInstitution })
  }

  // Fecha modal de confirmação e volta URL
  const cancelarDelete = () => {
    setConfirmDelete(null)
    navigate('/ongs')
  }

  // Confirma exclusão
  const confirmarDelete = () => {
    const id = confirmDelete.id
    setConfirmDelete(null)
    navigate('/ongs')
    const rem = JSON.parse(localStorage.getItem('inclure_ongs_removidas') || '[]')
    rem.push(id)
    localStorage.setItem('inclure_ongs_removidas', JSON.stringify(rem))
    const extra = JSON.parse(localStorage.getItem('inclure_ongs_extra') || '[]')
    localStorage.setItem('inclure_ongs_extra', JSON.stringify(extra.filter(o => o.id !== id)))
    const nova = lista.filter(o => o.id !== id)
    setLista(nova); setFiltrados(nova)
  }

  const visiveis = viu ? filtrados : filtrados.slice(0, LIMITE)

  return (
    <div className="principal">
      <div className="topo">
        <h1 className="titulo-sec">ONGs e Recursos</h1>
        <p className="subtitulo">Encontre organizações e instituições que oferecem suporte para pessoas neurodivergentes e suas famílias</p>
      </div>

      <div className="aviso">
        <img src={duvidaIconImg} alt="Dúvida" />
        Muitas dessas ONGs oferecem serviços gratuitos para famílias de baixa renda. Entre em contato para saber sobre os requisitos de acesso.
      </div>

      <div className="filtro">
        <div className="busca">
          <input type="text" placeholder="Buscar ONGs..." value={busca} onChange={e => setBusca(e.target.value)} />
          <img src={lupaImg} alt="Buscar" />
        </div>
        <select className="seletor" value={estado} onChange={e => setEstado(e.target.value)}>
          <option value="">Estado</option>
          {ESTADOS.map(e => <option key={e}>{e}</option>)}
        </select>
        <select className="seletor" value={cond} onChange={e => setCond(e.target.value)}>
          <option value="">Condições</option>
          {CONDICOES.map(c => <option key={c}>{c}</option>)}
        </select>
        <button className="btn-filtrar" onClick={filtrar}><img src={filtrarIconImg} alt="" className="btn-icon-sm" />Filtrar</button>
        <button className="btn-limpar" onClick={limpar}>Limpar</button>
      </div>

      {isAdmin && (
        <div className="topo-admin-acao">
          <button className="btn btn-verde" onClick={abrirModalAdicionar}>
            <img src={adcionarIconImg} alt="" className="btn-icon" />Adicionar ONG
          </button>
        </div>
      )}

      {loading ? <p className="texto-carregando">Carregando...</p> : (
        <>
          <div className="ong-grade" id="listaOngs">
            {visiveis.map(o => (
              <div className="ong-card" key={o.id}>
                <div className="ong-banner"><img src={o.img || o.imageInstitution} alt={o.nome || o.nameInstitution} /></div>
                <div className="ong-dados">
                  <div className="ong-nome">{o.nome || o.nameInstitution}</div>
                  <div className="ong-meta">
                    <span className="tag">{o.condicao || o.focusInstitution}</span>
                    <span className="ong-estado">{o.estado || o.localInstitution}</span>
                    {(o.cnpjInstitution || o.cnpj) && (
                      <span className="ong-cnpj">CNPJ: {o.cnpjInstitution || o.cnpj}</span>
                    )}
                  </div>
                  <div className="ong-desc">{o.descricao || o.descriptionInstitution}</div>
                  {o.servicos && o.servicos.length > 0 && (
                    <div className="ong-servicos">
                      <strong>Serviços:</strong>
                      <div className="ong-tags">{o.servicos.map((s, i) => <span className="ong-tag" key={i}>{s}</span>)}</div>
                    </div>
                  )}
                  <div className="ong-barra">
                    {(o.telefone) && <span><img src={telefoneImg} alt="Tel" />{o.telefone}</span>}
                    <span><img src={emailImg} alt="Email" />{o.email || o.emailInstitution}</span>
                    <span><img src={webIconImg} alt="Site" />{o.site || o.urlOfficialWebsite}</span>
                  </div>
                  {isAdmin && (
                    <div className="admin-btns admin-btns-topo">
                      <button className="btn-admin-del" onClick={() => abrirConfirmDelete(o)}>
                        <img src={excluirIconImg} alt="" className="btn-icon-sm" />Excluir
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!viu && filtrados.length > LIMITE && (
            <div className="ver-mais"><button className="btn btn-teal" onClick={() => setViu(true)}>Ver Mais</button></div>
          )}
          {filtrados.length === 0 && <p className="texto-vazio">Nenhuma ONG encontrada.</p>}
        </>
      )}

      {/* Modal de adicionar ONG */}
      {modalOng && (
        <div className="admin-modal-overlay" onClick={e => e.target.className.includes('overlay') && fecharModalAdicionar()}>
          <div className="admin-modal">
            <h3>Adicionar Nova ONG</h3>
            <form onSubmit={handleAddOng} className="campos">
              <input
                className="campo-input"
                type="text"
                placeholder="Nome da ONG"
                value={formOng.nameInstitution}
                onChange={e => setFormOng(f => ({ ...f, nameInstitution: e.target.value }))}
                required
              />

              {/* CNPJ */}
              <div>
                <label className="form-label">CNPJ</label>
                <input
                  className="campo-input"
                  type="text"
                  placeholder="00.000.000/0000-00"
                  value={formOng.cnpjInstitution}
                  onChange={e => setFormOng(f => ({ ...f, cnpjInstitution: formatarCnpj(e.target.value) }))}
                  maxLength={18}
                  required
                />
              </div>

              <div className="grupo-campos">
                <select
                  className="campo-input seletor"
                  value={formOng.localInstitution}
                  onChange={e => setFormOng(f => ({ ...f, localInstitution: e.target.value }))}
                  required
                >
                  {ESTADOS.map(e => <option key={e}>{e}</option>)}
                </select>
                <select
                  className="campo-input seletor"
                  value={formOng.focusInstitution}
                  onChange={e => setFormOng(f => ({ ...f, focusInstitution: e.target.value }))}
                  required
                >
                  {CONDICOES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <textarea
                className="campo-input area-txt"
                placeholder="Descrição"
                value={formOng.descriptionInstitution}
                onChange={e => setFormOng(f => ({ ...f, descriptionInstitution: e.target.value }))}
                required
              />
              <input
                className="campo-input"
                type="text"
                placeholder="Serviços (separados por vírgula)"
                value={formOng.servicos}
                onChange={e => setFormOng(f => ({ ...f, servicos: e.target.value }))}
                required
              />

              {/* Telefone, Email, Site */}
              <div className="grupo-campos">
                <input
                  className="campo-input"
                  type="tel"
                  placeholder="Telefone"
                  value={formOng.telefone}
                  onChange={e => setFormOng(f => ({ ...f, telefone: e.target.value }))}
                  required
                />
                <input
                  className="campo-input"
                  type="email"
                  placeholder="Email"
                  value={formOng.emailInstitution}
                  onChange={e => setFormOng(f => ({ ...f, emailInstitution: e.target.value }))}
                  required
                />
              </div>
              <input
                className="campo-input"
                type="text"
                placeholder="Site oficial (opcional)"
                value={formOng.urlOfficialWebsite}
                onChange={e => setFormOng(f => ({ ...f, urlOfficialWebsite: e.target.value }))}
              />

              <div className="grupo-campos-coluna">
                <label className="label-upload">Imagem de Capa</label>
                <input type="file" accept="image/*" onChange={handleFotoOng} className="campo-input input-arquivo" />
                {formOng.imageInstitution && <img src={formOng.imageInstitution} alt="Preview" className="preview-banner" />}
              </div>

              <div className="admin-modal-btns">
                <button type="button" className="btn btn-cinza" onClick={fecharModalAdicionar}>Cancelar</button>
                <button type="submit" className="btn btn-verde">
                  <img src={adcionarIconImg} alt="" className="btn-icon" />Adicionar ONG
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
