ARG HTTPD_VERSION="2.4"

# Build Images
# #######################
FROM busybox AS BUILD 
ARG  MAVEN_ARTIFACT_ID
ARG  MAVEN_VERSION
ADD target/${MAVEN_ARTIFACT_ID}-${MAVEN_VERSION}-app-htdocs.tar.gz /DATA/${MAVEN_ARTIFACT_ID}/
ADD target/${MAVEN_ARTIFACT_ID}-${MAVEN_VERSION}-app-resources-docker.tar.gz /DATA/${MAVEN_ARTIFACT_ID}/


FROM httpd:${HTTPD_VERSION} 
ARG MAVEN_ARTIFACT_ID
ARG MAVEN_VERSION

# Expose
# #######################
EXPOSE 80
VOLUME ["/var/log/httpd/vuelaps/" ]
WORKDIR  /DATA/vuelaps

# Apache Install
RUN apt update \
 && apt install -y \
     libapache2-mod-encoding libapache2-mod-fcgid \
     libapache2-mod-auth-openidc libapache2-mod-oauth2 \
     libapache2-mod-lookup-identity \
     libapache2-mod-evasive libapache2-mod-log-slow \
     libapache2-mod-mono


#  grep LoadModule /usr/local/apache2/conf/httpd.conf | grep status
RUN sed -i \
    		-e 's/^#\(LoadModule .*mod_access_compat.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_actions.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_alias.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_allowmethods.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_auth_basic.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_auth_digest.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authn_anon.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authn_core.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authn_dbd.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authn_dbm.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authn_file.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authn_socache.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authz_core.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authz_dbd.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authz_dbm.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authz_groupfile.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authz_host.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authz_owner.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_authz_user.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_autoindex.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_cache.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_cache_disk.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_cache_socache.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_data.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_dbd.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_deflate.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_dir.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_dumpio.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_echo.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_env.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_expires.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_ext_filter.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_headers.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_include.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_info.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_log_config.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_logio.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_macro.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_mime_magic.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_mime.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_negotiation.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_remoteip.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_reqtimeout.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_request.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_rewrite.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_setenvif.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_slotmem_shm.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_slotmem_plain.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_slotmem_shm.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_socache_dbm.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_socache_memcache.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_socache_redis.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_socache_shmcb.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_status.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_ssl.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_substitute.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_suexec.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_unique_id.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_unixd.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_userdir.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_version.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_vhost_alias.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_watchdog.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_brotli.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_dav.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_dav_fs.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_dav_lock.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_lua.so\)/\1/' \
# This file configures all the proxy modules:
    		-e 's/^#\(LoadModule .*mod_proxy.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_lbmethod_bybusyness.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_lbmethod_byrequests.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_lbmethod_bytraffic.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_lbmethod_heartbeat.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_ajp.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_balancer.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_connect.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_express.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_fcgi.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_fdpass.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_ftp.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_http.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_hcheck.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_scgi.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_uwsgi.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_wstunnel.so\)/\1/' \
# Protocol:
    		-e 's/^#\(LoadModule .*mod_http2.so\)/\1/' \
    		-e 's/^#\(LoadModule .*mod_proxy_http2.so\)/\1/' \
# CGI:
    		-e 's/^\(.*\)#\(LoadModule .*mod_cgid.so\)/\1 \2/' \
    		-e 's/^\(.*\)#\(LoadModule .*mod_cgi.so\)/\1 \2/' \
    		/usr/local/apache2/conf/httpd.conf

# ### Open Id Connect Module
# ### #################################
# Copy module oidc
RUN cp /usr/lib/apache2/modules/mod_auth_openidc.so /usr/local/apache2/modules \
 && cp /usr/lib/apache2/modules/mod_oauth2.so /usr/local/apache2/modules

# Add module oidc
RUN LINE_IDX=$(( $(grep -n "auth_basic_module" /usr/local/apache2/conf/httpd.conf | cut -f1 -d: | head -1) + 1 )) \
  &&  echo "               --> Insert Load Module in line ${LINE_IDX}" \
  && sed -i "${LINE_IDX}i LoadModule oauth2_module modules/mod_oauth2.so" /usr/local/apache2/conf/httpd.conf \
  && sed -i "${LINE_IDX}i LoadModule auth_openidc_module modules/mod_auth_openidc.so" /usr/local/apache2/conf/httpd.conf \
  && grep mod_auth_ /usr/local/apache2/conf/httpd.conf

# ###  HTTPD  config
# ### #################################
RUN mkdir -p /usr/local/apache2/conf.d/ \
# &&  chmod g+w,o+w /usr/local/apache2/logs/ \
 && chown -R www-data:www-data  /usr/local/apache2/logs/ \
 && echo "Include /usr/local/apache2/conf.d/*.conf" >> /usr/local/apache2/conf/httpd.conf

# ### Application config
# ### #################################
# Register Vhost
RUN mkdir -p /var/log/httpd/vuelaps/ \
 && chown -R www-data:www-data  /var/log/httpd/vuelaps/ \
 && echo "Include /DATA/vuelaps/conf-apache/vhost-vuelaps-lan.conf" > /usr/local/apache2/conf.d/vhost-vuelaps.conf

# Add Applications
COPY --from=BUILD /DATA/${MAVEN_ARTIFACT_ID}/ /DATA/vuelaps/

#USER www-data:www-data
#USER 33