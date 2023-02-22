import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers, context } from "../schema";
import { DB, NODE_ENV, SERVER_PORT } from "../../config";
import db from "./db";

const start = async () => {
  await db.connect(DB.uri);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // @ts-ignore
    formatError: ({ message, extensions: { code, stacktrace } }) => ({ code, message, stacktrace }),
    csrfPrevention: true,
    introspection: !NODE_ENV.startsWith("prod"),
  });

  // @ts-ignore
  const { url } = await startStandaloneServer(server, { context, listen: { port: SERVER_PORT } });

  console.log(`gql @ ${url}`);

  process.on("SIGINT", async () => {
    await server.stop();
    console.log("\nServer stopped");
    process.exit(0);
  });
};

export default { start };
