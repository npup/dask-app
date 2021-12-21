const IS_PROD = "production" === process.env.NODE_ENV;

/*
  port of the api server instance -
  this must match port setting in
    package.json (scripts.container)
    /workspaces/static/nginx/default.conf
    /docker-compose.yml
*/

/*
  Port to run the API server instance on when running inside docker.
  For production mode, this must match the nginx.conf (/workspaces/static/nginx/default.conf)
  and docker-compose.yml (`workspaces/services/api/ports`).  
*/
// dev mode: port must match the API_SERVER_DEV_PORT setting in `/workspaces/static/src/conf.ts`
const API_SERVER_PORT = IS_PROD ? 3002 : 3002;

/*
  Name of database
*/
const DB_NAME = IS_PROD
  ? "nbefe-mongo-dockerized"
  : "nbefe-mongo-dockerized-dev";

/*
  Port of the database connection when running inside docker.
  For production mode, this must match the `ports` setting in
  the mongo service  in docker-compose.yml (eg. `services.mongo.ports`)
*/
// dev mode: use the port of your local mongo instance
const DB_PORT = IS_PROD ? 27017 : 27017;

/*
  Name of the "network" to use for db connection
  when running inside docker.
  For production mode, this must match the db's service
  name setting in docker-compose.yml (eg. `services.mongo`)
*/
// dev mode: "localhost" works when not running inside docker
const DB_NETWORK_HOST = IS_PROD ? "mongo" : "localhost";

/*
    Name of the volume to use for file storage
    when running inside docker.
    For production mode, this must match the setting
    in `/workspaces/services/api/volumes`.
*/
// dev mode: "./.tmp/files" will be the local (.gitignored) .tmp directory
const FILES_VOLUME_DIR = IS_PROD ? "./files" : "./.tmp/files";

export const config = {
  get API_SERVER_PORT() {
    return API_SERVER_PORT;
  },
  get DB_NAME() {
    return DB_NAME;
  },
  get DB_PORT() {
    return DB_PORT;
  },
  get DB_NETWORK_HOST() {
    return DB_NETWORK_HOST;
  },

  get FILES_VOLUME_DIR() {
    return FILES_VOLUME_DIR;
  },
};
