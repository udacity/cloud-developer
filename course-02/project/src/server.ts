import app from "./app";

(async () => {
  // Set the network port
  const port = process.env.PORT || 8080;

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();