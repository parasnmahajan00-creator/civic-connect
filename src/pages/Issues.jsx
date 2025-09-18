import { useState, useEffect } from 'react';
import AnimatedIssueCard from '../components/AnimatedIssueCard';
import { useTranslation } from 'react-i18next';

const Issues = ({ reports, toggleReportStatus, clearAllReports }) => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filteredReports, setFilteredReports] = useState(reports);
  const { t } = useTranslation();

  useEffect(() => {
    let result = [...reports];
    
    // Apply filter
    if (filter !== 'all') {
      result = result.filter(r => r.status === filter || r.category === filter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(r => 
        (r.desc + ' ' + r.loc + ' ' + r.name + ' ' + r.category)
          .toLowerCase()
          .includes(query)
      );
    }
    
    // Apply sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.when) - new Date(a.when));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.when) - new Date(b.when));
    } else if (sortBy === 'category') {
      result.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === 'status') {
      result.sort((a, b) => a.status.localeCompare(b.status));
    }
    
    setFilteredReports(result);
  }, [reports, filter, searchQuery, sortBy]);

  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(reports, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reports.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getCategoryColor = (category) => {
    const colors = {
      [t('pothole')]: '#ff6b6b',
      [t('streetlight')]: '#4ecdc4',
      [t('garbage')]: '#ffd166',
      [t('water')]: '#6a0572',
      [t('sewage')]: '#06d6a0',
      [t('other')]: '#8ac926'
    };
    return colors[category] || '#999';
  };

  return (
    <section id="issues" className="panel">
      <h2>{t('reported_issues')}</h2>

      <div className="filters">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
          <input
            id="search"
            type="text"
            placeholder={t('search_by_description')}
            style={{ padding: '10px', borderRadius: '10px', border: '1px solid var(--glass)', flex: 1, minWidth: '200px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '10px', borderRadius: '10px', border: '1px solid var(--glass)' }}
          >
            <option value="newest">{t('newest_first')}</option>
            <option value="oldest">{t('oldest_first')}</option>
            <option value="category">{t('by_category')}</option>
            <option value="status">{t('by_status')}</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div 
            className={`chip ${filter === 'all' ? 'active' : ''}`} 
            data-filter="all" 
            onClick={() => handleFilterClick('all')}
          >
            {t('all')}
          </div>
          <div 
            className={`chip ${filter === 'pending' ? 'active' : ''}`} 
            data-filter="pending" 
            onClick={() => handleFilterClick('pending')}
          >
            {t('pending')}
          </div>
          <div 
            className={`chip ${filter === 'resolved' ? 'active' : ''}`} 
            data-filter="resolved" 
            onClick={() => handleFilterClick('resolved')}
          >
            {t('resolved')}
          </div>
          <div 
            className={`chip ${filter === 'Pothole' ? 'active' : ''}`} 
            data-filter="Pothole" 
            onClick={() => handleFilterClick('Pothole')}
          >
            {t('pothole')}
          </div>
          <div 
            className={`chip ${filter === 'Streetlight' ? 'active' : ''}`} 
            data-filter="Streetlight" 
            onClick={() => handleFilterClick('Streetlight')}
          >
            {t('streetlight')}
          </div>
          <div 
            className={`chip ${filter === 'Garbage' ? 'active' : ''}`} 
            data-filter="Garbage" 
            onClick={() => handleFilterClick('Garbage')}
          >
            {t('garbage')}
          </div>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button className="btn ghost small" onClick={clearAllReports}>
            {t('clear_all')}
          </button>
          <button className="btn small" onClick={downloadJSON}>
            {t('export_json')}
          </button>
        </div>
      </div>

      <div className="issue-list" id="issueList" style={{ marginTop: '12px' }}>
        {filteredReports.length === 0 ? (
          <div style={{ color: 'var(--muted)', textAlign: 'center', padding: '32px', borderRadius: '10px', border: '1px dashed var(--glass)' }}>
            <i className="fa-solid fa-inbox" style={{ fontSize: '2rem', marginBottom: '12px' }}></i>
            <h3>{t('no_reports_found')}</h3>
            <p>{t('try_changing_filters')}</p>
          </div>
        ) : (
          filteredReports.map((report, index) => (
            <AnimatedIssueCard key={report.id} delay={index * 0.05}>
              <div className="issue-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    borderRadius: '50%', 
                    backgroundColor: getCategoryColor(report.category),
                    minWidth: '12px'
                  }}></div>
                  <div style={{ fontWeight: '800' }}>
                    {report.category}
                  </div>
                  <span style={{ fontWeight: '600', color: 'var(--muted)', fontSize: '.9rem' }}>• {report.when}</span>
                </div>
                <div style={{ marginTop: '8px' }}>{report.desc}</div>
                <div className="issue-meta">
                  <div>
                    <i className="fa-solid fa-user"></i>&nbsp; {report.name || 'Anonymous'}
                  </div>
                  <div>
                    <i className="fa-solid fa-location-dot"></i>&nbsp; {report.loc || 'N/A'}
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <span 
                      className={`status-badge ${report.status === 'resolved' ? 'status-resolved' : 'status-pending'}`} 
                      onClick={() => toggleReportStatus(report.id)}
                      title="Click to toggle status"
                    >
                      {report.status === 'resolved' ? '✅ Resolved' : '⏳ Pending'}
                    </span>
                  </div>
                </div>
              </div>
              {report.photo && (
                <img className="issue-thumb" src={report.photo} alt="Issue" />
              )}
            </AnimatedIssueCard>
          ))
        )}
      </div>
    </section>
  );
};

export default Issues;