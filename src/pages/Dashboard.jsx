import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = ({ reports }) => {
  const statusChartRef = useRef();
  const categoryChartRef = useRef();
  const { t } = useTranslation();

  // Calculate statistics
  const total = reports.length;
  const pending = reports.filter(r => r.status === 'pending').length;
  const resolved = reports.filter(r => r.status === 'resolved').length;
  
  // Calculate category distribution
  const categoryCounts = {};
  reports.forEach(r => {
    categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
  });
  
  // Calculate urgency distribution
  const urgencyCounts = {
    low: reports.filter(r => r.urgency === 'low').length,
    medium: reports.filter(r => r.urgency === 'medium').length,
    high: reports.filter(r => r.urgency === 'high').length
  };

  // Prepare data for status chart with animation
  const statusData = {
    labels: [t('pending'), t('resolved')],
    datasets: [
      {
        data: [pending, resolved],
        backgroundColor: [
          getComputedStyle(document.documentElement).getPropertyValue('--warn').trim() || '#ff9800',
          getComputedStyle(document.documentElement).getPropertyValue('--green').trim() || '#228b22',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Prepare data for category chart
  const categoryData = {
    labels: Object.keys(categoryCounts).map(cat => t(cat.toLowerCase())),
    datasets: [
      {
        label: t('reports'),
        data: Object.values(categoryCounts),
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--header').trim() || '#001f54',
      },
    ],
  };

  const categoryOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t('issues_by_category')
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0
        }
      }
    },
    maintainAspectRatio: false,
  };

  // Prepare data for urgency chart
  const urgencyData = {
    labels: [t('low'), t('medium'), t('high')],
    datasets: [
      {
        label: t('reports'),
        data: [urgencyCounts.low, urgencyCounts.medium, urgencyCounts.high],
        backgroundColor: [
          '#4caf50',  // green
          '#ff9800',  // orange
          '#f44336'   // red
        ],
      },
    ],
  };

  const urgencyOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: t('issues_by_urgency')
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <section id="dashboard" className="panel">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {t('dashboard')}
      </motion.h2>
      
      {/* Stats Summary */}
      <motion.div 
        className="stats" 
        style={{ marginTop: '20px' }} 
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <motion.div 
          className="stat"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div 
            className="num"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            {total}
          </motion.div>
          <div className="lbl">{t('total')}</div>
        </motion.div>
        <motion.div 
          className="stat"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div 
            className="num"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            {pending}
          </motion.div>
          <div className="lbl">{t('pending')}</div>
        </motion.div>
        <motion.div 
          className="stat"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div 
            className="num"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          >
            {resolved}
          </motion.div>
          <div className="lbl">{t('resolved')}</div>
        </motion.div>
        <motion.div 
          className="stat"
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.div 
            className="num"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          >
            {total > 0 ? Math.round((resolved/total)*100) : 0}%
          </motion.div>
          <div className="lbl">{t('resolved_rate')}</div>
        </motion.div>
      </motion.div>
      
      {/* Charts */}
      <motion.div 
        className="charts"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <motion.div 
          className="chart-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{t('issue_status')}</h3>
          <Doughnut data={statusData} />
        </motion.div>
        <motion.div 
          className="chart-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{t('issues_by_category')}</h3>
          <Bar data={categoryData} options={categoryOptions} />
        </motion.div>
        <motion.div 
          className="chart-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>{t('issues_by_urgency')}</h3>
          <Bar data={urgencyData} options={urgencyOptions} />
        </motion.div>
      </motion.div>
      
      {/* Additional Info */}
      <motion.div 
        style={{ 
          marginTop: '20px', 
          padding: '16px', 
          background: 'var(--card)', 
          borderRadius: '12px', 
          border: '1px solid var(--glass)' 
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <h3 style={{ margin: '0 0 12px 0' }}>{t('summary')}</h3>
        <p style={{ margin: 0, color: 'var(--muted)' }}>
          {t('you_have_total')} {total} {t('total_reports')} {pending} {t('pending_and')} {resolved} {t('resolved_issues')} {Object.keys(categoryCounts).sort((a,b) => categoryCounts[b] - categoryCounts[a])[0] || 'N/A'}.
        </p>
      </motion.div>
    </section>
  );
};

export default Dashboard;