FROM node:alpine as client
WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn install --production=false

RUN mkdir /app/client
COPY client/package.json /app/client/package.json
COPY client/yarn.lock /app/client/yarn.lock
WORKDIR /app/client
RUN yarn install --production=false

WORKDIR /
COPY . /app

WORKDIR /app/client
RUN yarn build

RUN mkdir -p /app/server/src/dist
RUN cp -r /app/client/build /app/server/src/dist/app


FROM node:alpine
RUN mkdir /app
COPY --from=client /app/server /app/server
WORKDIR /app/server
RUN yarn install --production=false

ENV PORT 5000
ENTRYPOINT ["yarn","start:prod"]
