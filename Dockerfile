FROM nginx

USER root

COPY ./packages/fre/dist/ /usr/share/nginx/html/

EXPOSE 8080