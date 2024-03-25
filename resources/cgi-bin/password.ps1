#!/bin/pwsh



$CONTENT_TYPE_JSON = "Content-type: application/json"

# Vérifie si un paramètre est fourni
if ([string]::IsNullOrEmpty($env:QUERY_STRING)) {
    Write-Output $CONTENT_TYPE_JSON
    Write-Output ""
    Write-Output "{""error"": ""Aucun paramètre fourni.""}"
    exit 1
}
# Récupère le paramètre passé en URL
#$HOSTNAME = $args
$HOSTNAME = $env:QUERY_STRING
#$cle, $HOSTNAME =  $env:QUERY_STRING.Split('=')



# Génère la date actuelle
$nbMinutes = Get-Random -Minimum 65 -Maximum 81
$DATE = (Get-Date).AddMinutes($nbMinutes).ToString("s")
$HOST_PASSWORD = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 25 | ForEach-Object {[char]$_})


# Construit le JSON de réponse
$JSON="{""host"": ""$HOSTNAME"", ""password"": ""$HOST_PASSWORD"", ""validity"": ""$DATE""}"

# Envoie le JSON en réponse
# Envoie le JSON en réponse
Write-Output $CONTENT_TYPE_JSON
Write-Output ""
Write-Output $JSON