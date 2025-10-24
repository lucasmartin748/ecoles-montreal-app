import { useState, useMemo } from 'react';
import { Ecole, SearchResult } from '../types';

// Fonction pour calculer la distance de Levenshtein (similarité entre deux chaînes)
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Fonction pour calculer la similarité entre deux chaînes (0 = identique, 1 = complètement différent)
function calculateSimilarity(str1: string, str2: string): number {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  const maxLength = Math.max(str1.length, str2.length);
  return distance / maxLength;
}

// Fonction pour vérifier si une chaîne contient une sous-chaîne avec tolérance aux fautes
function fuzzyMatch(text: string, query: string, threshold: number = 0.3): boolean {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();
  
  // Recherche exacte d'abord
  if (textLower.includes(queryLower)) {
    return true;
  }
  
  // Recherche par mots
  const queryWords = queryLower.split(' ');
  const textWords = textLower.split(' ');
  
  // Vérifier si tous les mots de la requête ont une correspondance floue
  return queryWords.every(queryWord => 
    textWords.some(textWord => 
      calculateSimilarity(textWord, queryWord) <= threshold
    )
  );
}

export const useSearch = (ecoles: Ecole[]) => {
  const [nameQuery, setNameQuery] = useState('');
  const [addressQuery, setAddressQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const searchResults = useMemo(() => {
    let filteredEcoles = ecoles;

    // Filtrage par nom d'école avec recherche floue
    if (nameQuery.trim()) {
      filteredEcoles = filteredEcoles.filter(ecole => {
        return fuzzyMatch(ecole.nom, nameQuery, 0.3);
      });
    }

    // Filtrage par adresse avec recherche floue
    if (addressQuery.trim()) {
      filteredEcoles = filteredEcoles.filter(ecole => {
        const addressText = [
          ecole.adresse,
          ecole.ville,
          ecole.district
        ].join(' ');
        return fuzzyMatch(addressText, addressQuery, 0.3);
      });
    }

    // Calcul du score de pertinence
    const results: SearchResult[] = filteredEcoles.map(ecole => {
      let score = 0;
      
      if (nameQuery.trim()) {
        const schoolName = ecole.nom;
        const similarity = 1 - calculateSimilarity(schoolName, nameQuery);
        score += similarity * 3; // Score plus élevé pour le nom avec bonus de similarité
      }
      
      if (addressQuery.trim()) {
        const addressText = [ecole.adresse, ecole.ville, ecole.district].join(' ');
        const similarity = 1 - calculateSimilarity(addressText, addressQuery);
        score += similarity * 2; // Score pour l'adresse avec bonus de similarité
      }
      
      if (!nameQuery.trim() && !addressQuery.trim()) {
        score = 1; // Score par défaut si pas de recherche
      }

      return { item: ecole, score };
    });

    // Tri par score décroissant
    return results.sort((a, b) => b.score - a.score);
  }, [ecoles, nameQuery, addressQuery]);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'fr-CA';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setNameQuery(transcript);
      };
      recognition.onerror = () => setIsListening(false);
      
      recognition.start();
    }
  };

  const clearSearch = () => {
    setNameQuery('');
    setAddressQuery('');
  };

  return {
    nameQuery,
    setNameQuery,
    addressQuery,
    setAddressQuery,
    searchResults,
    isListening,
    startListening,
    clearSearch
  };
};
