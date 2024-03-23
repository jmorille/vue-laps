Laps installer
-------------------

## Config DNS

### Dns Keycloak
1. Create a DNS entry for keycloak
2. Enter this DNS Name in :
* Edit file : `keycloak/keycloak.Dockerfile`
> ARG KEYCLOAK_DOMAIN=keycloak.localhost

* Edit file : `keycloak/keycloak-config.env`
> KC_HOSTNAME=keycloak.home.loc


* Edit file : `laps/laps-keycloak.env`
> KEYCLOAK_DOMAIN=keycloak.home.loc:8443

3. Build Docker Images
```sh
# Run keycloak 
$ docker-compose  build keycloak
```


### DNS Laps
Create DNS entry for Lapd
1. Enter this DNS Name in :
* laps/docker-compose.yaml
> HTTPD_SERVER_NAME: "laps.localhost"
> HTTPD_SERVER_ALIAS: "127.0.0.1 localhost"


## Config Keycloak

### Config password
Edit file 'docker-compose.yams' for changing
1. login/password of keycloak
> KEYCLOAK_ADMIN: admin
> KEYCLOAK_ADMIN_PASSWORD: admin


2. internal database
> KC_DB_PASSWORD: keycloak
> POSTGRES_PASSWORD: keycloak
   
### Start Keycloak

1. Start keycloak
```sh
# Run keycloak 
$ docker-compose  up
```
2. Login Admin Keycloak
* URL: https://keycloak.home.loc:8443/
* Login: admin/admin

### Config keycloak 
General configuration ok Keycloak
* LDAP connector
* SMTP
* Password Strategy
* MFA
* What ever you want ...

  
### Config keycloak laps client
Next in realm local
* Go to : Realms > local > laps-httpd > Credential
1. Client Secret > Regerate
2. Copy to value to: laps/docker-compose.yaml > KEYCLOAK_CLIENT_SECRET


### Create Users for Realms
Next in realm local
* create users with role: laps-httd/user & laps-vue/user

## Laps 
### Config Laps
1. Put the script powershell in
```sh
./laps/src/config/cgi-bin/password.ps1
```

## Start Laps Httpd
1. Start Laps
```sh
# Run keycloak 
$ docker-compose  up
```
