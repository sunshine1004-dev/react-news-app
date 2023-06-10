FROM node:18.16.0-alpine

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve","dist"]