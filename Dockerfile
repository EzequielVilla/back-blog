FROM node:18 as build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .

RUN npm install
COPY . .

FROM node:18
WORKDIR /usr/src/app
RUN chown node:node /usr/src/app
USER node
EXPOSE 3080
COPY .env /usr/src/app/
COPY --from=build --chown=node:node /usr/src/app /usr/src/app
CMD ["npm", "start"]
