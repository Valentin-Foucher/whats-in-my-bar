FROM node:16.2.0-slim

WORKDIR /var/app/

COPY interfaces .
COPY frontend .

WORKDIR /var/app/backend

RUN yarn install --silent

CMD [ "yarn", "start" ]