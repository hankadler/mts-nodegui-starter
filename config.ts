export const NODE_ENV = process.env.NODE_ENV || "development";

export const ROOT_PATH = __dirname;

export const APP = {
  _name: "app",
  name: "App",
  version: "1.0.0",
  author: {
    name: "Henry Aguila",
    url: "https://henryaguila.com/contact"
  }
};

export const SERVER_PORT = NODE_ENV.startsWith("prod")
  ? 4000 : NODE_ENV.startsWith("dev")
    ? 4001 : 4002;

export const SERVER_URL = `http://localhost:${SERVER_PORT}`;

export const DB = {
  name: NODE_ENV.startsWith("prod")
    ? APP._name
    : NODE_ENV.startsWith("dev")
      ? `${APP._name}-dev`
      : `${APP._name}-test`,
  uri: "",
};

DB.uri = `mongodb://127.0.0.1:27017/${DB.name}?retryWrites=true&w=majority`;
