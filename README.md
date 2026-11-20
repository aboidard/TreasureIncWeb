#Treasure inc.
# visit www.treasure-inc.fr

## Page d'administration (`/admin`)

La page `/admin` est l'interface web de **Maestro**, le service d'administration de Treasure Inc.
Elle propose trois onglets :

| Onglet | Contenu | Endpoint Maestro |
|---|---|---|
| Tableau de bord | Cartes KPI (joueurs connectés, joueurs désynchronisés, mémoire Redis, requêtes/minute), métriques supplémentaires (`extra`, affichées telles quelles), horodatage, rafraîchissement automatique toutes les 15 s (bouton Pause / Rafraîchir) | `GET /admin/status` |
| Tableau de bord | Pastille de santé de Maestro (UP/DOWN + version) | `GET /admin/health` |
| Tableau de bord | Bouton « Forcer la synchronisation Redis → Postgres » (avec confirmation, affiche le résultat) | `POST /admin/sync` |
| Joueurs | Liste des joueurs (filtre, pagination) | `GET /users` |
| Joueurs | Recherche par publicKey et fiche du joueur | `GET /users/{publicKey}` |
| Joueurs | Création d'un joueur (avec confirmation) | `POST /users` |
| Joueurs | Modification du solde `money` (avec confirmation) | `PUT /users/{publicKey}` |
| Rapports | Envoi immédiat du rapport hebdomadaire par e-mail (avec confirmation) | `GET /reporting/sendWeeklyReport` |

Une valeur absente ou `null` est affichée « — ». Les erreurs (Maestro injoignable, clé d'API refusée,
erreur 500…) sont affichées dans un bandeau rouge avec un bouton « Réessayer ».

### Sécurité

- `/admin` et `/api/admin/*` sont protégés par **Basic Authentication** (`middleware.js`,
  realm `Treasure Inc Admin`). La comparaison des identifiants se fait en temps constant.
- Si `ADMIN_USER` ou `ADMIN_PASSWORD` n'est pas défini, l'accès est **refusé** (HTTP 503) : jamais d'accès ouvert par défaut.
- Le navigateur n'appelle jamais Maestro : il appelle les routes `/api/admin/*` de ce serveur Next,
  qui relaient vers Maestro côté serveur en ajoutant l'en-tête `X-API-KEY`. `MAESTRO_URL` et
  `MAESTRO_API_KEY` ne quittent donc pas le serveur.
- Les requêtes qui modifient quelque chose (POST/PUT) exigent l'en-tête `X-Treasure-Admin: 1`,
  envoyé par la page : un site tiers ne peut pas le forger (protection CSRF).

### Variables d'environnement

| Variable | Obligatoire | Description |
|---|---|---|
| `ADMIN_USER` | oui | Identifiant de la page admin |
| `ADMIN_PASSWORD` | oui | Mot de passe de la page admin |
| `MAESTRO_URL` | non | URL interne de Maestro. Défaut : `http://treasure-inc-maestro:8082` (nom du service docker compose / Kubernetes). En local : `http://localhost:8082` |
| `MAESTRO_API_KEY` | oui | Clé d'API de Maestro (même valeur que `maestro.apikey` côté Maestro, envoyée dans `X-API-KEY`) |
| `MAESTRO_TIMEOUT_MS` | non | Délai maximal d'un appel à Maestro, 10000 ms par défaut |

Ces variables sont lues **à l'exécution** (pas au build) : il suffit de les définir sur le conteneur.

En local, copier `.env.example` en `.env.local` (fichier ignoré par git) et le compléter.

### Changer le mot de passe

1. Générer un nouveau mot de passe fort :
   `py -3 -c "import secrets; print(secrets.token_urlsafe(24))"`
2. Le mettre dans `ADMIN_PASSWORD` :
   - en local : dans `.env.local` ;
   - docker compose : dans `treasure-inc-conf/server/conf/.web.env` ;
   - Kubernetes : dans le secret utilisé par le déploiement `treasure-inc-web`.
3. Redémarrer le serveur web (`docker compose up -d treasure-inc-web`, `kubectl rollout restart deployment/treasure-inc-web`…).
4. Le navigateur garde les anciens identifiants en cache : fermer la fenêtre de navigation privée ou le navigateur pour se reconnecter.

### Tester en local sans Maestro

Lancer un faux Maestro qui répond aux endpoints ci-dessus sur un port local, puis :

```
MAESTRO_URL=http://localhost:18082 MAESTRO_API_KEY=<clé du faux Maestro> npm run dev
curl -i http://localhost:3000/admin                       # 401 + WWW-Authenticate
curl -u "$ADMIN_USER:$ADMIN_PASSWORD" http://localhost:3000/api/admin/status
```
