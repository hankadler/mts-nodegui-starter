import server from "./server";
import client from "./client";

const main = async () => {
  await server.start();
  await client.start();
};

/*
process.on("uncaughtException", async ({ message }) => {
  console.error(message);
});
*/

process.on("SIGTERM", async () => {
  console.log("Process terminated.");
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("Process interrupted.");
  process.exit(0);
});

main().catch(({ message }) => {
  console.error(message);
  process.exit(0);
});
