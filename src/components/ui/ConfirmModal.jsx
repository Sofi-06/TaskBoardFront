import './ConfirmModal.css'

export default function ConfirmModal({ title = '¿Seguro?', message, confirmLabel = 'Confirmar', danger = false, onConfirm, onClose }) {
  return <div className="confirm-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="confirm-modal" role="dialog" aria-modal="true"><div className={`confirm-icon ${danger ? 'danger' : ''}`}>{danger ? '!' : '✓'}</div><h2>{title}</h2><p>{message}</p><div className="confirm-actions"><button className="confirm-cancel" onClick={onClose}>Cancelar</button><button className={`confirm-ok ${danger ? 'danger' : ''}`} onClick={onConfirm}>{confirmLabel}</button></div></section></div>
}
