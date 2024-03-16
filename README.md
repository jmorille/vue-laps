vue-laps
#################################

## Description
Local Admintrateur Password Solution
Application du visualisation des mots de passe Serveur.

 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

 
## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

### Pré-requis
* NodeJS 20
* OpenJDK 21
* Maven 3.9.x
* Docker
* docker-compose

### Start Keycloak
```sh
# Run keycloak 
$ docker-compose -f docker-compose.keycloak.yaml up
```
Login
* Admin Keycloak: https://keycloak.home.loc:8443/
1. Create DNZ entry for matching
2. Login: admin/admin

Next in realm local
* create users with role: laps-httd/user & laps-vue/user
* Go to : Realms > local > laps-httpd > Credential
1. Client Secret > Regerate
2. Copy to value to: src/environment/app-docker.properties > KEYCLOAK_CLIENT_SECRET
2. Copy to value to: docker-compose.yaml > KEYCLOAK_CLIENT_SECRET

### Build
Installation des dépendances
```sh
# Build app & container
$ mvn install -Pdocker

# Run Container apache
$ docker-compose up
```

Ouvre les services :
* IHM de LAPS: http://vuelaps.localhost/



### Compile and Hot-Reload for Development
  
```sh 
$ pnpm install
$ pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
$ pnpm lint
$ pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

 
