import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getArtigos, postArtigo, putArtigo, deleteArtigo } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'
import lupaImg from '../../assets/lupa.png'
import filtrarIconImg from '../../assets/imagens-novas/filtrar-icon.png'
import adcionarIconImg from '../../assets/imagens-novas/adcionar-icon.png'
import excluirIconImg from '../../assets/imagens-novas/excluir-icon.png'
import editarIconImg from '../../assets/imagens-novas/editar-icon.png'
import './Blog.css'

const LIMITE = 4
const CATEGORIAS = ['Políticas Públicas', 'Pesquisas', 'Neurodivergência', 'Terapias', 'Internacional']
const FORM_ARTIGO_INICIAL = { categoria: 'Políticas Públicas', titulo: '', resumo: '', conteudo: '', autor: '', img: '', fontes: '' }

export default function Blog() {
  const [lista, setLista] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [busca, setBusca] = useState('')
  const [categ, setCateg] = useState('')
  const [modalArtigo, setModalArtigo] = useState(false)
  const [formArtigo, setFormArtigo] = useState(FORM_ARTIGO_INICIAL)
  const [editandoId, setEditandoId] = useState(null)
  const [viu, setViu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const { isAdmin } = useAuth()
  const navigate = useNavigate()

  const showToast = (msg, erro = false) => {
    setToast({ msg, erro })
    setTimeout(() => setToast(null), 3000)
  }

  const recarregar = () => {
    const removidos = JSON.parse(localStorage.getItem('inclure_artigos_removidos') || '[]')
    getArtigos().then(res => {
      const todos = res.data.filter(a => !removidos.includes(a.id))
      setLista(todos); setFiltrados(todos); setLoading(false)
    })
  }

  useEffect(() => { recarregar() }, [])

  const filtrar = () => {
    const b = busca.toLowerCase()
    setFiltrados(lista.filter(a =>
      (a.titulo.toLowerCase().includes(b) || a.resumo.toLowerCase().includes(b)) &&
      (!categ || a.categoria === categ)
    ))
    setViu(false)
  }

  const limpar = () => { setBusca(''); setCateg(''); setFiltrados(lista); setViu(false) }

  const handleFotoArtigo = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => { setFormArtigo(f => ({ ...f, img: ev.target.result })) }
    reader.readAsDataURL(file)
  }

  const abrirNovo = () => {
    setFormArtigo(FORM_ARTIGO_INICIAL)
    setEditandoId(null)
    setModalArtigo(true)
  }

  const iniciarEdicao = (artigo) => {
    setFormArtigo({
      categoria: artigo.categoria || 'Políticas Públicas',
      titulo: artigo.titulo || '',
      resumo: artigo.resumo || '',
      conteudo: artigo.conteudo || '',
      autor: artigo.autor || '',
      img: artigo.img || '',
      fontes: Array.isArray(artigo.fontes) ? artigo.fontes.join('\n') : (artigo.fontes || ''),
    })
    setEditandoId(artigo.id)
    setModalArtigo(true)
  }

  const fecharModal = () => {
    setModalArtigo(false)
    setFormArtigo(FORM_ARTIGO_INICIAL)
    setEditandoId(null)
  }

  const handleSubmitArtigo = (e) => {
    e.preventDefault()
    const fontesParsed = formArtigo.fontes.split('\n').map(s => s.trim()).filter(s => s)
    if (editandoId) {
      const payload = { ...formArtigo, fontes: fontesParsed }
      if (!payload.img) payload.img = 'https://placehold.co/800x200/cccccc/ffffff?text=Capa'
      putArtigo(editandoId, payload).then(() => {
        showToast('Artigo atualizado!')
        fecharModal()
        recarregar()
      })
    } else {
      const payload = {
        ...formArtigo,
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).replace(' de ', ' '),
        fontes: fontesParsed,
      }
      if (!payload.img) payload.img = 'https://placehold.co/800x200/cccccc/ffffff?text=Capa'
      postArtigo(payload).then(() => {
        showToast('Artigo adicionado!')
        fecharModal()
        recarregar()
      })
    }
  }

  const handleDelete = (id) => {
    if (!window.confirm('Excluir este artigo?')) return
    const rem = JSON.parse(localStorage.getItem('inclure_artigos_removidos') || '[]')
    rem.push(id)
    localStorage.setItem('inclure_artigos_removidos', JSON.stringify(rem))
    const extra = JSON.parse(localStorage.getItem('inclure_artigos_extra') || '[]')
    localStorage.setItem('inclure_artigos_extra', JSON.stringify(extra.filter(a => a.id !== id)))
    const nova = lista.filter(a => a.id !== id)
    setLista(nova); setFiltrados(nova.filter(a =>
      (!busca || a.titulo.toLowerCase().includes(busca.toLowerCase())) && (!categ || a.categoria === categ)
    ))
    showToast('Artigo excluído.')
  }

  const visiveis = viu ? filtrados : filtrados.slice(0, LIMITE)

  return (
    <div className="principal">
      {toast && <div className={`toast${toast.erro ? ' erro' : ''}`}>{toast.msg}</div>}

      <div className="topo">
        <h1 className="titulo-sec">Blog &amp; Pesquisas</h1>
        <p className="subtitulo">Políticas públicas, pesquisas científicas e novidades sobre neurodivergência no Brasil e no mundo</p>
      </div>

      <div className="filtro">
        <div className="busca">
          <input type="text" placeholder="Buscar artigos..." value={busca} onChange={e => setBusca(e.target.value)} />
          <img src={lupaImg} alt="Buscar" />
        </div>
        <select className="seletor" value={categ} onChange={e => setCateg(e.target.value)}>
          <option value="">Categoria</option>
          {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
        </select>
        <button className="btn-filtrar" onClick={filtrar}><img src={filtrarIconImg} alt="" className="btn-icon-sm" />Filtrar</button>
        <button className="btn-limpar" onClick={limpar}>Limpar</button>
      </div>

      {isAdmin && (
        <div className="topo-admin-acao">
          <button className="btn btn-verde" onClick={abrirNovo}><img src={adcionarIconImg} alt="" className="btn-icon" />Adicionar Artigo</button>
        </div>
      )}

      {loading ? (
        <p className="texto-carregando">Carregando...</p>
      ) : (
        <>
          <div className="blog-grade">
            {visiveis.map(b => (
              <div className="blog-card" key={b.id}>
                <div className="blog-banner"><img src={b.img} alt={b.titulo} /></div>
                <div className="blog-dados">
                  <div className="blog-meta">
                    <span className="blog-categ">{b.categoria}</span>
                    <span className="blog-data">{b.data}</span>
                  </div>
                  <h3>{b.titulo}</h3>
                  <p>{b.resumo}</p>
                  <div className="blog-rod">
                    <span className="blog-autor">{b.autor}</span>
                    <button className="btn-ler" onClick={() => navigate(`/blog/${b.id}`)}>Ler mais</button>
                  </div>
                  {isAdmin && (
                    <div className="admin-btns admin-btns-topo">
                      <button className="btn-admin-val" onClick={() => iniciarEdicao(b)}><img src={editarIconImg} alt="" className="btn-icon-sm" />Editar</button>
                      <button className="btn-admin-del" onClick={() => handleDelete(b.id)}><img src={excluirIconImg} alt="" className="btn-icon-sm" />Excluir</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!viu && filtrados.length > LIMITE && (
            <div className="ver-mais">
              <button className="btn btn-teal" onClick={() => setViu(true)}>Ver Mais</button>
            </div>
          )}
          {filtrados.length === 0 && <p className="texto-vazio">Nenhum artigo encontrado.</p>}
        </>
      )}

      {modalArtigo && (
        <div className="admin-modal-overlay" onClick={e => e.target.className.includes('overlay') && fecharModal()}>
          <div className="admin-modal">
            <h3>{editandoId ? 'Editar Artigo' : 'Adicionar Artigo / Pesquisa'}</h3>
            <form onSubmit={handleSubmitArtigo} className="campos">
              <select className="campo-input seletor" value={formArtigo.categoria} onChange={e => setFormArtigo(f => ({ ...f, categoria: e.target.value }))} required>
                {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
              </select>
              <input className="campo-input" type="text" placeholder="Título" value={formArtigo.titulo} onChange={e => setFormArtigo(f => ({ ...f, titulo: e.target.value }))} required />
              <input className="campo-input" type="text" placeholder="Autor" value={formArtigo.autor} onChange={e => setFormArtigo(f => ({ ...f, autor: e.target.value }))} required />
              <textarea className="campo-input area-txt area-txt-mini" placeholder="Resumo curto" value={formArtigo.resumo} onChange={e => setFormArtigo(f => ({ ...f, resumo: e.target.value }))} required />
              <textarea className="campo-input area-txt area-txt-grande" placeholder="Conteúdo completo (HTML permitido)" value={formArtigo.conteudo} onChange={e => setFormArtigo(f => ({ ...f, conteudo: e.target.value }))} required />
              <textarea className="campo-input area-txt area-txt-curta" placeholder="Fontes (uma por linha)" value={formArtigo.fontes} onChange={e => setFormArtigo(f => ({ ...f, fontes: e.target.value }))} />

              <div className="campo-foto-upload">
                <label className="label-upload">Imagem de Capa</label>
                <input type="file" accept="image/*" onChange={handleFotoArtigo} className="campo-input input-arquivo" />
                {formArtigo.img && <img src={formArtigo.img} alt="Preview" className="preview-banner" />}
              </div>

              <div className="admin-modal-btns">
                <button type="button" className="btn btn-cinza" onClick={fecharModal}>Cancelar</button>
                <button type="submit" className="btn btn-azul">
                  <img src={editandoId ? editarIconImg : adcionarIconImg} alt="" className="btn-icon" />
                  {editandoId ? 'Salvar Alterações' : 'Adicionar Artigo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
