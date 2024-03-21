Laps installer
-------------------

## Config DNS

### Dns Keycloak
Create a DNS entry for keycloak
Enter this DNS Name in :
* keycloak/keycloak.Dockerfile
* keycloak/docker-compose.yaml
* laps/docker-compose.yaml

### Dns Lapd
Ceeate DNS entry for Lapd
Enter this DNS Name in :
* laps/docker-compose.yaml

## Config Keycloak


### Start Keycloak
```sh
# Run keycloak 
$ docker-compose  up
```

Login
* Admin Keycloak: https://keycloak.home.loc:8443/
4. Login: admin/admin

Next in realm local
* create users with role: laps-httd/user & laps-vue/user
* Go to : Realms > local > laps-httpd > Credential
1. Client Secret > Regerate
2. Copy to value to: src/environment/app-docker.properties > KEYCLOAK_CLIENT_SECRET
2. Copy to value to: docker-compose.yaml > KEYCLOAK_CLIENT_SECRET


## Laps Httpd
