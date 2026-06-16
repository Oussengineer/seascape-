# Dossier médias

Ce dossier contient les images et vidéos affichées dans la **Galerie** du site.

| Fichier             | Utilisé pour            | Versionné sur GitHub ?            |
| ------------------- | ----------------------- | -------------------------------- |
| `repas.jpeg`        | Photo « Repas crique »  | ✅ Oui                            |
| `charcuterie.jpeg`  | Photo « Charcuterie »   | ✅ Oui                            |
| `video-crique.mp4`  | Vidéo « La crique »     | ❌ Non (trop lourde, voir ci-dessous) |
| `video-mer.mp4`     | Vidéo « La mer »        | ❌ Non (trop lourde)             |

## ⚠️ À propos des vidéos

GitHub refuse les fichiers de plus de **100 Mo**, et les vidéos brutes (243 Mo / 78 Mo)
sont bien trop lourdes pour un chargement web rapide. Elles sont donc **exclues du dépôt**
(`.gitignore`) mais doivent rester présentes **localement** dans ce dossier pour que la
galerie fonctionne.

### Recommandation : compresser les vidéos pour le web

Idéalement chaque vidéo doit faire **moins de 10–15 Mo**. Avec [ffmpeg](https://ffmpeg.org/) :

```bash
ffmpeg -i "video-crique-source.mp4" -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an video-crique.mp4
ffmpeg -i "video-mer-source.mp4"    -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an video-mer.mp4
```

Une fois compressées sous 100 Mo, tu peux retirer la ligne `public/media/*.mp4`
du `.gitignore` pour les versionner — ou les héberger sur un service externe
(YouTube, Cloudflare R2, etc.) et pointer la galerie vers ces URLs.
