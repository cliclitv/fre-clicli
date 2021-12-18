FROM nginx

COPY /packages/fre/dist/ /root/fre/
COPY /packages/fre/dist/ /usr/share/nginx/html/

EXPOSE 80