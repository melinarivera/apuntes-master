import { useState } from 'react'
import { X, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { db, storage } from './firebaseClient'
import { collection, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const MATERIAS = [
  'Métodos cuantitativos',
  'Estrategia',
  'Finanzas corporativas',
  'Marketing digital',
  'Otra',
]

export default function UploadModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({ autor: '', materia: '', titulo: '', descripcion: '', paginas: '' })
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [dragOver, setDragOver] = useState(false)

  function handleFile(f) {
    if (f && f.type === 'application/pdf') setFile(f)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) return
    if (!form.autor || !form.materia || !form.titulo) {
      setErrorMsg('Rellena nombre, materia y título.')
      return
    }
    setStatus('uploading')
    setErrorMsg('')

    try {
      const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`
      const storageRef = ref(storage, `apuntes/${filename}`)
      await uploadBytes(storageRef, file)
      const pdf_url = await getDownloadURL(storageRef)

      await addDoc(collection(db, 'apuntes'), {
        autor: form.autor,
        materia: form.materia,
        titulo: form.titulo,
        descripcion: form.descripcion,
        paginas: form.paginas ? parseInt(form.paginas) : null,
        pdf_url,
        es_propio: false,
        created_at: new Date().toISOString(),
      })

      setStatus('success')
      setTimeout(() => { onSuccess(); onClose() }, 1800)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err.message || 'Algo salió mal. Inténtalo de nuevo.')
    }
  }

  const inputStyle = {
    width: '100%', padding: '10px 14px',
    border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)',
    fontFamily: 'var(--font-sans)', fontSize: '14px',
    background: 'var(--surface)', color: 'var(--text-primary)',
    outline: 'none', transition: 'border-color 0.15s',
  }

  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 500,
    color: 'var(--text-secondary)', marginBottom: '6px',
    textTransform: 'uppercase', letterSpacing: '0.05em',
  }

  if (status === 'success') {
    return (
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div style={{ background: 'var(--surface-raised)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: '480px', padding: '3rem', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <CheckCircle size={48} color="#0F766E" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', marginBottom: '8px' }}>¡Apuntes subidos!</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Ya están disponibles para todos.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: 'var(--surface-raised)', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: '480px', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem 1.5rem 1rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 500 }}>Subir apuntes</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '2px' }}>Comparte lo que tienes con el grupo</p>
          </div>
          <button onClick={onClose} style={{ padding: '6px', borderRadius: 'var(--radius-sm)', color: 'var(--text-tertiary)', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
            onClick={() => document.getElementById('pdf-input').click()}
            style={{ border: `2px dashed ${dragOver ? 'var(--indigo)' : file ? '#0F766E' : 'var(--border-strong)'}`, borderRadius: 'var(--radius-md)', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', background: dragOver ? 'var(--indigo-light)' : file ? '#CCFBF1' : 'var(--surface)', transition: 'all 0.2s' }}
          >
            <input id="pdf-input" type="file" accept="application/pdf" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
            {file ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <FileText size={18} color="#0F766E" />
                <span style={{ fontSize: '14px', color: '#0F766E', fontWeight: 500 }}>{file.name}</span>
              </div>
            ) : (
              <>
                <Upload size={24} color="var(--text-tertiary)" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Arrastra el PDF aquí o haz clic para seleccionar</p>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '4px' }}>Solo archivos PDF</p>
              </>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Tu nombre</label>
              <input style={inputStyle} placeholder="María García" value={form.autor} onChange={e => setForm(p => ({ ...p, autor: e.target.value }))} onFocus={e => e.target.style.borderColor = 'var(--indigo)'} onBlur={e => e.target.style.borderColor = 'var(--border-strong)'} required />
            </div>
            <div>
              <label style={labelStyle}>Materia</label>
              <select style={{ ...inputStyle, cursor: 'pointer' }} value={form.materia} onChange={e => setForm(p => ({ ...p, materia: e.target.value }))} onFocus={e => e.target.style.borderColor = 'var(--indigo)'} onBlur={e => e.target.style.borderColor = 'var(--border-strong)'} required>
                <option value="">Selecciona…</option>
                {MATERIAS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Título del documento</label>
            <input style={inputStyle} placeholder="Ej: Resumen tema 4 — valoración de empresas" value={form.titulo} onChange={e => setForm(p => ({ ...p, titulo: e.target.value }))} onFocus={e => e.target.style.borderColor = 'var(--indigo)'} onBlur={e => e.target.style.borderColor = 'var(--border-strong)'} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Descripción (opcional)</label>
              <input style={inputStyle} placeholder="De qué va, qué temas cubre…" value={form.descripcion} onChange={e => setForm(p => ({ ...p, descripcion: e.target.value }))} onFocus={e => e.target.style.borderColor = 'var(--indigo)'} onBlur={e => e.target.style.borderColor = 'var(--border-strong)'} />
            </div>
            <div>
              <label style={labelStyle}>Páginas</label>
              <input style={inputStyle} type="number" min="1" max="500" placeholder="12" value={form.paginas} onChange={e => setForm(p => ({ ...p, paginas: e.target.value }))} onFocus={e => e.target.style.borderColor = 'var(--indigo)'} onBlur={e => e.target.style.borderColor = 'var(--border-strong)'} />
            </div>
          </div>

          {errorMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#FEF2F2', borderRadius: 'var(--radius-md)', color: '#991B1B', fontSize: '13px' }}>
              <AlertCircle size={14} />{errorMsg}
            </div>
          )}

          <button type="submit" disabled={status === 'uploading' || !file}
            style={{ padding: '13px', background: (!file || status === 'uploading') ? 'var(--border-strong)' : 'var(--indigo)', color: '#fff', borderRadius: 'var(--radius-md)', fontSize: '15px', fontWeight: 500, transition: 'background 0.15s', cursor: (!file || status === 'uploading') ? 'not-allowed' : 'pointer' }}
            onMouseEnter={e => { if (file && status !== 'uploading') e.currentTarget.style.background = 'var(--indigo-dark)' }}
            onMouseLeave={e => { if (file && status !== 'uploading') e.currentTarget.style.background = 'var(--indigo)' }}
          >
            {status === 'uploading' ? 'Subiendo…' : 'Subir apuntes'}
          </button>
        </form>
      </div>
    </div>
  )
}