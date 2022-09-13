// acá hago los endpoints de mi api, en este caso los endpoints relacionados a gatos

const express = require("express");
const router = express.Router();
const Gatos = require("../models/gato.js"); //proporciono los datos desde el modelo
const _ = require("underscore"); //acceso a esta biblioteca que me permite funcionalidades adicionales para poder procesar un dato/ingresar un nuevo arreglo, etc.
const Gato = require("../models/gato.js");

//get gatos
router.get("/cats", async (request, response) => {
  try {
    const listaGatitos = await Gatos.find();
    response.render("gatos", {
      // que me devuelva esta información en una vista, que la cree con templates usando el modulo ejs la vista es (http://localhost:3000/api/cats) Para probar nomas
      // "gatos es el nombre del archivo ejs".
      listadoGatos: listaGatitos,
    });
  } catch (error) {
    console.log(error);
  }
});

//post gato
router.post("/cats", (request, response, next) => {
  var gato = new Gatos({
    nombre: request.body.nombre,
    edad: request.body.edad,
    pelaje: request.body.pelaje,
    comida_favorita: request.body.comida_favorita,
  });
  if (gato.nombre && gato.edad && gato.pelaje && gato.comida_favorita) {
    gato.save(function (err, gato) {
      if (err) {
        return next(err);
      }
      response.status(201).json(gato);
    });
  } else {
    response.status(400).json({ error: "Hubo un error" });
  }
});

//delete gato
router.delete("/cats/:nombre", async (request, response) => {
  //como no tengo id, filtro por nombre del gato que deseo quitar
  const { nombre } = request.params;

  if (
    (await Gatos.findOne({ nombre: nombre })) &&
    (await Gatos.findOne({ nombre: nombre })).nombre == nombre
  ) {
    await Gatos.deleteOne({ nombre: nombre });
    response
      .status(200)
      .json({ exito: `El gato ${nombre} se ha eliminado exitosamente` });
  } else {
    response.status(400).json({ error: "Hubo un error" });
  }
});

//put gato (modificar)
router.put("/cats/:nombre", async (request, response) => {
  const { nombre } = request.params; //guardo como variable nombre el parametro

  let gato = await Gatos.findOne({ nombre: nombre });

  if (
    request.body.nombre &&
    request.body.edad &&
    request.body.pelaje &&
    request.body.comida_favorita
  ) {
    gato.nombre = request.body.nombre;
    gato.edad = request.body.edad;
    gato.pelaje = request.body.pelaje;
    gato.comida_favorita = request.body.comida_favorita;
    await gato.save();
    response.status(200).json(gato);
  } else {
    response.status(400).json({
      error:
        "Hubo un error, se esperaba nombre, edad, pelaje y comida favorita",
    });
  }
});
module.exports = router;
