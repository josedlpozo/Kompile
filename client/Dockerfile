FROM node:carbon

COPY package*.json ./

RUN npm install

RUN npm install -i pm2

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "pm2", "start", "npm", "--", "start" ]