const expressConfig = require("./src/config/expressConfig");
const express = require("express");
const app = express();
const port = 3000;

expressConfig.configureExpress(app);

app.listen(port, "192.168.115.42", () => {
  console.log(`Listening on port ${port}`);
});
