# Application web: "Remindr"
https://abstracted-uranium-5b4.notion.site/NodeJS-project-5ad0f19bf1594337a05fb641dbc5308b

## Mod�le
Nous faisons uniquement le DAL car nous utilsons Prisma.Js

Servira � faire les requ�tes � la base de donn�es
Ce sera une collection de fonctions qui seront appel�es par le contr�leur

## Vue (/Templates/)
Templates avec Handlebars
Classe "Render" qui sera appel�e par le contr�leur

## Routeurs (/Routers/)
Routeurs avec Express

## Contr�leur (/Controllers/)
Fonction finale des routeurs avec Express

## Middlewares (/Middlewares/)
V�rification des donn�es, authentification, etc.
Les middlewares sont ind�pendantes du mod�le, de la vue et du contr�leur
Elles sont appel�es par le contr�leur

## Utils (/Utils/)
Fonctions/classes utilitaires