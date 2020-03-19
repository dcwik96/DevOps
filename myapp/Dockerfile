FROM node:alpine

WORKDIR /opt/myapp

COPY ./package.json ./
#COPY . .

RUN npm install

COPY . .

CMD ["npm", "start"]
