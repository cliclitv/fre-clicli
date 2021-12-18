FROM nginx

COPY /packages/fre/dist/ /usr/share/nginx/html/
COPY /nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80