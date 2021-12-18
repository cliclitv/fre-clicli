FROM nginx

COPY /packages/fre/dist/ /usr/share/nginx/html/
COPY /packages/fre/dist/ /root/fre/
