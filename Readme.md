# Remindr

* Antoine Chabanel
* Adrien Wyrwal
* Enzo Gonzalez

## Introduction
* Pour faire fonctionner le projet, il faut d'abord importer la base de données dans /.rendu_sql/ (expliqué plus bas)

## Architecture
```
root
|
->Routers
|
->Controllers
|
->prisma
|
->Middlewares
  |
  ->Authentification
  ->View
|
->static
|
->index.js
|
-> views
|
-> <Fichiers node.js>
```

### Routers
Routeurs implémentés:
* Groupes
* User
* (main) (pas utile car nous n'avons pas fait d'accueil)

* Les routeurs permettent d'exécuter les fonctions du contrôleur en fonction des actions de l'utilisateur sur les différentes routes.
* Il permet aussi de choisir quels Middlewares doivent être éxécutés.

:warning: Critique:
* Le routeur groupes pourrait être divisé en sous-routeurs.

### Controllers
* Ils définissent des fonctions appelées par les routes.
* Ils gèrent ainsi la mise à jour du modèle et l'affichage des données.

:warning: Critique:
* Les fonctions sont souvent trop grosses et compliquées surtout pour les groupes.
* Le contrôleur et le modèle Prisma ne sont pas séparés par un DAL.
* Le modèle prisma est parfois appelé par le biais de procédures stockées SQL ce qui est à éviter le plus possible car le but de Prisma est de ne pas gérer le SGBD soit-même.
* Le mot de passe n'est pas hashé.
* La sécurité et la gestion d'erreurs en général est à revoir.

### Middlewares

#### Authentification
Définit des fonctions pour vérifier si l'utilisateur est connecté/s'il ne l'est pas

#### View
initData (utilisé par toute l'application) permet d'initialiser un objet contenant les éléments qui seront utiles aux vues du programme
Cela évite de faire passer des objets différents à chaque vue.

:warning: Critique:
* Pas une bonne pratique de programmation, il aurait plutôt fallu séparer cela en plusieurs fonctions car sinon l'objet va devenir gros
* En plus, il est traîné à chaque requêtes de l'utilisateur !

### Prisma
* Contient l'accès et les données utiles à la manipulation de la base de donnée.
* Nécéssite d'avoir des variables d'environnement définies pour préciser le protocole de connexion à la base de données (mySql utilisé)

:warning: Critiques: 
* Importé depuis la base de données SQL et pas l'inverse
* Dépend de procédures stockées distantes

### static
Contient les fichiers livrés comme statiques (images par exemple)

### index.js
Initialise l'applications avec les middlewares:
* bodyParser
* session
* initData (Middlewares/View)

et les routeurs:
* mainRouter
* userRouter

(le groupesRouter est utilisé comme sous-routeur de userRouter)

### views

Les vues utilisent handlebars pour afficher des pages web.

:warning: Critique:
* Les liens sur les vues renvoient vers des pages écrites en dur (ex: /users/groups/manage). Cela crée une dépendance aux routes.


## Conclusion

Je pense que ce projet a permis de nous faire la main avec Express.
Il y a cependant des choses à régler dans ce livrable (gestion de la BDD, sécurité, single responsability...).
Il manque évidement des fonctionnalités basiques comme faire en sorte que les utilisateurs ne soient pas obligés de rejoindre un groupe quand ils sont invités, ou alors les fonctionnalités quitter le groupe/virer un utilisateur du groupe...
Mais nous pensons que nous serions capables d'implémenter ceci.