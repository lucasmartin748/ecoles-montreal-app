import React from 'react';
import { Filter } from 'lucide-react';
import { Filters as FiltersType } from '../types';

interface FiltersProps {
  filters: FiltersType;
  setFilters: (filters: FiltersType) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const niveauOptions = ['primaire', 'secondaire', 'primaire-secondaire'];
  const typeOptions = ['public', 'privé'];
  const districtOptions = [
    'Plateau-Mont-Royal',
    'Outremont',
    'Ville-Marie',
    'Rosemont-La Petite-Patrie'
  ];
  const programmeOptions = [
    'Programme régulier',
    'Sport-études',
    'Arts-études',
    'Sciences-études',
    'Bilingue'
  ];

  const handleFilterChange = (
    category: keyof FiltersType,
    value: string,
    checked: boolean
  ) => {
    setFilters({
      ...filters,
      [category]: checked
        ? [...filters[category], value]
        : filters[category].filter(item => item !== value)
    });
  };

  const clearAllFilters = () => {
    setFilters({
      niveau: [],
      type: [],
      district: [],
      programmes: []
    });
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

  return (
    <div className="filters">
      <div className="filters-header">
        <Filter size={18} />
        <span>Filtres</span>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="clear-filters">
            Effacer tout
          </button>
        )}
      </div>

      <div className="filters-content">
        <div className="filter-group">
          <label>Niveau</label>
          <div className="filter-options">
            {niveauOptions.map(option => (
              <label key={option} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.niveau.includes(option)}
                  onChange={(e) => handleFilterChange('niveau', option, e.target.checked)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Type</label>
          <div className="filter-options">
            {typeOptions.map(option => (
              <label key={option} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.type.includes(option)}
                  onChange={(e) => handleFilterChange('type', option, e.target.checked)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>District</label>
          <div className="filter-options">
            {districtOptions.map(option => (
              <label key={option} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.district.includes(option)}
                  onChange={(e) => handleFilterChange('district', option, e.target.checked)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Programmes</label>
          <div className="filter-options">
            {programmeOptions.map(option => (
              <label key={option} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.programmes.includes(option)}
                  onChange={(e) => handleFilterChange('programmes', option, e.target.checked)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
