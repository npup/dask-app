# Dockerized web project

This is the skeleton of a dockerized web project, consisting of

- a statically built front end
- a node.js based API server, backed by a MongoDB database
- an nginx proxy, both serving the static content as well as delegating calls to the API server


## Prerequisites

The project has been tested with local versions like below

- Docker version 20.10.6
- docker-compose version 1.29.1
- node.js 16.8.0
- MongoDB v5.0.x

&mdash; but it could very well work with many other previous and later versions!

## Development

For local development, you can either run the whole docker project, or start the client- and server parts as standalone.

### Start the whole dockerized app

This is about what happens on a production server, too.

Start the docker container by running

    npm start

in the root directory.  The app will be served on port 3000.  To stop the app, do

    npm run stop

The docker configuration makes the API server available via client calls to `/api/**` - it is "mounted" there by the internal nginx proxy while running as a container (see the "location" instruction in the `workspaces/static/nginx/default.conf` file).

#### Volumes

The directory `volumes/` is meant to contain any volumes one wants to register.  

The volumes currently registered in `docker-compose.yml` are:

- mongodata - for the **mongo** container (`services/mongo`)
- files - for the **api** container file handling (`services/api`)

It is easy to add more volumes.  Just remember to set up the directory in the corresponding container, and to reference it correctly (prod/not prod).

|              | in container     | standalone dev mode               | configured at                     |
|--------------|------------------|-----------------------------------|-----------------------------------|
| mongo        | `volumes/mongo`  | locally installed mongo instance. | `workspaces/api/src/config.ts`    |
| file storage | `volumes/files`  | `workspaces/server/.tmp/files`    | `workspaces/api/src/config.ts`    |
For example, in non-container running of the the API server, it uses a _.tmp_ directory as a substitute for the files volume.  This is set up in `workspaces/server/src/config.ts`.



### Run client and API server as standalone


#### API server

Start the api server in dev mode:

    npm run dev:server

It will rebuild and restart on any changes to the source code.

The API is available at the root on http://localhost:3002/. Your local machine's MongoDB will be used instead of anything running in a container.

#### Client

Start the client in dev mode:

    npm run dev:client

It will update and reload on any changes to the source code.


For the client dev server, API calls are routed to the API (dev) server using the `server.proxy` part of the configuration in `workspaces/static/vite.conf.ts`.  This mimics how the `workspaces/static/nginx/default.conf` "mounts" the api on the `/api/**` path when running as containers.


## Configuration

You can configure how the parts of the app are connected to each other.  You may very well only ever need or want
to adjust the Docker container port, since the internal port wiring can be regarded as a bit of a black box.

However, if you develop and run the client and API server locally, the ports may be occupied on your machine
already, and you may need to change only those.  **In that case, you will not have to touch any docker-
(or nginx-) related configuration**, so it is still quite simple - only the `config.ts` files in the static and
server directories need to be adjusted.

### Ports

#### Client

The standalone frontend client runs its dev server on port `3001`. The value needs to be updated in these places:

|                | File                               | What                             |
|----------------|------------------------------------|----------------------------------|
| Static         | `workspaces/static/src/config.ts`  | the `DEV_PORT` setting           |

#### API server

The API server runs on port `3002`.  The value needs to be updated in these places:

|                | File                                   | What                             |
|----------------|----------------------------------------|----------------------------------|
| API server     | `workspaces/server/src/config.ts`      | the `API_SERVER_PORT` setting    |
| Static         | `workspaces/static/src/config.ts`      | the `API_SERVER_DEV_PORT`setting |
|                | `workspaces/static/nginx/default.conf` | the `upstream api` block         |
| Root config    | `docker-compose.yml`                   | the `services/api/ports` section |


#### Docker container

The docker container itself runs on port `3000`.  This is the value you may want to change
for your deployment to a production server or something like that.

The value needs to be updated in these places:

|                | File                                   | What                                |
|----------------|----------------------------------------|-------------------------------------|
| Static         | `workspaces/static/nginx/default.conf` | the `services/static/ports` section |
| Root config    | `docker-nginx-conf`                    | the `upstream dockerized` section   |



## Deployment

You can use the `docker-nginx-conf` file on a production server to route requests to the dockerized app, running in its container.  Adjust the server block's `server_name` and/or `location` values accordingly.
