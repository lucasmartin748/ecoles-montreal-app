import React, { useState } from 'react';
import { Map, List } from 'lucide-react';
import SearchBar from './components/SearchBar';
import SchoolList from './components/SchoolList';
import MapView from './components/MapView';
import { useSearch } from './hooks/useSearch';
import { ecoles } from './data/ecoles';
import { Ecole } from './types';
import './App.css';

function App() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedEcole, setSelectedEcole] = useState<Ecole | undefined>();
  
  const {
    nameQuery,
    setNameQuery,
    addressQuery,
    setAddressQuery,
    searchResults,
    isListening,
    startListening,
    clearSearch
  } = useSearch(ecoles);

  const handleEcoleSelect = (ecole: Ecole) => {
    setSelectedEcole(ecole);
    if (viewMode === 'list') {
      setViewMode('map');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🔍 Écoles de Montréal</h1>
          <p>Recherche intelligente pour intervenants</p>
        </div>
      </header>

      <main className="app-main">
        <div className="search-section">
          <SearchBar
            nameQuery={nameQuery}
            setNameQuery={setNameQuery}
            addressQuery={addressQuery}
            setAddressQuery={setAddressQuery}
            isListening={isListening}
            startListening={startListening}
            clearSearch={clearSearch}
          />
        </div>

        <div className="results-section">
          <div className="results-header">
            <div className="results-info">
              <h2>
                {searchResults.length} école{searchResults.length !== 1 ? 's' : ''} trouvée{searchResults.length !== 1 ? 's' : ''}
                {(nameQuery || addressQuery) && (
                  <span>
                    {nameQuery && ` pour le nom "${nameQuery}"`}
                    {nameQuery && addressQuery && ' et '}
                    {addressQuery && ` pour l'adresse "${addressQuery}"`}
                  </span>
                )}
              </h2>
            </div>
            
            <div className="view-controls">
              <button
                className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="Vue liste"
              >
                <List size={20} />
              </button>
              <button
                className={`view-button ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => setViewMode('map')}
                title="Vue carte"
              >
                <Map size={20} />
              </button>
            </div>
          </div>

          {viewMode === 'list' ? (
            <SchoolList
              ecoles={searchResults.map(result => result.item)}
              selectedEcole={selectedEcole}
              onEcoleSelect={handleEcoleSelect}
            />
          ) : (
            <MapView
              ecoles={searchResults.map(result => result.item)}
              selectedEcole={selectedEcole}
              onEcoleSelect={setSelectedEcole}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>
            Données fournies par le 
            <a 
              href="https://www.cssdm.gouv.qc.ca/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Centre de services scolaire de Montréal
            </a>
          </p>
          <div className="footer-features">
            <span>🎤 Recherche vocale</span>
            <span>🗺️ Géolocalisation</span>
            <span>🔍 Recherche intelligente</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
