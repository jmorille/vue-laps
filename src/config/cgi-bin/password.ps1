# Vérifie si le script est exécuté en tant que CGI
#if (-not $env:GATEWAY_INTERFACE) {
#    Write-Output "Content-type: text/plain"
#    Write-Output ""
#    Write-Output "Ce script doit être exécuté en tant que CGI."
#    exit 1
#}

$CONTENT_TYPE_JSON = "Content-type: application/json"

# Vérifie si un paramètre est fourni
if ($args.Count -eq 0) {
    Write-Output $CONTENT_TYPE_JSON
    Write-Output ""
    Write-Output "{""error"": ""Aucun paramètre fourni.""}"
    exit 1
}

# Récupère le paramètre passé en URL
#$HOSTNAME = $args[0]
$cle, $HOSTNAME =  $args[0].Split('=')


# Génère la date actuelle
$nbMinutes = Get-Random -Minimum 5 -Maximum 21
$DATE = (Get-Date).AddMinutes($nbMinutes).ToString("s")
#$HOST_PASSWORD = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 25 | ForEach-Object {[char]$_})

# Construit le JSON de réponse
$JSON="{""host"": ""$HOSTNAME"", ""password"": ""$HOST_PASSWORD"", ""validity"": ""$DATE""}"

# Envoie le JSON en réponse
Write-Output $CONTENT_TYPE_JSON
Write-Output ""
Write-Output $JSON