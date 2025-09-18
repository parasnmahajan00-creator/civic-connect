import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedButton from '../components/AnimatedButton';
import { useTranslation } from 'react-i18next';

const Home = ({ addReport }) => {
  const [quickReport, setQuickReport] = useState({
    name: '',
    loc: '',
    desc: ''
  });
  
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0
  });
  
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Calculate stats from localStorage or props if available
  useEffect(() => {
    const savedReports = localStorage.getItem('civicconnect_reports_v1');
    if (savedReports) {
      try {
        const reports = JSON.parse(savedReports);
        const total = reports.length;
        const pending = reports.filter(r => r.status === 'pending').length;
        const resolved = reports.filter(r => r.status === 'resolved').length;
        
        setStats({ total, pending, resolved });
      } catch (e) {
        console.error('Error parsing reports:', e);
      }
    }
  }, []);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    
    if (!quickReport.desc.trim()) {
      alert(t('description_required'));
      return;
    }
    
    const newReport = {
      name: quickReport.name || 'Anonymous',
      category: 'Other',
      urgency: 'medium',
      loc: quickReport.loc,
      desc: quickReport.desc,
      photo: null,
      lat: null,
      lng: null
    };
    
    addReport(newReport);
    
    // Update stats
    setStats(prev => ({
      total: prev.total + 1,
      pending: prev.pending + 1,
      resolved: prev.resolved
    }));
    
    setQuickReport({
      name: '',
      loc: '',
      desc: ''
    });
  };

  return (
    <section id="home" className="hero">
      <motion.div 
        className="hero-left"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t('report_civic_issues')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t('fast_hackathon_demo')}
        </motion.p>

        <motion.div 
          className="actions"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <AnimatedButton onClick={() => navigate('/report')}>
            {t('report_now')}
          </AnimatedButton>
          <AnimatedButton variant="secondary" onClick={() => navigate('/issues')}>
            {t('view_issues')}
          </AnimatedButton>
        </motion.div>

        <motion.div 
          className="stats" 
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div 
            className="stat"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="num" id="statTotal">{stats.total}</div>
            <div className="lbl">{t('total')}</div>
          </motion.div>
          <motion.div 
            className="stat"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="num" id="statPending">{stats.pending}</div>
            <div className="lbl">{t('pending')}</div>
          </motion.div>
          <motion.div 
            className="stat"
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="num" id="statResolved">{stats.resolved}</div>
            <div className="lbl">{t('resolved')}</div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="cards"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.div 
            className="card"
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {t('photo_evidence')}
          </motion.div>
          <motion.div 
            className="card"
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {t('map_pins')}
          </motion.div>
          <motion.div 
            className="card"
            whileHover={{ y: -10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {t('live_stats')}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="hero-right"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="panel">
          <strong>{t('quick_report')}</strong>
          <form id="quickForm" style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }} onSubmit={handleQuickSubmit}>
            <input 
              id="qName" 
              type="text" 
              placeholder={t('your_name')} 
              value={quickReport.name}
              onChange={(e) => setQuickReport({...quickReport, name: e.target.value})}
            />
            <input 
              id="qLoc" 
              type="text" 
              placeholder={t('location_optional')} 
              value={quickReport.loc}
              onChange={(e) => setQuickReport({...quickReport, loc: e.target.value})}
            />
            <textarea 
              id="qDesc" 
              placeholder={t('short_description')}
              value={quickReport.desc}
              onChange={(e) => setQuickReport({...quickReport, desc: e.target.value})}
            ></textarea>
            <div style={{ display: 'flex', gap: '8px' }}>
              <AnimatedButton type="submit" size="small">
                {t('quick_submit')}
              </AnimatedButton>
              <AnimatedButton 
                type="button" 
                variant="secondary" 
                size="small" 
                onClick={() => navigate('/report')}
              >
                {t('full_form')}
              </AnimatedButton>
            </div>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Home;