import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons for different categories
const getCategoryIcon = (category, status) => {
  // Special handling for current location marker
  if (category === 'Current Location') {
    return L.divIcon({
      className: 'current-location-icon',
      html: `
        <div style="
          background: #228b22;
          border: 2px solid white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          color: white;
          font-weight: bold;
          font-size: 16px;
        ">
          ⚪
        </div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  }
  
  const color = status === 'resolved' ? 'green' : '#3388ff';
  
  return L.divIcon({
    className: 'custom-icon',
    html: `
      <div style="
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">
        ${category ? category.charAt(0) : 'R'}
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const MapPreview = ({ reports = [], onMapClick = null }) => {
  // Default center for India
  const defaultCenter = [20.5937, 78.9629];
  const defaultZoom = 5;

  // Calculate center based on reports or use default
  const getMapCenter = () => {
    if (reports && reports.length > 0) {
      // Calculate average position of reports
      const validReports = reports.filter(r => r.lat && r.lng);
      if (validReports.length > 0) {
        const avgLat = validReports.reduce((sum, r) => sum + r.lat, 0) / validReports.length;
        const avgLng = validReports.reduce((sum, r) => sum + r.lng, 0) / validReports.length;
        return [avgLat, avgLng];
      }
    }
    return defaultCenter;
  };

  // Calculate appropriate zoom level
  const getMapZoom = () => {
    if (reports && reports.length > 0) {
      const validReports = reports.filter(r => r.lat && r.lng);
      if (validReports.length > 1) {
        return 12; // Zoom in when multiple reports
      } else if (validReports.length === 1) {
        return 15; // Zoom in more for single report
      }
    }
    return defaultZoom;
  };

  return (
    <MapContainer 
      center={getMapCenter()} 
      zoom={getMapZoom()} 
      className="map-container"
      style={{ height: '360px', width: '100%' }}
      whenReady={(map) => {
        if (onMapClick) {
          map.target.on('click', (e) => {
            onMapClick(e.latlng.lat, e.latlng.lng);
          });
        }
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Render markers for reports */}
      {reports && reports.map((report) => {
        // Skip reports without valid coordinates
        if (!report.lat || !report.lng) return null;
        
        return (
          <Marker
            key={report.id}
            position={[report.lat, report.lng]}
            icon={getCategoryIcon(report.category, report.status)}
          >
            <Popup>
              <div style={{ minWidth: '200px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{report.category}</h3>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>{report.desc}</p>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {report.when && <div><strong>Reported:</strong> {report.when}</div>}
                  {report.name && <div><strong>By:</strong> {report.name}</div>}
                  {report.status && <div><strong>Status:</strong> {report.status}</div>}
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapPreview;