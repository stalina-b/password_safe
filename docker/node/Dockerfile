FROM node:20.2.0-alpine3.17

COPY ./web /web

WORKDIR /web

RUN npm install

CMD [ "sh", "-c", "npm install && npm run dev" ]
