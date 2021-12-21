/*
  port when running the dev server for the client only
*/
const DEV_PORT = 3001;
const API_SERVER_DEV_PORT = 3002;

export const config = {
  get DEV_PORT() {
    return DEV_PORT;
  },
  get API_SERVER_DEV_PORT() {
    return API_SERVER_DEV_PORT;
  },
};
