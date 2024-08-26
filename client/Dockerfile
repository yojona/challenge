FROM node:alpine
WORKDIR /app

RUN mkdir /app/client
COPY ./ /app/client

WORKDIR /app/client
RUN yarn install --production=false

WORKDIR /
COPY . /app

WORKDIR /app/client
EXPOSE 8080

CMD ["yarn", "dev"]