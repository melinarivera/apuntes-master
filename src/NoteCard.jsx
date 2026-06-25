import { FileText, Download, User, Clock } from 'lucide-react'

const ACCENT_MAP = {
  'Compensación y beneficios': { color: '#4F46E5', bg: '#EEF2FF' },
  'Trabajo en equipos y liderazgo': { color: '#0F766E', bg: '#CCFBF1' },
  'Digitalización y analytics': { color: '#C2410C', bg: '#FFF7ED' },
  'Transformación digital en RRHH': { color: '#92400E', bg: '#FEF3C7' },
  'default': { color: '#4F46E5', bg: '#EEF2FF' },
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

export default function NoteCard({ note, isOwn }) {
  const accent = ACCENT_MAP[note.materia] || ACCENT_MAP['default']
  const isPending = !note.pdf_url && note.titulo === 'Próximamente'

  return (
    <div style={{
      background: 'var(--surface-raised)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: 'transform 0.18s ease, box-shadow 0.18s ease',
      display: 'flex', flexDirection: 'column',
      opacity: isPending ? 0.6 : 1,
    }}
    onMouseEnter={e => { if (!isPending) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' } }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' }}
    >
      <div style={{ height: '4px', background: accent.color }} />

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <span style={{
            fontSize: '11px', fontWeight: 500, color: accent.color, background: accent.bg,
            padding: '3px 10px', borderRadius: '99px', letterSpacing: '0.03em',
          }}>
            {note.materia}
          </span>
          {isOwn && (
            <span style={{
              fontSize: '10px', color: '#fff', background: accent.color,
              padding: '2px 8px', borderRadius: '99px', fontWeight: 500,
              letterSpacing: '0.04em', flexShrink: 0,
            }}>
              mis apuntes
            </span>
          )}
        </div>

        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', fontWeight: 500, lineHeight: 1.3 }}>
            {note.titulo}
          </h3>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <User size={13} color="var(--text-tertiary)" />
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{note.autor || 'Anónimo'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {note.paginas && (
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <FileText size={12} />{note.paginas} págs.
              </span>
            )}
            {note.created_at && !isPending && (
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} />{formatDate(note.created_at)}
              </span>
            )}
          </div>
        </div>
      </div>

      {isPending ? (
        <div style={{ padding: '12px', background: 'var(--surface)', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '12px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          Próximamente
        </div>
      ) : note.pdf_url ? (
        <a href={note.pdf_url} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '12px', background: accent.bg, color: accent.color,
            fontSize: '13px', fontWeight: 500, transition: 'filter 0.15s',
            borderTop: '1px solid var(--border)',
          }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.95)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'none'}
        >
          <Download size={14} /> Descargar PDF
        </a>
      ) : null}
    </div>
  )
}
