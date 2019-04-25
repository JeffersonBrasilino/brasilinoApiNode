FROM alpine
RUN apk update && apk add nodejs
RUN apk add npm
RUN npm install -g nodemon
RUN npm install -g typescript
VOLUME ["/app"]
WORKDIR /app