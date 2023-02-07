FROM node:18.13 as clientbuild

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm i
RUN npm run build

FROM nginx:1.21.4

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir /usr/share/nginx/html/static
COPY --from=clientbuild /app/dist /usr/share/nginx/html/static

#ENTRYPOINT ["nginx", "-g", "daemon off;"]
