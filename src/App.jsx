import { useState } from 'react'
import { BookOpen, ChevronDown, Sparkles, ArrowUpRight, Coffee, Smartphone, Heart, Brain, Quote, Lightbulb } from 'lucide-react'
import NoteCard from './NoteCard'
import './index.css'

const MY_NOTES = [
  { id: 'own-1', materia: 'Compensación y beneficios', titulo: 'Guías de estudio — Unidades 1 a 6', descripcion: null, autor: 'Melina', paginas: null, pdf_url: 'https://drive.google.com/drive/folders/1754YYI-UVY9Gtm5sm8KQNnp-2nOjdPpY?usp=sharing', es_propio: true, created_at: new Date().toISOString() },
  { id: 'own-2', materia: 'Trabajo en equipos y liderazgo', titulo: 'Próximamente', descripcion: null, autor: 'Melina', paginas: null, pdf_url: null, es_propio: true, created_at: new Date().toISOString() },
  { id: 'own-3', materia: 'Digitalización y analytics', titulo: 'Próximamente', descripcion: null, autor: 'Melina', paginas: null, pdf_url: null, es_propio: true, created_at: new Date().toISOString() },
  { id: 'own-4', materia: 'Transformación digital en RRHH', titulo: 'Próximamente', descripcion: null, autor: 'Melina', paginas: null, pdf_url: null, es_propio: true, created_at: new Date().toISOString() },
]

const MATERIAS_FILTER = ['Todas', 'Compensación y beneficios', 'Trabajo en equipos y liderazgo', 'Digitalización y analytics', 'Transformación digital en RRHH']

export default function App() {
  const [filter, setFilter] = useState('Todas')
  const [showBizum, setShowBizum] = useState(false)
  const filtered = filter === 'Todas' ? MY_NOTES : MY_NOTES.filter(n => n.materia === filter)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(250,250,249,0.88)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <BookOpen size={20} color="var(--indigo)" />
          <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '16px' }}>Apuntes del máster</span>
        </div>
        <a href="https://ko-fi.com/melinarivera" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'var(--indigo)', color: '#fff', borderRadius: 'var(--radius-md)', fontSize: '13px', fontWeight: 500 }}>
          <Coffee size={13} /> Invítame un café
        </a>
      </nav>

      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '6rem 2rem 4rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '12px', color: 'var(--indigo)', background: 'var(--indigo-light)', padding: '4px 12px', borderRadius: '99px', marginBottom: '1.5rem', fontWeight: 500 }}>
          <Sparkles size={12} /> Máster RRHH · Cuatrimestre 2
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 400, lineHeight: 1.15, maxWidth: '720px', marginBottom: '1.25rem' }}>
          Apuntes del máster y<br />
          <em style={{ fontStyle: 'italic', color: 'var(--indigo)' }}>Guías de estudio</em>
        </h1>
        <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '560px', lineHeight: 1.65, marginBottom: '2.5rem' }}>
          Les comparto mis resúmenes de este cuatri. Sin pedir nada a cambio — aunque si les sirven, un cafecito siempre se agradece ☕
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => document.getElementById('notes-section').scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: 'var(--text-primary)', color: 'var(--surface)', borderRadius: 'var(--radius-md)', fontSize: '15px', fontWeight: 500, border: 'none', cursor: 'pointer' }}>
            Ver apuntes <ChevronDown size={16} />
          </button>
        </div>
      </section>

      <section id="notes-section" style={{ maxWidth: '860px', margin: '0 auto', padding: '3.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 500, marginBottom: '4px' }}>Apuntes del cuatri</h2>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {MATERIAS_FILTER.map(m => (
              <button key={m} onClick={() => setFilter(m)} style={{ padding: '6px 14px', borderRadius: '99px', fontSize: '12px', fontWeight: 500, border: `1px solid ${filter === m ? 'var(--indigo)' : 'var(--border-strong)'}`, background: filter === m ? 'var(--indigo-light)' : 'transparent', color: filter === m ? 'var(--indigo)' : 'var(--text-secondary)', cursor: 'pointer' }}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {filtered.map(note => <NoteCard key={note.id} note={note} isOwn={note.es_propio === true} />)}
        </div>
      </section>

      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '3.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
              <img src="/logo.png" alt="Tesovia" style={{ width: 64, height: 64, objectFit: 'contain' }} />
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>También creé esto</p>
                <p style={{ fontSize: '15px', fontWeight: 500 }}>Tesovia</p>
              </div>
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, lineHeight: 1.25, marginBottom: '1rem' }}>
              Un asistente con IA para que el TFM{' '}
              <em style={{ color: 'var(--indigo)', fontStyle: 'italic' }}>duela un poco menos.</em>
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '1.5rem' }}>
              Lo construí porque lo necesitaba. Tesovia te acompaña desde la primera idea hasta la entrega: citas, feedback, detección de IA y bibliografía. Si están con el TFM, vale mucho la pena.
            </p>
            <a href="https://www.tesovia.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 20px', background: 'var(--indigo)', borderRadius: 'var(--radius-md)', fontSize: '14px', fontWeight: 500, color: '#fff' }}>
              Conocer Tesovia <ArrowUpRight size={14} />
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { Icon: Brain, title: 'Feedback académico', desc: 'Análisis de argumento, estructura y claridad en cada capítulo.' },
              { Icon: Quote, title: 'Revisor APA · MLA · IEEE', desc: 'Detecta y corrige errores en 7 formatos de citación distintos.' },
              { Icon: Lightbulb, title: 'Detector de IA y plagio', desc: 'Analiza la originalidad de tu trabajo antes que tu universidad.' },
              { Icon: BookOpen, title: 'Bibliografía sugerida', desc: 'Fuentes reales de Scopus, JCR y Google Scholar para tu tema.' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 16px', background: 'var(--surface-raised)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                <Icon size={20} color="var(--indigo)" style={{ flexShrink: 0, marginTop: '1px' }} />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '3px' }}>{title}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: '860px', margin: '0 auto', padding: '3.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 400, marginBottom: '1rem' }}>¿Te han sido útiles?</h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem' }}>
            Los apuntes son gratis y siempre lo serán. Pero si quieres invitarme a un café, te lo agradezco mucho <Heart size={16} style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--indigo)' }} />
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://ko-fi.com/melinarivera" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 24px', background: 'var(--indigo)', color: '#fff', borderRadius: 'var(--radius-md)', fontSize: '15px', fontWeight: 500 }}>
              <Coffee size={16} /> Ko-fi (tarjeta / Stripe)
            </a>
            <button onClick={() => setShowBizum(b => !b)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 24px', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', fontSize: '15px', color: 'var(--text-primary)', background: 'transparent', cursor: 'pointer' }}>
              <Smartphone size={16} /> Bizum
            </button>
          </div>
          {showBizum && (
            <div style={{ marginTop: '1.25rem', padding: '1.25rem', background: 'var(--indigo-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--indigo-mid)' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Número de Bizum</p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 500, color: 'var(--indigo)', letterSpacing: '0.05em' }}>+34 675 056 640</p>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '6px' }}>Delia Melina Rivera</p>
            </div>
          )}
        </div>
      </section>

      <footer style={{ maxWidth: '860px', margin: '0 auto', padding: '2.5rem 2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>Hecho con cariño · Máster RRHH 2025–26</p>
      </footer>
    </div>
  )
}
