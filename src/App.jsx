import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Home from './pages/Home';
import ReportIssue from './pages/ReportIssue';
import Issues from './pages/Issues';
import Dashboard from './pages/Dashboard';
import MapPage from './pages/MapPage';
import Footer from './components/Footer';
import Toast from './components/Toast';
import PageTransition from './components/PageTransition';
import { loadTheme, saveTheme } from './utils/theme';
import './index.css';

// Wrapper component to handle page transitions
const AnimatedRoutes = ({ reports, toggleReportStatus, clearAllReports, addReport }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Home addReport={addReport} />
            </PageTransition>
          } 
        />
        <Route 
          path="/report" 
          element={
            <PageTransition>
              <ReportIssue addReport={addReport} />
            </PageTransition>
          } 
        />
        <Route 
          path="/issues" 
          element={
            <PageTransition>
              <Issues 
                reports={reports} 
                toggleReportStatus={toggleReportStatus} 
                clearAllReports={clearAllReports}
              />
            </PageTransition>
          } 
        />
        <Route 
          path="/map" 
          element={
            <PageTransition>
              <MapPage reports={reports} />
            </PageTransition>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PageTransition>
              <Dashboard reports={reports} />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [reports, setReports] = useState([]);
  const [theme, setTheme] = useState('light');
  const [toast, setToast] = useState({ show: false, title: '', message: '' });
  const { t, i18n } = useTranslation();

  // Load reports from localStorage on initial render
  useEffect(() => {
    const savedReports = localStorage.getItem('civicconnect_reports_v1');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
    
    // Load theme
    const savedTheme = loadTheme();
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    // Load preferred language
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  // Save reports to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('civicconnect_reports_v1', JSON.stringify(reports));
  }, [reports]);

  const showToast = (title, message) => {
    setToast({ show: true, title, message });
    setTimeout(() => {
      setToast({ ...toast, show: false });
    }, 3500);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const addReport = (report) => {
    const newReport = {
      ...report,
      id: 'RPT' + Math.floor(1000 + Math.random() * 9000),
      status: 'pending',
      when: new Date().toLocaleString()
    };
    
    setReports(prevReports => [newReport, ...prevReports]);
    showToast(t('report_added'), t('saved_locally'));
  };

  const toggleReportStatus = (id) => {
    setReports(prevReports => 
      prevReports.map(report => {
        if (report.id === id) {
          const newStatus = report.status === 'pending' ? 'resolved' : 'pending';
          const updatedReport = { ...report, status: newStatus };
          
          showToast(t('status_updated'), `${report.category} ${t('is_now')} ${newStatus}`);
          return updatedReport;
        }
        return report;
      })
    );
  };

  const clearAllReports = () => {
    if (window.confirm('Clear all local reports? This cannot be undone.')) {
      setReports([]);
      showToast(t('cleared'), t('all_local_reports_removed'));
    }
  };

  return (
    <Router>
      <div className="app">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
        
        <main>
          <AnimatedRoutes 
            reports={reports} 
            toggleReportStatus={toggleReportStatus} 
            clearAllReports={clearAllReports}
            addReport={addReport}
          />
        </main>
        
        <Footer />
        <Toast 
          show={toast.show} 
          title={toast.title} 
          message={toast.message} 
        />
      </div>
    </Router>
  );
}

export default App;