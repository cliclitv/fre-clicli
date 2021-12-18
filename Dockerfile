FROM nginx

COPY /packages/fre/dist/ /usr/share/nginx/html/
COPY /nginx/ /etc/nginx/