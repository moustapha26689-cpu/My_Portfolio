# 📁 Guide de placement des fichiers média

Ce guide vous explique où placer vos images, vidéos et documents PDF dans le projet.

## 📂 Structure des dossiers

```
public/
└── media/
    ├── experiences/          # Images et vidéos des stages/expériences
    ├── certifications/       # Images des certificats
    ├── volunteer/            # Images du bénévolat/engagement
    └── attestations/         # Attestations de stage (PDF ou images)
```

## 🖼️ Images des expériences professionnelles

**Dossier :** `public/media/experiences/`

**Exemples :**
- `public/media/experiences/fidu-soumaya-1.jpg`
- `public/media/experiences/fidu-soumaya-2.jpg`
- `public/media/experiences/tresorerie-generale-1.jpg`

**Dans `messages/fr/common.json` :**
```json
{
  "title": "Assistant-comptable",
  "images": [
    "/media/experiences/fidu-soumaya-1.jpg",
    "/media/experiences/fidu-soumaya-2.jpg"
  ]
}
```

## 📄 Attestations de stage

**Dossier :** `public/media/attestations/`

**Options :**
1. **PDF** : `public/media/attestations/attestation-fidu-soumaya.pdf`
2. **Image** : `public/media/attestations/attestation-fidu-soumaya.jpg`

**Dans `messages/fr/common.json` :**
```json
{
  "title": "Assistant-comptable",
  "attestationUrl": "/media/attestations/attestation-fidu-soumaya.pdf",
  "attestationImage": "/media/attestations/attestation-fidu-soumaya.jpg"
}
```

## 🏆 Certifications

**Dossier :** `public/media/certifications/`

**Exemples :**
- `public/media/certifications/ef-set-certificate.jpg`
- `public/media/certifications/linkedin-excel-powerbi.pdf`
- `public/media/certifications/linkedin-finance.jpg`

**Dans `messages/fr/common.json` :**
```json
{
  "name": "EF SET English Certificate",
  "documentUrl": "/media/certifications/ef-set-certificate.pdf",
  "imageUrl": "/media/certifications/ef-set-certificate.jpg"
}
```

## 🤝 Engagement & Leadership (Bénévolat)

**Dossier :** `public/media/volunteer/`

**Exemples :**
- `public/media/volunteer/udei-encg-1.jpg`
- `public/media/volunteer/udei-encg-2.jpg`
- `public/media/volunteer/can-2025-volunteer.jpg`

**Dans `messages/fr/common.json` :**
```json
{
  "role": "Volontaire CAN 2025",
  "images": [
    "/media/volunteer/can-2025-volunteer-1.jpg",
    "/media/volunteer/can-2025-volunteer-2.jpg"
  ]
}
```

## 🎬 Vidéos

**Dossier :** `public/media/experiences/` ou `public/media/volunteer/`

**Exemples :**
- `public/media/experiences/presentation-stage.mp4`
- `public/media/volunteer/evenement-culturel.mp4`

**Dans `messages/fr/common.json` :**
```json
{
  "title": "Assistant-comptable",
  "images": [
    "/media/experiences/presentation-stage.mp4"
  ]
}
```

## 💡 Icônes personnalisées pour les compétences

**Option 1 : Utiliser une URL d'image en ligne**
```json
{
  "name": "Microsoft Power BI",
  "iconUrl": "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/powerbi.svg"
}
```

**Option 2 : Utiliser une image locale**
**Dossier :** `public/media/skills/`
- `public/media/skills/power-bi-icon.svg`
- `public/media/skills/excel-icon.png`

**Dans `messages/fr/common.json` :**
```json
{
  "name": "Microsoft Power BI",
  "iconUrl": "/media/skills/power-bi-icon.svg"
}
```

## 📝 Résumé des chemins

| Type de fichier | Dossier | Exemple de chemin JSON |
|----------------|---------|------------------------|
| Images d'expériences | `public/media/experiences/` | `"/media/experiences/nom-image.jpg"` |
| Attestations PDF | `public/media/attestations/` | `"/media/attestations/nom-attestation.pdf"` |
| Attestations images | `public/media/attestations/` | `"/media/attestations/nom-attestation.jpg"` |
| Certifications | `public/media/certifications/` | `"/media/certifications/nom-cert.jpg"` |
| Bénévolat | `public/media/volunteer/` | `"/media/volunteer/nom-image.jpg"` |
| Icônes compétences | `public/media/skills/` | `"/media/skills/nom-icon.svg"` |

## ⚠️ Notes importantes

1. **Tous les chemins commencent par `/media/`** (pas `/public/media/`)
2. **Les fichiers doivent être dans `public/media/`** pour être accessibles
3. **Formats supportés** : `.jpg`, `.jpeg`, `.png`, `.svg`, `.pdf`, `.mp4`, `.webm`
4. **Taille recommandée** :
   - Images : max 2MB par image
   - PDFs : max 5MB par document
   - Vidéos : max 10MB par vidéo

## 🚀 Commandes utiles

```bash
# Créer les dossiers nécessaires
mkdir -p public/media/{experiences,certifications,volunteer,attestations,skills}

# Copier vos fichiers
cp ~/Downloads/mon-image.jpg public/media/experiences/
cp ~/Downloads/mon-attestation.pdf public/media/attestations/
```

