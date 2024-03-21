Laps installer
-------------------

## Config DNS

### Dns Keycloak
Create a DNS entry for keycloak
Enter this DNS Name in :
* keycloak/keycloak.Dockerfile
* keycloak/docker-compose.yaml
* laps/docker-compose.yaml

### DNS Laps
Ceeate DNS entry for Lapd
Enter this DNS Name in :
* laps/docker-compose.yaml



## Config Keycloak

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
* Configure LDAP connector
* Configure EMAIL
* What ever ...

  
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
./laps/src/config/cgi-bin/password.sh

2. Uncomment line in laps/docker-compose.yaml
#  - "./src/config/cgi-bin/password.sh:/DATA/vuelaps/htdocs/cgi-bin/password.ps1"

### Start Laps Httpd
1. Start Laps
```sh
# Run keycloak 
$ docker-compose  up
```
