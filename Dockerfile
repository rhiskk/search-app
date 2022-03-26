FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 3001

CMD npm start