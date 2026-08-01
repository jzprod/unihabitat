# UNIHABITAT — Carte de visite digitale

Une page **carte de visite digitale** pour **UNIHABITAT**, agence immobilière multiservices à Casablanca.
Conçue pour être ouverte depuis un QR code placé sur une carte physique.

Elle permet, en un geste, de :

- 💬 Écrire sur **WhatsApp** (message pré-rempli en français)
- 📞 **Appeler** l'agence
- ✉️ Envoyer un **e-mail**
- 🗺️ Ouvrir l'**itinéraire** (Google Maps — Casablanca)
- 🌐 Visiter le **site web**, **Instagram**, **Facebook**
- 👤 **Enregistrer le contact** (fichier `UNIHABITAT.vcf`)
- 🔗 **Partager / copier** le lien de la carte

---

## Stack

100 % statique — **HTML + CSS + JavaScript**, sans build, sans dépendance, sans backend.
Chargement quasi instantané. Optimisé mobile.

```
index.html            La page
styles.css            Design (palette de marque, mobile-first, accessible)
app.js                vCard + partage/copie + notifications
manifest.webmanifest  Icône / thème (PWA légère)
assets/               Logo optimisé (WebP + PNG), favicons, image Open Graph
```

---

## Aperçu en local

Aucune installation. Choisissez une option :

**Option A — ouvrir directement**
Double-cliquez sur `index.html`.
_(Le téléchargement du contact et le partage fonctionnent mieux via un vrai serveur — voir option B.)_

**Option B — petit serveur local**

```bash
# Python
python -m http.server 4173
# ou Node
npx serve .
```

Puis ouvrez `http://localhost:4173`.

---

## Hébergement gratuit

La page étant statique, tout hébergeur de fichiers statiques convient. Trois options simples :

### 1. Netlify Drop (le plus rapide — glisser-déposer)
1. Allez sur **https://app.netlify.com/drop**
2. Glissez-déposez **le dossier du projet** entier.
3. Netlify fournit une URL immédiate (ex. `https://unihabitat.netlify.app`).
4. (Optionnel) Site settings → Domain → reliez `unihabitat.ma`.

### 2. GitHub Pages
1. Créez un dépôt GitHub, poussez ces fichiers.
2. **Settings → Pages → Branch : `main` / dossier `/root`** → Save.
3. URL : `https://<utilisateur>.github.io/<repo>/`.

### 3. Vercel
1. `https://vercel.com/new` → importez le dépôt (ou `npx vercel` dans le dossier).
2. Framework preset : **Other** (aucun build). Déployez.

### Relier le QR code
Une fois l'URL en ligne (ou votre domaine `unihabitat.ma`), générez le QR code
pointant vers cette URL et placez-le sur la carte de visite physique.
> Ne pas afficher de QR code **dans** la page — il vit uniquement sur la carte physique.

---

## Modifier les informations

Toutes les coordonnées vivent dans **deux endroits** :

- **`index.html`** — liens `tel:`, `mailto:`, `wa.me`, réseaux sociaux, adresse, textes.
- **`app.js`** — objet `BRAND` (utilisé pour la vCard `.vcf`).

Modifiez les deux si un numéro / e-mail / adresse change.

**Adresse :** 174 Bd Zerktouni & Moussa Bnou Noussair, 1ᵉʳ étage, Appt N° 2 — Casablanca.
Les boutons *Localisation* et *Itinéraire* ouvrent Google Maps sur cette adresse.
Le logo est un **SVG vectoriel** (`assets/logo.svg`) — net à toute taille ; les `.png`/`.webp`
servent de repli.

---

## Qualité & accessibilité

- Mobile-first (testé de **320 px à 1440 px**, aucun débordement horizontal)
- Cibles tactiles ≥ 44 px, focus clavier visibles, contrastes AA
- `prefers-reduced-motion` respecté
- Langue `fr`, SEO + Open Graph, favicon dérivé du logo
- Logo skyline vectoriel (SVG) + repli WebP/PNG

© 2026 UNIHABITAT
