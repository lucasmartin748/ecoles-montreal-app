import React from 'react';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Ecole } from '../types';

interface SchoolListProps {
  ecoles: Ecole[];
  selectedEcole?: Ecole;
  onEcoleSelect: (ecole: Ecole) => void;
}

const SchoolList: React.FC<SchoolListProps> = ({
  ecoles,
  selectedEcole,
  onEcoleSelect
}) => {
  if (ecoles.length === 0) {
    return (
      <div className="no-results">
        <p>Aucune école trouvée pour vos critères de recherche.</p>
      </div>
    );
  }

  return (
    <div className="school-list">
      {ecoles.map(ecole => (
        <div
          key={ecole.id}
          className={`school-card ${selectedEcole?.id === ecole.id ? 'selected' : ''}`}
          onClick={() => onEcoleSelect(ecole)}
        >
          <div className="school-header">
            <h3 className="school-name">{ecole.nom}</h3>
            <div className="school-badges">
              <span className={`badge niveau ${ecole.niveau}`}>
                {ecole.niveau}
              </span>
              <span className={`badge type ${ecole.type}`}>
                {ecole.type}
              </span>
            </div>
          </div>

          <div className="school-info">
            <div className="info-item">
              <MapPin size={16} />
              <span>{ecole.adresse}, {ecole.ville} {ecole.codePostal}</span>
            </div>
            
            <div className="info-item">
              <Phone size={16} />
              <span>{ecole.telephone}</span>
            </div>

            {ecole.email && (
              <div className="info-item">
                <Mail size={16} />
                <span>{ecole.email}</span>
              </div>
            )}

            {ecole.siteWeb && (
              <div className="info-item">
                <Globe size={16} />
                <a href={ecole.siteWeb} target="_blank" rel="noopener noreferrer">
                  Site web
                </a>
              </div>
            )}
          </div>

          <div className="school-details">
            <div className="district">
              <strong>District:</strong> {ecole.district}
            </div>

            {ecole.programmes && ecole.programmes.length > 0 && (
              <div className="programmes">
                <strong>Programmes:</strong>
                <div className="programme-tags">
                  {ecole.programmes.map((programme, index) => (
                    <span key={index} className="programme-tag">
                      {programme}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {ecole.services && ecole.services.length > 0 && (
              <div className="services">
                <strong>Services:</strong>
                <div className="service-tags">
                  {ecole.services.map((service, index) => (
                    <span key={index} className="service-tag">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {ecole.description && (
              <div className="description">
                <p>{ecole.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SchoolList;
