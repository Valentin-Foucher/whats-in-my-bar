FROM node:16.2.0-slim

WORKDIR /var/app/

COPY interfaces interfaces
COPY frontend frontend

WORKDIR /var/app/frontend

RUN yarn install --silent

CMD [ "yarn", "start" ]