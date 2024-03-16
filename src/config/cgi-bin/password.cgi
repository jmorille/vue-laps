#!/bin/bash

# Vérifie si le script est exécuté en tant que CGI
#if [ ! -n "$GATEWAY_INTERFACE" ]; then
#    echo "Content-type: text/plain"
#    echo
#    echo "Ce script doit être exécuté en tant que CGI."
#    exit 1
#fi

CONTENT_TYPE_JSON="Content-type: application/json"

# Vérifie si un paramètre est fourni
if [ $# -eq 0 ]; then
    echo $CONTENT_TYPE_JSON
    echo
    echo "{\"error\": \"Aucun paramètre fourni.\"}"
    exit 1
fi

# Récupère le paramètre passé en URL
HOSTNAME="$QUERY_STRING"

# Génère la date actuelle
DATE=$(date -d "+12 minutes" --iso-8601="seconds")
HOST_PASSWORD=$(openssl rand -base64 12)


# Construit le JSON de réponse
JSON="{\"host\": \"$HOSTNAME\", \"password\": \"$HOST_PASSWORD\", \"validity\": \"$DATE\"}"

# Envoie le JSON en réponse
echo $CONTENT_TYPE_JSON
echo
echo $JSON