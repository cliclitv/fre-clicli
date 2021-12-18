FROM nginx

COPY /packages/fre/dist/ /usr/share/nginx/html/
COPY /conf.d /etc/nginx/conf.d

EXPOSE 80