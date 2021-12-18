FROM nginx

COPY /packages/fre/dist/ /root/fre/

EXPOSE 80