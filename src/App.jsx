import { useState, useEffect } from 'react'
import { BookOpen, Upload, ExternalLink, ChevronDown, Sparkles, Users, ArrowUpRight } from 'lucide-react'
import { supabase } from './supabaseClient'
import NoteCard from './NoteCard'
import UploadModal from './UploadModal'
import './index.css'

// Tus apuntes propios — edita esto con los datos reales
// Para el pdf_url, sube el PDF a Supabase Storage y pega la URL pública
const MY_NOTES = [
  {
    id: 'own-1',
    materia: 'Métodos cuantitativos',
    titulo: 'Regresión, series temporales y datos de panel',
    descripcion: 'Resumen completo del cuatrimestre: OLS, errores estándar robustos, VAR, efectos fijos y aleatorios.',
    autor: 'Yo',
    paginas: 14,
    pdf_url: null, // 👈 Pon aquí la URL de tu PDF cuando lo tengas en Supabase
    es_propio: true,
    created_at: new Date().toISOString(),
  },
]

const MATERIAS_FILTER = ['Todas', 'Métodos cuantitativos', 'Estrategia', 'Finanzas corporativas', 'Marketing digital']

export default function App() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [filter, setFilter] = useState('Todas')

  async function fetchNotes() {
    setLoading(true)
    const { data, error } = await supabase
      .from('apuntes')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setNotes(data)
    setLoading(false)
  }

  useEffect(() => { fetchNotes() }, [])

  const allNotes = [...MY_NOTES, ...notes]
  const filtered = filter === 'Todas'
    ? allNotes
    : allNotes.filter(n => n.materia === filter)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>

      {/* NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(250,250,249,0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '60px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <BookOpen size={20} color="var(--indigo)" />
          <span style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: '16px' }}>
            Apuntes del máster
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 16px',
            background: 'var(--indigo)',
            color: '#fff',
            borderRadius: 'var(--radius-md)',
            fontSize: '13px',
            fontWeight: 500,
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--indigo-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--indigo)'}
        >
          <Upload size={13} />
          Subir mis apuntes
        </button>
      </nav>

      {/* HERO */}
      <section style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: '12px',
          color: 'var(--indigo)',
          background: 'var(--indigo-light)',
          padding: '4px 12px',
          borderRadius: '99px',
          marginBottom: '1.5rem',
          fontWeight: 500,
          letterSpacing: '0.04em',
        }}>
          <Sparkles size={12} />
          Cuatrimestre 2 · Recursos compartidos
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 400,
          lineHeight: 1.15,
          maxWidth: '720px',
          marginBottom: '1.25rem',
        }}>
          Los apuntes que ojalá<br />
          <em style={{ fontStyle: 'italic', color: 'var(--indigo)' }}>hubiésemos compartido</em><br />
          desde el primer día.
        </h1>

        <p style={{
          fontSize: '17px',
          color: 'var(--text-secondary)',
          maxWidth: '560px',
          lineHeight: 1.65,
          marginBottom: '2.5rem',
        }}>
          Os dejo mis resúmenes de este cuatri. Si tenéis los vuestros, subidlos —
          entre todos llegamos mucho mejor al examen y al TFM.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => document.getElementById('notes-section').scrollIntoView({ behavior: 'smooth' })}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '13px 24px',
              background: 'var(--text-primary)',
              color: 'var(--surface)',
              borderRadius: 'var(--radius-md)',
              fontSize: '15px',
              fontWeight: 500,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Ver apuntes disponibles
            <ChevronDown size={16} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '13px 24px',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              fontSize: '15px',
              color: 'var(--text-primary)',
              background: 'transparent',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--border)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Upload size={15} />
            Subir los míos
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '2.5rem', marginTop: '3.5rem',
          flexWrap: 'wrap',
        }}>
          {[
            { n: allNotes.length, label: 'documentos subidos' },
            { n: new Set(allNotes.map(n => n.materia)).size, label: 'materias cubiertas' },
            { n: new Set(allNotes.map(n => n.autor)).size, label: 'compañeros colaborando' },
          ].map(({ n, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '36px',
                fontWeight: 500,
                color: 'var(--indigo)',
                lineHeight: 1,
              }}>
                {n}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NOTES SECTION */}
      <section id="notes-section" style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '3.5rem 2rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 500, marginBottom: '4px' }}>
              Todos los apuntes
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
              {filtered.length} documento{filtered.length !== 1 ? 's' : ''}
              {filter !== 'Todas' ? ` en ${filter}` : ' en total'}
            </p>
          </div>

          {/* Filtros */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {MATERIAS_FILTER.map(m => (
              <button
                key={m}
                onClick={() => setFilter(m)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '99px',
                  fontSize: '12px',
                  fontWeight: 500,
                  border: `1px solid ${filter === m ? 'var(--indigo)' : 'var(--border-strong)'}`,
                  background: filter === m ? 'var(--indigo-light)' : 'transparent',
                  color: filter === m ? 'var(--indigo)' : 'var(--text-secondary)',
                  transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-tertiary)' }}>
            Cargando apuntes…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            border: '2px dashed var(--border)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <Users size={36} color="var(--text-tertiary)" style={{ marginBottom: '1rem' }} />
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', marginBottom: '8px' }}>
              Nadie ha subido apuntes de esta materia aún.
            </p>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '14px', marginBottom: '1.5rem' }}>
              Sé el primero — el grupo te lo agradecerá.
            </p>
            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '10px 20px',
                background: 'var(--indigo)',
                color: '#fff',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 500,
              }}
            >
              Subir apuntes
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
          }}>
            {filtered.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                isOwn={note.es_propio === true}
              />
            ))}
          </div>
        )}
      </section>

      {/* TESOVIA SECTION */}
      <section style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '3.5rem 2rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              background: 'var(--border)',
              padding: '4px 10px',
              borderRadius: '99px',
              marginBottom: '1rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}>
              Por cierto
            </div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '28px',
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: '1rem',
            }}>
              Para el TFM,{' '}
              <a
                href="https://www.tesovia.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--indigo)', fontStyle: 'italic' }}
              >
                Tesovia
              </a>{' '}
              me está siendo muy útil.
            </h2>
            <p style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '1.5rem',
            }}>
              No os lo vendo. Solo os digo que revisa citas APA/Harvard, detecta
              si el texto suena demasiado a IA, y da feedback sobre la coherencia
              del trabajo. Para el nivel de exigencia del máster, viene bien.
            </p>
            <a
              href="https://www.tesovia.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '11px 20px',
                border: '1px solid var(--indigo)',
                borderRadius: 'var(--radius-md)',
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--indigo)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--indigo)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--indigo)'
              }}
            >
              Echarle un vistazo
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Feature cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                icon: '📚',
                title: 'Citas APA, Harvard, MLA',
                desc: 'Revisa y genera bibliografías correctas automáticamente.',
              },
              {
                icon: '🔍',
                title: 'Detección de IA',
                desc: 'Analiza si tu texto puede levantar alertas en el tribunal.',
              },
              {
                icon: '🧩',
                title: 'Coherencia y estructura',
                desc: 'Feedback sobre el hilo argumental del trabajo.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                display: 'flex', gap: '14px', alignItems: 'flex-start',
                padding: '14px 16px',
                background: 'var(--surface-raised)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <span style={{ fontSize: '20px', lineHeight: 1, marginTop: '1px' }}>{icon}</span>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500, marginBottom: '3px' }}>{title}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '2.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          Hecho con cariño (y algo de procrastinación productiva) · Máster 2024–25
        </p>
        <a
          href="https://www.tesovia.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: '13px', color: 'var(--text-tertiary)',
          }}
        >
          Powered by <span style={{ color: 'var(--indigo)', fontWeight: 500 }}>Tesovia</span>
          <ExternalLink size={11} />
        </a>
      </footer>

      {showModal && (
        <UploadModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchNotes}
        />
      )}
    </div>
  )
}
