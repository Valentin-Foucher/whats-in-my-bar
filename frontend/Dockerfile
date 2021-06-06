FROM node:16.2.0-slim

WORKDIR /var/

COPY interfaces .
COPY frontend .

WORKDIR /var/backend

RUN yarn install --silent

CMD [ "yarn", "start" ]