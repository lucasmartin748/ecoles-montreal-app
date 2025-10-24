export interface Ecole {
  id: string;
  nom: string;
  adresse: string;
  ville: string;
  codePostal: string;
  telephone: string;
  email?: string;
  siteWeb?: string;
  latitude: number;
  longitude: number;
  niveau: 'primaire' | 'secondaire' | 'primaire-secondaire';
  type: 'public' | 'privé';
  district: string;
  programmes?: string[];
  services?: string[];
  description?: string;
}

export interface SearchResult {
  item: Ecole;
  score: number;
}

export interface Filters {
  niveau: string[];
  type: string[];
  district: string[];
  programmes: string[];
}
