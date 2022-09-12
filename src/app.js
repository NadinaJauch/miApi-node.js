const { response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");

//Settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.use(require("./rutas/app.js")); //le pido el modulo
app.use("/api/", require("./rutas/cats.js"));

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
