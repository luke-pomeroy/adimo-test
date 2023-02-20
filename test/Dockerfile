FROM node:16-bullseye-slim

COPY ./app

WORKDIR /app

RUN npm install

ENTRYPOINT ["node", "app.js"]
