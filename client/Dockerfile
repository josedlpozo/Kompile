FROM node:carbon

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]