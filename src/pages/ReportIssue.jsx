import { useState, useRef } from 'react';
import MapPreview from '../components/MapPreview';
import { useTranslation } from 'react-i18next';

const ReportIssue = ({ addReport }) => {
  const [report, setReport] = useState({
    name: '',
    category: '',
    urgency: 'medium',
    location: '',
    description: '',
  });
  
  const [photoPreview, setPhotoPreview] = useState('');
  const [locStatus, setLocStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const fileInputRef = useRef(null);
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert(t('invalid_file'));
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(t('file_size_exceeds'));
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview('');
    }
  };

  const resetForm = () => {
    setReport({
      name: '',
      category: '',
      urgency: 'medium',
      location: '',
      description: '',
    });
    setPhotoPreview('');
    setLocStatus('');
    setErrors([]);
    setCoordinates({ lat: null, lng: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getCurrentPosition = (timeout = 10000) => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error(t('location_not_supported')));
      }
      
      const timer = setTimeout(() => {
        reject(new Error(t('location_timeout')));
      }, timeout);
      
      navigator.geolocation.getCurrentPosition(
        pos => {
          clearTimeout(timer);
          resolve(pos);
        },
        err => {
          clearTimeout(timer);
          switch (err.code) {
            case err.PERMISSION_DENIED:
              reject(new Error(t('location_access_denied')));
              break;
            case err.POSITION_UNAVAILABLE:
              reject(new Error(t('location_unavailable')));
              break;
            case err.TIMEOUT:
              reject(new Error(t('location_timeout')));
              break;
            default:
              reject(new Error(t('location_not_supported')));
              break;
          }
        },
        { 
          enableHighAccuracy: true, 
          timeout,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  };

  // Reverse geocoding function using OpenStreetMap Nominatim
  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error(t('address_fetch_failed'));
      }
      
      const data = await response.json();
      return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  const handleMapClick = async (lat, lng) => {
    setCoordinates({ lat, lng });
    try {
      const address = await reverseGeocode(lat, lng);
      setReport(prev => ({ ...prev, location: address }));
      setLocStatus(t('location_captured_short'));
    } catch (err) {
      setCoordinates({ lat, lng });
      setLocStatus(t('address_fetch_failed'));
    }
    setTimeout(() => setLocStatus(''), 3000);
  };

  const handleGeoLocation = async () => {
    if (loading) return;
    
    setLoading(true);
    setLocStatus(t('getting_location'));
    
    try {
      const pos = await getCurrentPosition(10000);
      const { latitude, longitude } = pos.coords;
      
      setCoordinates({ lat: latitude, lng: longitude });
      
      const address = await reverseGeocode(latitude, longitude);
      
      setReport(prev => ({ ...prev, location: address }));
      setLocStatus(t('location_captured'));
    } catch (err) {
      setLocStatus(err.message || t('unable_to_fetch_location'));
      setErrors(prev => [...prev, err.message || t('unable_to_fetch_location')]);
    } finally {
      setLoading(false);
      setTimeout(() => setLocStatus(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors([]);
    
    // Form validation
    const newErrors = [];
    if (!report.description.trim()) {
      newErrors.push(t('description_required'));
    }
    
    if (!report.category) {
      newErrors.push(t('category_required'));
    }
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      // If user didn't type location and we don't have coordinates, try geolocation
      let lat = coordinates.lat;
      let lng = coordinates.lng;
      let finalLocation = report.location;
      
      if (!report.location && !coordinates.lat && !coordinates.lng && navigator.geolocation) {
        try {
          const pos = await getCurrentPosition(8000);
          lat = pos.coords.latitude;
          lng = pos.coords.longitude;
          finalLocation = await reverseGeocode(lat, lng);
        } catch (err) {
          console.error('Automatic geolocation failed:', err);
        }
      }
      
      const newReport = {
        name: report.name || 'Anonymous',
        category: report.category || 'Other',
        urgency: report.urgency,
        loc: finalLocation || report.location || 'Location not specified',
        desc: report.description,
        photo: photoPreview,
        lat: lat || coordinates.lat,
        lng: lng || coordinates.lng
      };
      
      addReport(newReport);
      resetForm();
    } catch (error) {
      console.error('Error submitting report:', error);
      setErrors(prev => [...prev, t('submit_failed')]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="report" className="panel">
      <h2>{t('report_an_issue')}</h2>
      
      {/* Error messages */}
      {errors.length > 0 && (
        <div style={{ 
          background: 'var(--danger)', 
          color: 'white', 
          padding: '12px', 
          borderRadius: '10px', 
          marginBottom: '16px'
        }}>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="form-grid">
        <form id="issueForm" aria-label="Report form" onSubmit={handleSubmit}>
          <label htmlFor="name">{t('your_name')}</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Aisha"
            value={report.name}
            onChange={handleChange}
            disabled={loading}
          />

          <div className="row">
            <div className="col">
              <label htmlFor="category">{t('category')} <span style={{ color: 'var(--danger)' }}>*</span></label>
              <select
                id="category"
                name="category"
                value={report.category}
                onChange={handleChange}
                disabled={loading}
                required
              >
                <option value="">{t('select_category')}</option>
                <option>{t('pothole')}</option>
                <option>{t('streetlight')}</option>
                <option>{t('garbage')}</option>
                <option>{t('water')}</option>
                <option>{t('sewage')}</option>
                <option>{t('other')}</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="urgency">{t('urgency')}</label>
              <select
                id="urgency"
                name="urgency"
                value={report.urgency}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="low">{t('low')}</option>
                <option value="medium">{t('medium')}</option>
                <option value="high">{t('high')}</option>
              </select>
            </div>
          </div>

          <label htmlFor="location">{t('location')}</label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder={t('click_on_map')}
            value={report.location}
            onChange={handleChange}
            disabled={loading}
          />

          <label htmlFor="description">{t('describe_the_issue')} <span style={{ color: 'var(--danger)' }}>*</span></label>
          <textarea
            id="description"
            name="description"
            placeholder={t('what_happened')}
            value={report.description}
            onChange={handleChange}
            required
            disabled={loading}
          ></textarea>

          <label htmlFor="photo">{t('photo_jpg_png')}</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={fileInputRef}
            disabled={loading}
          />
          
          {photoPreview && (
            <div id="previewWrap" className="upload-preview">
              <img id="previewImg" className="thumb" src={photoPreview} alt="preview" />
              <div style={{ color: 'var(--muted)', fontSize: '.9rem' }}>Preview</div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '8px' }}>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? t('locating') : t('submit_report')}
            </button>
            <button type="button" className="btn ghost" onClick={resetForm} disabled={loading}>
              {t('reset')}
            </button>
            <button 
              type="button" 
              className="btn ghost small" 
              onClick={handleGeoLocation}
              disabled={loading}
              style={{ marginLeft: 'auto' }}
            >
              <i className={`fa-solid ${loading ? 'fa-spinner fa-spin' : 'fa-location-crosshairs'}`}></i>
              {loading ? ` ${t('locating')}` : ` ${t('get_location')}`}
            </button>
            <div id="locStatus" style={{ color: 'var(--muted)', fontSize: '.9rem' }}>
              {locStatus}
            </div>
          </div>
        </form>

        <div>
          <div style={{ fontWeight: '700', marginBottom: '8px' }}>{t('map')}</div>
          <MapPreview 
            reports={coordinates.lat && coordinates.lng ? [
              {
                id: 'current-location',
                lat: coordinates.lat,
                lng: coordinates.lng,
                category: t('current_location'),
                status: 'pending',
                desc: t('your_current_location'),
                when: new Date().toLocaleString(),
                name: t('you')
              }
            ] : []}
            onMapClick={handleMapClick}
          />
          <div style={{ color: 'var(--muted)', fontSize: '.9rem', marginTop: '8px' }}>
            {coordinates.lat && coordinates.lng 
              ? `${t('location_captured')}: ${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}` 
              : t('click_on_map_select')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportIssue;