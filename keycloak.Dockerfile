# https://www.keycloak.org/server/containers
# ### Builder
# ### ##################
FROM quay.io/keycloak/keycloak:latest as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true

# Configure a database vendor
ENV KC_DB=postgres

# Config Logs
ENV KC_LOG=console,file
ENV KC_LOG_FILE=/opt/keycloak/logs
ENV KC_FILE_LOG_OUTPUT=json

RUN mkdir -p /opt/keycloak/logs

WORKDIR /opt/keycloak
# Add the provider JAR file to the providers directory
#ADD --chown=keycloak:keycloak <MY_PROVIDER_JAR_URL> /opt/keycloak/providers/myprovider.jar

# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,DNS:keycloak.localhost,IP:127.0.0.1,IP:192.168.10.102" -keystore conf/server.keystore
RUN /opt/keycloak/bin/kc.sh build

# ### Images
# ### ##################
FROM quay.io/keycloak/keycloak:latest
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# change these values to point to a running postgres instance
# #############################
# Database
ENV KC_DB=postgres
ENV KC_DB_URL=jdbc:postgresql://postgres/keycloak
ENV KC_DB_USERNAME=keycloak
ENV KC_DB_PASSWORD=keycloak

# User
ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

# HTTP
ENV KC_HOSTNAME=keycloak.localhost

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]