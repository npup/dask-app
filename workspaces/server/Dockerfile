FROM node:16.9.0

WORKDIR /app

# registered as a volume in the docker-compose.yml file
RUN mkdir ./files;

COPY package*.json ./

COPY . .

RUN npm i

ENV NODE_ENV=production

CMD ["npm", "run", "start"]