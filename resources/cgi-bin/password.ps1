#!/bin/pwsh



$CONTENT_TYPE_JSON = "Content-type: application/json"

# Récupère le paramètre passé en URL
$HOSTNAME = $args
#$HOSTNAME = $env:QUERY_STRING
#$cle, $HOSTNAME =  $env:QUERY_STRING.Split('=')

# Vérifie si un paramètre est fourni
if ([string]::IsNullOrEmpty($HOSTNAME)) {
    Write-Output $CONTENT_TYPE_JSON
    Write-Output ""
    Write-Output "{""error"": ""No parameter Aucun paramètre fourni.""}"
    exit 1
}

$UserList=’John’,’Charlotte’,’Sean’,’Colleen’,’Namoli’,’Maura’,’Neula’

# Génère la date actuelle
$nbMinutes = Get-Random -Minimum 5 -Maximum 21
$DATE = (Get-Date).AddMinutes($nbMinutes).ToString("s")
$HOST_PASSWORD = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 25 | ForEach-Object {[char]$_})
$HOST_USER=Get-Random -InputObject $UserList
#$HOST_USER="toto"

# Construit le JSON de réponse
$JSON="{""host"": ""$HOSTNAME"", ""user"": ""$HOST_USER"", ""password"": ""$HOST_PASSWORD"", ""validity"": ""$DATE""}"

# Envoie le JSON en réponse
# Envoie le JSON en réponse
Write-Output $CONTENT_TYPE_JSON
Write-Output ""
Write-Output $JSON