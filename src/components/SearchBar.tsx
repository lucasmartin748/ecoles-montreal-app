import React from 'react';
import { Mic, X, MapPin, School } from 'lucide-react';

interface SearchBarProps {
  nameQuery: string;
  setNameQuery: (query: string) => void;
  addressQuery: string;
  setAddressQuery: (query: string) => void;
  isListening: boolean;
  startListening: () => void;
  clearSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  nameQuery,
  setNameQuery,
  addressQuery,
  setAddressQuery,
  isListening,
  startListening,
  clearSearch
}) => {
  return (
    <div className="search-bar">
      <div className="dual-search-container">
        {/* Recherche par nom d'école */}
        <div className="search-input-container">
          <School className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Nom de l'école (ex: Saint-Louis, Pierre-Dupuy)..."
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            className="search-input"
          />
          {nameQuery && (
            <button
              onClick={() => setNameQuery('')}
              className="clear-button"
              title="Effacer la recherche par nom"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Recherche par adresse */}
        <div className="search-input-container">
          <MapPin className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Adresse, rue, district (ex: Saint-Denis, Plateau)..."
            value={addressQuery}
            onChange={(e) => setAddressQuery(e.target.value)}
            className="search-input"
          />
          {addressQuery && (
            <button
              onClick={() => setAddressQuery('')}
              className="clear-button"
              title="Effacer la recherche par adresse"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="search-actions">
          <button
            onClick={startListening}
            className={`voice-button ${isListening ? 'listening' : ''}`}
            title="Recherche vocale (nom d'école)"
            disabled={isListening}
          >
            <Mic size={20} />
          </button>
          {(nameQuery || addressQuery) && (
            <button
              onClick={clearSearch}
              className="clear-all-button"
              title="Effacer toutes les recherches"
            >
              <X size={16} />
              Tout effacer
            </button>
          )}
        </div>
      </div>
      
      {isListening && (
        <div className="listening-indicator">
          <div className="pulse"></div>
          <span>Écoute en cours... (recherche par nom d'école)</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
