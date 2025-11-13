# Guide de Déploiement sur Vercel

Ce guide vous explique comment déployer votre portfolio Next.js sur Vercel.

## 📋 Prérequis

1. Un compte GitHub, GitLab ou Bitbucket
2. Un compte Vercel (gratuit) - [vercel.com](https://vercel.com)
3. Votre projet doit être dans un dépôt Git

---

## 🚀 Méthode 1 : Déploiement via l'Interface Vercel (Recommandé)

### Étape 1 : Préparer votre projet

1. **Vérifier que tout fonctionne localement :**
   ```bash
   npm run build
   ```
   Si la commande réussit, vous êtes prêt !

2. **S'assurer que votre projet est sur Git :**
   ```bash
   git status
   ```
   Si ce n'est pas encore fait, initialisez Git :
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio ready for deployment"
   ```

### Étape 2 : Pousser votre code sur GitHub

1. **Créer un nouveau dépôt sur GitHub** (si vous n'en avez pas déjà un)
   - Allez sur [github.com](https://github.com)
   - Cliquez sur "New repository"
   - Donnez un nom (ex: `portfolio-fall`)
   - Ne cochez PAS "Initialize with README"
   - Cliquez sur "Create repository"

2. **Connecter votre projet local à GitHub :**
   ```bash
   git remote add origin https://github.com/VOTRE_USERNAME/portfolio-fall.git
   git branch -M main
   git push -u origin main
   ```

### Étape 3 : Déployer sur Vercel

1. **Se connecter à Vercel :**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Sign Up" ou "Log In"
   - Connectez-vous avec votre compte GitHub/GitLab/Bitbucket

2. **Importer votre projet :**
   - Cliquez sur "Add New..." → "Project"
   - Sélectionnez votre dépôt `portfolio-fall`
   - Cliquez sur "Import"

3. **Configurer le projet :**
   Vercel détecte automatiquement Next.js, mais vérifiez ces paramètres :
   
   - **Framework Preset** : Next.js (détecté automatiquement)
   - **Root Directory** : `./` (laisser par défaut)
   - **Build Command** : `npm run build` (détecté automatiquement)
   - **Output Directory** : `.next` (détecté automatiquement)
   - **Install Command** : `npm install` (détecté automatiquement)

4. **Variables d'environnement :**
   Pour ce projet, aucune variable d'environnement n'est nécessaire pour le moment.

5. **Cliquer sur "Deploy"**
   - Vercel va installer les dépendances, builder le projet et le déployer
   - Cela prend généralement 2-3 minutes

### Étape 4 : Vérifier le déploiement

1. **Une fois le déploiement terminé :**
   - Vous verrez un message "Congratulations!"
   - Votre site sera accessible à une URL comme : `portfolio-fall.vercel.app`

2. **Tester votre site :**
   - Visitez l'URL fournie
   - Testez les deux langues : `/fr` et `/en`
   - Vérifiez que toutes les images et médias se chargent correctement

---

## 🔧 Méthode 2 : Déploiement via CLI Vercel

### Étape 1 : Installer Vercel CLI

```bash
npm install -g vercel
```

### Étape 2 : Se connecter

```bash
vercel login
```

### Étape 3 : Déployer

Depuis le répertoire de votre projet :

```bash
vercel
```

Suivez les instructions :
- **Set up and deploy?** → `Y`
- **Which scope?** → Sélectionnez votre compte
- **Link to existing project?** → `N` (première fois)
- **What's your project's name?** → `portfolio-fall` (ou le nom que vous voulez)
- **In which directory is your code located?** → `./` (appuyez sur Entrée)

### Étape 4 : Déployer en production

```bash
vercel --prod
```

---

## ⚙️ Configuration Spécifique pour next-intl

Votre projet utilise `next-intl` avec les locales `fr` et `en`. Vercel devrait détecter automatiquement cette configuration, mais voici ce qui est important :

### ✅ Vérifications

1. **Middleware** : Votre `middleware.ts` est correctement configuré
2. **Locales** : Les locales `fr` et `en` sont définies dans `i18n.ts`
3. **Messages** : Les fichiers JSON dans `messages/fr/` et `messages/en/` sont présents

### 🔍 URLs de votre site

Une fois déployé, votre site sera accessible à :
- **Français (par défaut)** : `https://votre-site.vercel.app/fr`
- **Anglais** : `https://votre-site.vercel.app/en`
- **Redirection automatique** : `https://votre-site.vercel.app` → redirige vers `/fr`

---

## 🎨 Personnaliser le Domaine

1. **Dans le dashboard Vercel :**
   - Allez dans votre projet
   - Cliquez sur "Settings" → "Domains"
   - Ajoutez votre domaine personnalisé (ex: `portfolio.moustaphafall.com`)

2. **Configurer DNS :**
   - Suivez les instructions de Vercel pour configurer vos enregistrements DNS
   - Attendez la propagation DNS (peut prendre quelques heures)

---

## 🔄 Déploiements Automatiques

Par défaut, Vercel déploie automatiquement :
- ✅ Chaque push sur `main` → **Production**
- ✅ Chaque pull request → **Preview Deployment**

Vous pouvez voir tous les déploiements dans l'onglet "Deployments" de votre projet.

---

## 🐛 Résolution de Problèmes

### Problème : Build échoue

**Solution :**
1. Vérifiez les logs de build dans Vercel
2. Testez localement : `npm run build`
3. Vérifiez que tous les fichiers nécessaires sont commités

### Problème : Images ne se chargent pas

**Solution :**
1. Vérifiez que tous les fichiers dans `public/` sont commités
2. Utilisez des chemins relatifs commençant par `/` (ex: `/images/...`)

### Problème : Erreurs de traduction

**Solution :**
1. Vérifiez que `messages/fr/common.json` et `messages/en/common.json` existent
2. Vérifiez que tous les fichiers JSON sont valides (pas d'erreurs de syntaxe)

### Problème : Locale par défaut ne fonctionne pas

**Solution :**
1. Vérifiez votre `middleware.ts`
2. Vérifiez votre `i18n.ts` (defaultLocale doit être 'fr')

---

## 📝 Checklist Avant Déploiement

- [ ] `npm run build` fonctionne sans erreur
- [ ] Toutes les images sont dans `public/`
- [ ] Les fichiers JSON de traduction sont complets
- [ ] Le projet est sur Git
- [ ] `.gitignore` est correctement configuré
- [ ] Aucune variable d'environnement sensible dans le code

---

## 🎉 Félicitations !

Une fois déployé, votre portfolio sera accessible en ligne avec :
- ✅ Support multilingue (FR/EN)
- ✅ Déploiements automatiques
- ✅ HTTPS automatique
- ✅ CDN global pour des performances optimales
- ✅ Analytics intégrés (optionnel)

---

## 📞 Support

- Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)
- Documentation next-intl : [next-intl-docs.vercel.app](https://next-intl-docs.vercel.app)
- Support Vercel : [vercel.com/support](https://vercel.com/support)

