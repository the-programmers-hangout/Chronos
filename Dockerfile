FROM node:alpine

WORKDIR /usr/bot

COPY package.json package-lock.json ./
RUN npm install

COPY . .

CMD npm start
