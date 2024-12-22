FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx tsc --version

COPY . .

EXPOSE 3000

CMD ["node", "dist/index.js"]