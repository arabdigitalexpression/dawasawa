FROM node:boron

RUN mkdir -p /usr/src/dawasawa_app
WORKDIR /usr/src/dawasawa_app

COPY package.json /usr/src/dawasawa_app/
RUN npm install

COPY . /usr/src/dawasawa_app

EXPOSE 5000
CMD [ "npm", "start" ]


