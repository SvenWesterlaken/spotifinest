FROM node:alpine

EXPOSE 8000

RUN apk add --update tini

RUN mkdir -p /user/src/app

WORKDIR /user/src/app

COPY package.json package.json

RUN npm i && npm cache clean --force

COPY env.js env.js
COPY index.js index.js

CMD ["/sbin/tini", "--", "node", "index.js"]
