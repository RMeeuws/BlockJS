FROM node:alpine
LABEL version="1.0"

RUN apk add --update \
  git

WORKDIR /app

COPY package.json package.json
RUN yarn

COPY src/ /app/src

EXPOSE 9000 2000

ENV NODE_ENV development
ENV DEBUG blockjs:*

CMD ["npm" ,"start"]