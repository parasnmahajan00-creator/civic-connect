import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Save the selected language to localStorage
    localStorage.setItem('preferredLanguage', lng);
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      alignItems: 'center',
      padding: '8px',
      background: 'var(--card)',
      borderRadius: '10px',
      border: '1px solid var(--glass)'
    }}>
      <button 
        onClick={() => changeLanguage('en')}
        style={{
          background: i18n.language === 'en' ? 'var(--accent)' : 'transparent',
          color: i18n.language === 'en' ? '#111' : 'var(--text)',
          border: '1px solid var(--glass)',
          borderRadius: '8px',
          padding: '6px 12px',
          cursor: 'pointer',
          fontWeight: i18n.language === 'en' ? '700' : '400'
        }}
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('hi')}
        style={{
          background: i18n.language === 'hi' ? 'var(--accent)' : 'transparent',
          color: i18n.language === 'hi' ? '#111' : 'var(--text)',
          border: '1px solid var(--glass)',
          borderRadius: '8px',
          padding: '6px 12px',
          cursor: 'pointer',
          fontWeight: i18n.language === 'hi' ? '700' : '400'
        }}
      >
        हिं
      </button>
      <button 
        onClick={() => changeLanguage('ta')}
        style={{
          background: i18n.language === 'ta' ? 'var(--accent)' : 'transparent',
          color: i18n.language === 'ta' ? '#111' : 'var(--text)',
          border: '1px solid var(--glass)',
          borderRadius: '8px',
          padding: '6px 12px',
          cursor: 'pointer',
          fontWeight: i18n.language === 'ta' ? '700' : '400'
        }}
      >
        த
      </button>
    </div>
  );
};

export default LanguageSelector;