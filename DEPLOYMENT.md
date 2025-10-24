# 🚀 Déploiement sur Netlify

## 📋 Prérequis
- Compte GitHub
- Compte Netlify
- Application React fonctionnelle

## 🔧 Étapes de déploiement

### 1. Préparer le projet pour Git
```bash
git init
git add .
git commit -m "Initial commit: Application écoles de Montréal"
```

### 2. Créer un repository GitHub
1. Aller sur [GitHub.com](https://github.com)
2. Créer un nouveau repository public
3. Suivre les instructions pour pousser le code

### 3. Déployer sur Netlify
1. Aller sur [Netlify.com](https://netlify.com)
2. Se connecter avec GitHub
3. Cliquer sur "New site from Git"
4. Sélectionner le repository GitHub
5. Configurer les paramètres de build :
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Node version**: `18` (dans les variables d'environnement)

### 4. Configuration pour la carte
La carte ne fonctionne pas en local car elle nécessite HTTPS. Sur Netlify, elle fonctionnera parfaitement car :
- Netlify fournit HTTPS automatiquement
- L'API de géolocalisation fonctionne avec HTTPS
- Leaflet peut charger les tuiles de carte

### 5. Variables d'environnement (optionnel)
Si vous voulez ajouter des variables d'environnement :
- `REACT_APP_API_URL`: URL de l'API (si vous en avez une)
- `REACT_APP_MAP_API_KEY`: Clé API pour les cartes (optionnel)

## 🎯 Fonctionnalités après déploiement
- ✅ Recherche intelligente dans 50+ écoles
- ✅ Recherche vocale (HTTPS requis)
- ✅ Vue carte interactive (fonctionne sur Netlify)
- ✅ Vue liste détaillée
- ✅ Interface responsive

## 📱 Accès mobile
Une fois déployé, l'application sera accessible sur tous les appareils via l'URL Netlify.

## 🔄 Mises à jour
Pour mettre à jour l'application :
1. Modifier le code localement
2. `git add .`
3. `git commit -m "Update"`
4. `git push`
5. Netlify redéploiera automatiquement

## 📊 Données des écoles
Les données sont actuellement dans `src/data/ecoles.json`. Pour ajouter les vraies 635 écoles du CSSDM, vous devrez :
1. Récupérer les données depuis le site CSSDM
2. Les formater selon le modèle dans `types.ts`
3. Les ajouter au fichier JSON

## 🎉 Résultat final
Votre application sera accessible partout via une URL Netlify comme :
`https://votre-app-ecoles-montreal.netlify.app`
