# 🚀 Guide de Déploiement sur Netlify

## 📋 Prérequis
- ✅ Compte GitHub (gratuit)
- ✅ Compte Netlify (gratuit)
- ✅ Application React fonctionnelle
- ✅ Node.js installé

## 🔧 Étapes de Déploiement

### **Étape 1 : Préparer le projet pour Git**

```bash
# 1. Ouvrir PowerShell dans le dossier du projet
cd "C:\Users\lucas\ecoles-montreal-app\ecoles-montreal-app"

# 2. Initialiser Git
git init

# 3. Ajouter tous les fichiers
git add .

# 4. Premier commit
git commit -m "Initial commit: Application écoles de Montréal avec recherche floue"
```

### **Étape 2 : Créer un repository GitHub**

1. **Aller sur [GitHub.com](https://github.com)**
2. **Cliquer sur "New repository"**
3. **Nom du repository** : `ecoles-montreal-app`
4. **Description** : "Application de recherche d'écoles de Montréal avec 635 écoles"
5. **Public** (gratuit)
6. **Ne pas cocher** "Add README" (on en a déjà un)
7. **Cliquer "Create repository"**

### **Étape 3 : Connecter le projet local à GitHub**

```bash
# Ajouter l'origine GitHub (remplacer VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/ecoles-montreal-app.git

# Pousser le code vers GitHub
git branch -M main
git push -u origin main
```

### **Étape 4 : Déployer sur Netlify**

1. **Aller sur [Netlify.com](https://netlify.com)**
2. **Cliquer "Sign up"** → **"Sign up with GitHub"**
3. **Autoriser Netlify** à accéder à vos repositories
4. **Cliquer "New site from Git"**
5. **Choisir "GitHub"**
6. **Sélectionner** `ecoles-montreal-app`
7. **Configurer les paramètres de build** :
   - **Branch to deploy** : `main`
   - **Build command** : `npm run build`
   - **Publish directory** : `build`
8. **Cliquer "Deploy site"**

### **Étape 5 : Configuration avancée (optionnel)**

Dans les paramètres du site Netlify :

1. **Site settings** → **Build & deploy**
2. **Environment variables** (si nécessaire) :
   - `NODE_VERSION` = `18`
   - `NPM_VERSION` = `9`

### **Étape 6 : Personnaliser l'URL**

1. **Site settings** → **General**
2. **Site name** : `ecoles-montreal-montreal` (ou votre choix)
3. **Custom domain** : Votre URL sera `https://ecoles-montreal-montreal.netlify.app`

## 🎯 **Résultat Final**

Votre application sera accessible à :
**https://votre-nom-de-site.netlify.app**

## 🔄 **Mises à jour futures**

Pour mettre à jour l'application :

```bash
# 1. Modifier le code localement
# 2. Ajouter les changements
git add .

# 3. Commiter les changements
git commit -m "Description des changements"

# 4. Pousser vers GitHub
git push

# 5. Netlify redéploiera automatiquement !
```

## 🛠️ **Fonctionnalités après déploiement**

- ✅ **635 écoles** du CSSDM
- ✅ **Recherche floue** (tolère les fautes de frappe)
- ✅ **Deux barres de recherche** (nom + adresse)
- ✅ **Recherche vocale** (fonctionne avec HTTPS)
- ✅ **Carte interactive** (fonctionne avec HTTPS)
- ✅ **Interface responsive** (mobile + desktop)

## 🚨 **Dépannage**

### **Problème : Build échoue**
- Vérifier que `npm run build` fonctionne localement
- Vérifier les variables d'environnement

### **Problème : Carte ne fonctionne pas**
- Normal en local, fonctionne sur Netlify (HTTPS requis)

### **Problème : Recherche vocale ne fonctionne pas**
- Normal en local, fonctionne sur Netlify (HTTPS requis)

## 📱 **Test sur mobile**

Une fois déployé, testez sur votre téléphone :
1. **Ouvrir l'URL Netlify** sur votre téléphone
2. **Tester la recherche** avec des fautes de frappe
3. **Tester la recherche vocale**
4. **Tester la carte**

## 🎉 **Félicitations !**

Votre application des écoles de Montréal est maintenant accessible partout dans le monde ! 🌍
