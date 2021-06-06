FROM node:16.2.0-slim

WORKDIR /var/app

COPY interfaces interfaces
COPY backend backend

WORKDIR /var/app/backend

RUN yarn install --silent

EXPOSE 8080

CMD [ "yarn", "start" ]