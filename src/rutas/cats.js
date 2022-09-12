const { Router } = require("express");
const router = Router();
const gatos = require("../ejemplo.json"); //proporciono los datos desde un json
const _ = require("underscore"); //acceso a esta biblioteca que me permite funcionalidades adicionales para poder procesar un dato/ingresar un nuevo arreglo, etc.

//get gatos
router.get("/cats", (request, response) => {
  response.send(gatos);
});
module.exports = router;

//post gato
router.post("/cats", (request, response) => {
  const { nombre, edad, pelaje, comida_favorita } = request.body;
  const newCat = { ...request.body };
  if (nombre && edad && pelaje && comida_favorita) {
    gatos.push(newCat);
    response.json(gatos);
  } else {
    response.status(500).json({ error: "Hubo un error" });
  }
});

//delete gato
router.delete("/cats/:nombre", (request, response) => {
  //como no tengo id, filtro por nombre del gato que deseo quitar
  const { nombre } = request.params;
  if (nombre) {
    _.each(gatos, (gato, i) => {
      //recorro el arreglo gatos
      if (gato.nombre == nombre) {
        gatos.splice(i, 1);
      }
    });
    response.json(gatos);
  }
});

//put gato (modificar)
router.put("/cats/:nombre", (request, response) => {
  const { nombre } = request.params;
  const { edad, pelaje, comida_favorita } = request.body;
  if (nombre && edad && pelaje && comida_favorita) {
    _.each(gatos, (gato, i) => {
      if (gato.nombre === nombre) {
        gato.nombre = nombre;
        gato.edad = edad;
        gato.pelaje = pelaje;
        gato.comida_favorita = comida_favorita;
      }
    });
    response.json(gatos);
  } else {
    response.status(500).json({
      error:
        "Hubo un error, se esperaba nombre, edad, pelaje y comida favorita",
    });
  }
});
