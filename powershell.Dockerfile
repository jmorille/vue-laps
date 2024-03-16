# https://learn.microsoft.com/en-us/virtualization/windowscontainers/manage-docker/manage-windows-dockerfile

# Indicates that the windowsservercore image will be used as the base image.
FROM mcr.microsoft.com/windows/servercore/iis

RUN powershell -NoProfile -Command Remove-Item -Recurse C:\inetpub\wwwroot\*

# Creates an HTML file and adds content to this file.
WORKDIR /inetpub/wwwroot

# Sets a command or process that will run each time a container is run from the new image.
CMD "iis-site"