# https://learn.microsoft.com/en-us/virtualization/windowscontainers/manage-docker/manage-windows-dockerfile

# Indicates that the windowsservercore image will be used as the base image.
FROM mcr.microsoft.com/powershell:latest
# Exposer le port 8000 pour le serveur HTTP
EXPOSE 8000

# Installer Python pour le serveur HTTP
RUN apt-get update && apt-get upgrade -y && apt-get install -y python3 pip curl

# Copier le script PowerShell dans le conteneur
COPY ./resources/cgi-bin/*.ps1 /cgi-bin/
# cgi_directories This defaults to ['/cgi-bin', '/htbin']
#  --directory /DATA/bfflaps
#CMD "python3 -m http.server --cgi --bind 0.0.0.0 8000"
CMD ["python3", "-m", "http.server", "--cgi", "--bind", "0.0.0.0", "8000"]