FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

RUN npm install -g pm2

COPY . .

CMD pm2 start bin/www --no-daemon
