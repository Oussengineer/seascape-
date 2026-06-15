# 📘 Guide GitHub — Projet Seascape (compte nidhal1998)

Règles et commandes pour gérer ce projet avec le compte **[nidhal1998](https://github.com/nidhal1998)**.

- **Compte GitHub :** `nidhal1998`
- **Dépôt :** `seascape-`
- **URL :** https://github.com/nidhal1998/seascape-.git
- **Branche principale :** `main`

> ⚠️ Ne pas confondre avec l'autre compte `nidhalsassi-lang`. Ce projet doit vivre sur **nidhal1998**.

---

## 1. Régler la bonne identité Git (à faire une fois)

Pour que les commits soient signés au bon nom dans **ce dépôt** :

```bash
cd "c:/Users/LENOVO/Desktop/seascape"
git config user.name "nidhal1998"
git config user.email "EMAIL_DU_COMPTE_nidhal1998"
```

> On utilise `git config` (sans `--global`) pour ne régler ça **que** pour ce projet,
> et ne pas écraser l'identité globale liée à l'autre compte.

---

## 2. S'authentifier avec le compte nidhal1998

Le 403 « Permission denied to nidhalsassi-lang » signifie que Windows a gardé en cache
les identifiants de l'**autre** compte. Il faut les remplacer :

```bash
# 1) Effacer l'identifiant GitHub en cache
printf "protocol=https\nhost=github.com\n\n" | git credential reject

# 2) Relancer une opération qui demande l'authentification
git push -u origin main
```

➡️ Une fenêtre **Git Credential Manager** / navigateur s'ouvre :
**connecte-toi avec le compte `nidhal1998`** (PAS nidhalsassi-lang).

> Alternative : effacer manuellement via *Windows → Gestionnaire d'identification →
> Informations Windows → `git:https://github.com`* puis supprimer l'entrée.

---

## 3. Lier le projet au dépôt (déjà fait, pour mémoire)

```bash
git remote set-url origin https://github.com/nidhal1998/seascape-.git
git remote -v        # vérifier que origin pointe bien vers nidhal1998/seascape-
```

Si le remote n'existe pas encore :

```bash
git remote add origin https://github.com/nidhal1998/seascape-.git
```

---

## 4. Workflow quotidien (modifier → publier)

```bash
git status                 # voir ce qui a changé
git add -A                 # tout préparer
git commit -m "Description claire du changement"
git push                   # publier sur GitHub
```

Récupérer les changements distants (si tu travailles sur 2 machines) :

```bash
git pull
```

---

## 5. Ajouter un collaborateur

> L'API ne peut pas inviter par email seul. Le plus simple est l'interface web.

**Via le site (par email ou username) :**
1. Aller sur https://github.com/nidhal1998/seascape-/settings/access
2. Cliquer **« Add people »**
3. Saisir l'email (ex : `masseoudi.amine99@gmail.com`) ou le username GitHub
4. Choisir le rôle (**Write** pour qu'il puisse pousser) → **Add**

La personne reçoit une invitation par email à accepter.

---

## 6. Lancer le projet en local

```bash
npm install      # une seule fois
npm run dev      # http://localhost:5173
npm run build    # build de production
```

---

## ✅ Règles à retenir

1. **Toujours** vérifier `git remote -v` → doit afficher `nidhal1998/seascape-`.
2. **Toujours** se connecter avec le compte **nidhal1998** (jamais nidhalsassi-lang).
3. Faire des `commit` petits et fréquents, avec un message clair.
4. `npm run build` doit passer **sans erreur** avant de pousser.
5. Ne jamais committer `node_modules/` (déjà ignoré dans `.gitignore`).
6. Ne pas mettre de secrets/mots de passe dans le code (le numéro WhatsApp public est OK).
