const Toast = ({ show, title, message }) => {
  return (
    <div className={`toast ${show ? 'show' : ''}`} role="status" aria-live="polite">
      <div style={{ fontSize: '18px' }}>✅</div>
      <div>
        <div id="toastTitle" style={{ fontWeight: '700' }}>{title}</div>
        <div id="toastMsg" style={{ color: 'var(--muted)', fontSize: '.92rem' }}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default Toast;