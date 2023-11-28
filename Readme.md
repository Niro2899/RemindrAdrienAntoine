# Application web: "Remindr"

## Modèle
Nous faisons uniquement le DAL car nous utilsons Prisma.Js

Servira à faire les requêtes à la base de données
Ce sera une collection de fonctions qui seront appelées par le contrôleur

## Vue (/Templates/)
Templates avec Handlebars
Classe "Render" qui sera appelée par le contrôleur

## Routeurs (/Routers/)
Routeurs avec Express

## Contrôleur (/Controllers/)
Fonction finale des routeurs avec Express

## Middlewares (/Middlewares/)
Vérification des données, authentification, etc.
Les middlewares sont indépendantes du modèle, de la vue et du contrôleur
Elles sont appelées par le contrôleur

## Utils (/Utils/)
Fonctions/classes utilitaires