import { FileText, Download, User, Clock } from 'lucide-react'

const ACCENT_MAP = {
  'Métodos cuantitativos': { color: '#4F46E5', bg: '#EEF2FF', label: 'Cuantitativas' },
  'Estrategia': { color: '#0F766E', bg: '#CCFBF1', label: 'Estrategia' },
  'Finanzas corporativas': { color: '#C2410C', bg: '#FFF7ED', label: 'Finanzas' },
  'Marketing digital': { color: '#92400E', bg: '#FEF3C7', label: 'Marketing' },
  'default': { color: '#4F46E5', bg: '#EEF2FF', label: 'Apuntes' },
}

function getAccent(materia) {
  return ACCENT_MAP[materia] || ACCENT_MAP['default']
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export default function NoteCard({ note, isOwn }) {
  const accent = getAccent(note.materia)

  return (
    <div style={{
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: 'transform 0.18s ease, box-shadow 0.18s ease',
      display: 'flex',
      flexDirection: 'column',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = 'var(--shadow-md)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
    }}
    >
      {/* Franja color materia */}
      <div style={{
        height: '4px',
        background: accent.color,
      }} />

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 500,
            color: accent.color,
            background: accent.bg,
            padding: '3px 10px',
            borderRadius: '99px',
            letterSpacing: '0.03em',
          }}>
            {note.materia}
          </span>
          {isOwn && (
            <span style={{
              fontSize: '10px',
              color: '#fff',
              background: accent.color,
              padding: '2px 8px',
              borderRadius: '99px',
              fontWeight: 500,
              letterSpacing: '0.04em',
              flexShrink: 0,
            }}>
              mis apuntes
            </span>
          )}
        </div>

        {/* Título */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: 1.3,
            color: 'var(--text-primary)',
          }}>
            {note.titulo}
          </h3>
          {note.descripcion && (
            <p style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginTop: '6px',
              lineHeight: 1.5,
            }}>
              {note.descripcion}
            </p>
          )}
        </div>

        {/* Meta */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '10px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <User size={13} color="var(--text-tertiary)" />
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
              {note.autor || 'Anónimo'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {note.paginas && (
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <FileText size={12} />
                {note.paginas} págs.
              </span>
            )}
            {note.created_at && (
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} />
                {formatDate(note.created_at)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Descarga */}
      {note.pdf_url && (
        <a
          href={note.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '12px',
            background: accent.bg,
            color: accent.color,
            fontSize: '13px',
            fontWeight: 500,
            transition: 'filter 0.15s',
            borderTop: '1px solid var(--border)',
          }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'none'}
        >
          <Download size={14} />
          Descargar PDF
        </a>
      )}
    </div>
  )
}
