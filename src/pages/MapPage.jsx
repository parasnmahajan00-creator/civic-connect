import { useState, useEffect } from 'react';
import MapPreview from '../components/MapPreview';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const MapPage = ({ reports }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapReports, setMapReports] = useState(reports);
  const { t } = useTranslation();

  useEffect(() => {
    setMapReports(reports);
  }, [reports]);

  const handleMapClick = (lat, lng) => {
    // In a full implementation, this would allow users to add a marker at the clicked location
    // For now, we'll just show coordinates in an alert
    alert(`Selected location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    setSelectedLocation({ lat, lng });
  };

  return (
    <section id="map" className="panel">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {t('issue_map')}
      </motion.h2>
      
      <motion.div 
        style={{ marginBottom: '12px', padding: '12px', background: 'var(--card)', borderRadius: '10px', border: '1px solid var(--glass)' }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <p style={{ margin: 0, color: 'var(--muted)' }}>
          <i className="fa-solid fa-info-circle"></i> {t('click_on_map_select')}
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <MapPreview 
          reports={mapReports} 
          onMapClick={handleMapClick}
        />
      </motion.div>
      
      <motion.div 
        style={{ 
          display: 'flex', 
          gap: '10px', 
          marginTop: '12px', 
          flexWrap: 'wrap',
          padding: '12px',
          background: 'var(--card)',
          borderRadius: '10px',
          border: '1px solid var(--glass)'
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            borderRadius: '50%', 
            backgroundColor: '#3388ff',
            border: '2px solid white'
          }}></div>
          <span style={{ fontSize: '0.9rem' }}>{t('pending')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            borderRadius: '50%', 
            backgroundColor: 'green',
            border: '2px solid white'
          }}></div>
          <span style={{ fontSize: '0.9rem' }}>{t('resolved')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ 
            width: '16px', 
            height: '16px', 
            borderRadius: '50%', 
            backgroundColor: '#3388ff',
            border: '2px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '10px'
          }}>P</div>
          <span style={{ fontSize: '0.9rem' }}>{t('pothole')}</span>
        </div>
      </motion.div>
    </section>
  );
};

export default MapPage;