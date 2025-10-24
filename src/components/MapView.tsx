import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Ecole } from '../types';

interface MapViewProps {
  ecoles: Ecole[];
  selectedEcole?: Ecole;
  onEcoleSelect: (ecole: Ecole) => void;
}

const MapView: React.FC<MapViewProps> = ({
  ecoles,
  selectedEcole,
  onEcoleSelect
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Initialiser la carte avec Leaflet
    const initMap = () => {
      if (!mapRef.current) return;

      // Centre de Montréal
      const montrealCenter = [45.5088, -73.5878];
      
      // Créer la carte
      const map = (window as any).L.map(mapRef.current).setView(montrealCenter, 11);
      mapInstanceRef.current = map;

      // Ajouter les tuiles OpenStreetMap
      (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      // Ajouter les marqueurs pour chaque école
      markersRef.current = ecoles.map(ecole => {
        const marker = (window as any).L.marker([ecole.latitude, ecole.longitude])
          .addTo(map)
          .bindPopup(`
            <div class="map-popup">
              <h3>${ecole.nom}</h3>
              <p><strong>Niveau:</strong> ${ecole.niveau}</p>
              <p><strong>Type:</strong> ${ecole.type}</p>
              <p><strong>District:</strong> ${ecole.district}</p>
              <p><strong>Adresse:</strong> ${ecole.adresse}</p>
              <p><strong>Téléphone:</strong> ${ecole.telephone}</p>
              ${ecole.programmes ? `<p><strong>Programmes:</strong> ${ecole.programmes.join(', ')}</p>` : ''}
            </div>
          `)
          .on('click', () => onEcoleSelect(ecole));

        return marker;
      });
    };

    // Charger Leaflet si pas déjà chargé
    if (!(window as any).L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [ecoles, onEcoleSelect]);

  // Mettre à jour la sélection
  useEffect(() => {
    if (selectedEcole && mapInstanceRef.current) {
      mapInstanceRef.current.setView([selectedEcole.latitude, selectedEcole.longitude], 15);
    }
  }, [selectedEcole]);

  if (ecoles.length === 0) {
    return (
      <div className="no-results">
        <p>Aucune école trouvée pour vos critères de recherche.</p>
      </div>
    );
  }

  return (
    <div className="map-container">
      <div ref={mapRef} className="map" />
      <div className="map-legend">
        <div className="legend-item">
          <MapPin size={16} />
          <span>Écoles trouvées: {ecoles.length}</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
