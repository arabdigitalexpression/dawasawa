FROM node:boron
# Create app directory
RUN mkdir -p /usr/src/dawasawa
WORKDIR /usr/src/dawasawa

# Install app dependencies
COPY package.json /usr/src/dawasawa/
RUN npm install

# Bundle a source
COPY . /usr/src/dawasawa

EXPOSE 3000
CMD ["node", "app.js"]
