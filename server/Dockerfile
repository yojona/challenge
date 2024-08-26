FROM node:alpine
WORKDIR /app

RUN mkdir /app/server
COPY . /app/server
WORKDIR /app/server
RUN yarn install --production=false

EXPOSE 5000
ENV PORT 5000

ENTRYPOINT [ "yarn", "seedAndRun"]