FROM node:boron

RUN mkdir -p /usr/src/dawasawa_health
WORKDIR /usr/src/dawasawa_health

COPY package.json /usr/src/dawasawa_health/
RUN npm install

COPY . /usr/src/dawasawa_health

CMD [ "npm", "start" ]


