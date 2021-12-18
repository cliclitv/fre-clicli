FROM nginx

USER root

COPY /packages/react/dist/ /usr/share/nginx/html/react/
COPY /packages/fre/dist/ /usr/share/nginx/html/fre/
