const { response } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");

//acá levanto el servidor y hago las configuraciones pertinentes

//Conexion a base de datos
const mongoose = require("mongoose");

const user = "admin";
const password = "admin";
const dbname = "guarderia";
const uri = `mongodb+srv://${user}:${password}@cluster0.phxf9s7.mongodb.net/guarderia`;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB conectado"))
  .catch((e) => console.log(e));

// Motor de plantillas
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//Settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//rutas
app.use("/api/", require("./rutas/cats.js"));

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
}); //escucha y vincula conexion en el host y puerto especificado
