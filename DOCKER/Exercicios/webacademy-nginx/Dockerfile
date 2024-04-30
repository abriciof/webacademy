FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y nginx

COPY default /etc/nginx/sites-available/default
COPY index.html /usr/share/nginx/html

EXPOSE 7000

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]

## sudo docker build -t abriciof/webacademy-nginx:v1 .
## sudo docker run -d --name webacademy-nginx -p 7000:7000 abriciof/webacademy-nginx:v1