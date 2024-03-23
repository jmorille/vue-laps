# https://learn.microsoft.com/en-us/virtualization/windowscontainers/manage-docker/manage-windows-dockerfile

# Indicates that the windowsservercore image will be used as the base image.
FROM mcr.microsoft.com/powershell:latest
# Exposer le port 8000 pour le serveur HTTP
EXPOSE 8000
WORKDIR /usr/lib/cgi-bin/

# Installer Python pour le serveur HTTP
RUN apt-get update && apt-get upgrade -y \
 && apt-get install -y curl \
                       apache2 \
                       libapache2-mod-fcgid

RUN a2enmod http2 unique_id cgi fcgid authnz_fcgi

# Apache Config
# ##############################################
RUN echo "Listen 8000" >> /etc/apache2/ports.conf

# Vhost site
RUN sed -i \
    		-e 's/^#\(<VirtualHost *:80>\)/\1/' \
            -e 's/^\(.*\)\(:80\)>/\1:8000>/' \
            -e 's/^\(.*\)#\(ServerName.www.example.com\)/\1ServerName powershell/' \
            -e 's/^\(.*\)#\(Include .*cgi-bin.conf\)/\1\2/' \
        		/etc/apache2/sites-enabled/000-default.conf


RUN LINE_IDX=$(( $(grep -n "DocumentRoot" /etc/apache2/sites-enabled/000-default.conf  | cut -f1 -d: | head -1) + 1 )) \
  &&  echo "               --> Insert Configuration in line ${LINE_IDX}" \
  && sed -i "${LINE_IDX}i  Protocols h2 h2c http/1.1" /etc/apache2/sites-enabled/000-default.conf  \
  && sed -i "${LINE_IDX}i  ServerSignature Off" /etc/apache2/sites-enabled/000-default.conf  \
  && grep -v '#' /etc/apache2/sites-enabled/000-default.conf

# Access restriction
# ##############################################
RUN LINE_IDX=$(( $(grep -n "Include conf-available/serve" /etc/apache2/sites-enabled/000-default.conf  | cut -f1 -d: | head -1) + 1 )) \
  &&  echo "               --> Insert Configuration in line ${LINE_IDX}" \
  && LOC_CGI="# \n\t# Access Restriction \n\t# ####################" \
  && LOC_CGI="${LOC_CGI}\n\t<Location \"/cgi-bin\">" \
  && LOC_CGI="${LOC_CGI}\n\t   AuthType Basic" \
  && LOC_CGI="${LOC_CGI}\n\t   AuthName  \"Restricted API\"" \
  && LOC_CGI="${LOC_CGI}\n\t   AuthBasicProvider file" \
  && LOC_CGI="${LOC_CGI}\n\t   AuthUserFile  \"/var/www/passwd/.htpasswd\"" \
  && LOC_CGI="${LOC_CGI}\n\t   Require valid-user" \
  && LOC_CGI="${LOC_CGI}\n\t</Location>" \
  && sed -i "${LINE_IDX}i  $LOC_CGI" /etc/apache2/sites-enabled/000-default.conf  \
  && grep -v '#' /etc/apache2/sites-enabled/000-default.conf


# Copier le script PowerShell dans le conteneur
# ##############################################
COPY ./resources/cgi-bin/*.ps1 /usr/lib/cgi-bin/
RUN mkdir -p /var/www/passwd/

# Start Command
# ##############################################
WORKDIR /etc/apache2/sites-enabled
# -C 7 -B
CMD htpasswd -C 7 -B  -b -c /var/www/passwd/.htpasswd ${API_LOGIN}  ${API_PASSWORD}   \
 && apachectl -D FOREGROUND
