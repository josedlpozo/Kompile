FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

RUN npm install -i pm2

COPY . .

CMD [ "npm", "start" ]