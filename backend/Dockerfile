FROM node:16.2.0-slim

WORKDIR /var/

COPY interfaces interfaces
COPY backend backend

WORKDIR backend

RUN yarn install --silent

EXPOSE 8080

CMD [ "yarn", "start" ]