FROM node:latest

WORKDIR /app/src

COPY . .

RUN yarn

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]

