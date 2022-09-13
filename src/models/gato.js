//modelo de tabla gatos
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gatoSchema = new Schema({
  nombre: String,
  edad: String,
  pelaje: String,
  comida_favorita: String,
});

const Gato = mongoose.model("Gato", gatoSchema);

module.exports = Gato; //lo que devolverá el modelo cuando sea requerido
