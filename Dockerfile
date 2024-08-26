FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json ./

RUN npm install -g nodemon

USER node

RUN npm install --quiet && npm audit fix --quiet

COPY --chown=node:node . .

EXPOSE 3000
