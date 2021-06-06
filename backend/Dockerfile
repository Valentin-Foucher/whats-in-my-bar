FROM node:16.2.0-slim

WORKDIR /var/app

COPY . .

RUN yarn install --silent

EXPOSE 8080

CMD [ "yarn", "start" ]