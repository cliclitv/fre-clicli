FROM nginx

USER root

COPY /packages/fre/dist/ /usr/share/nginx/html/
COPY /packages/fre/dist/ /root/fre/

RUN chmod -R 775 /usr/share/nginx/html
RUN chmod -R 775 /root/fre/
