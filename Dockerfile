FROM node:alpine as client
WORKDIR /app

RUN mkdir /app/client
COPY client/package.json /app/client/package.json
COPY client/yarn.lock /app/client/yarn.lock
WORKDIR /app/client
RUN yarn install --production=false

WORKDIR /
COPY . /app

WORKDIR /app/client
EXPOSE 8080

CMD ["yarn", "dev"]

# FROM node:alpine
# RUN mkdir /app
# COPY --from=client /app/server /app/server
# WORKDIR /app/server
# RUN yarn install --production=false

# ENV PORT 5000
# ENTRYPOINT ["yarn","start:prod"]


# 5173
