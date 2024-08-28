const gameRoutes = require("../routes/gameRoutes");
const cors = require("cors");

const configureExpress = (app) => {
  console.log(1);
  // const corsOptions = {
  //   origin: "http://localhost:8081",
  //   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  //   allowedHeaders: ["Content-Type", "Authorization"],
  // };
  app.use(cors());

  app.use("/game", gameRoutes);
};

module.exports = { configureExpress };
