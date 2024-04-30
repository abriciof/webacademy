FROM node:18.16-slim

WORKDIR /app

ARG PORT_ARG=4567
ENV PORTA ${PORT_ARG}

COPY . .

EXPOSE ${PORT_ARG}

CMD ["npm", "start"]

## sudo docker build -t abriciof/webacademy-node .
## sudo docker build -t abriciof/webacademy-node:v2 --build-arg PORTA_ARG=4567 .
## sudo docker run -d --name webacademy-node -p 4567:4567 abriciof/webacademy-node