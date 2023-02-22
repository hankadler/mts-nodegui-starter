import mongoose from "mongoose";

const connection = { url: "" };

/**
 * Connects to mongoDB.
 */
const connect = async (uri: string): Promise<typeof mongoose> => {
  const conn = await mongoose.connect(uri);
  const { host, port, name } = conn.connections[0];
  connection.url = `mongodb://${host}:${port}/${name}`;
  console.debug(`Connected to: ${connection.url}`);
  return conn;
};

/**
 * Disconnects from mongoDB.
 */
const disconnect = async () => {
  await mongoose.disconnect();
  console.debug(`Disconnected from: ${connection.url}`);
  connection.url = "";
};

/**
 * Drops active mongoDB.
 */
const drop = async () => mongoose.connection.db.dropDatabase();

mongoose.set("strictQuery", false);
mongoose.set("runValidators", true);
mongoose.set("returnOriginal", false);

export default { connect, disconnect, drop };
