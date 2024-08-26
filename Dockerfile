FROM node:alpine

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

COPY package.json ./

USER node

RUN npm install ----production=false --quiet && npm audit fix --quiet

COPY --chown=node:node . .

# TODO: remove this step to use appropriate config for prod env
USER root

RUN npm install -g nodemon

EXPOSE 3000
