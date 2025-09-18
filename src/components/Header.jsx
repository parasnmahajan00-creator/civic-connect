import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Header = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const { t } = useTranslation();
  
  // Function to determine if a tab is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header>
      <div className="nav">
        <div className="brand">
          <div className="logo">
            <img 
              src="https://user-gen-media-assets.s3.amazonaws.com/gemini_images/3e51dccf-2c8d-4a23-8cf3-3f38e18725c5.png" 
              alt="CivicConnect Logo" 
              style={{ height: '40px', width: 'auto' }}
            />
          </div>
          <div>
            <h1>CivicConnect</h1>
            <p>crowdsourced civic reporting</p>
          </div>
        </div>

        <nav className="nav-tabs">
          <Link 
            to="/" 
            className={`tab-link ${isActive('/') ? 'active' : ''}`}
          >
            {t('home')}
          </Link>
          <Link 
            to="/report" 
            className={`tab-link ${isActive('/report') ? 'active' : ''}`}
          >
            {t('report_issue')}
          </Link>
          <Link 
            to="/issues" 
            className={`tab-link ${isActive('/issues') ? 'active' : ''}`}
          >
            {t('issues')}
          </Link>
          <Link 
            to="/map" 
            className={`tab-link ${isActive('/map') ? 'active' : ''}`}
          >
            {t('map')}
          </Link>
          <Link 
            to="/dashboard" 
            className={`tab-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            {t('dashboard')}
          </Link>
        </nav>

        <div className="controls">
          <LanguageSelector />
          <button 
            className="btn ghost small" 
            id="geoBtn" 
            title="Use current location"
          >
            <i className="fa-solid fa-location-crosshairs"></i>
          </button>
          <button 
            className="btn small" 
            id="themeBtn" 
            onClick={toggleTheme}
          >
            {theme === 'dark' ? t('light_mode') : t('dark_mode')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;