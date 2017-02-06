FROM node:7.5.0

WORKDIR /src

RUN npm install nodemon -g

ADD ./package.json /src/package.json
RUN npm install

ADD ./nodemon.json /src/nodemon.json

EXPOSE 3000

CMD npm run dev
