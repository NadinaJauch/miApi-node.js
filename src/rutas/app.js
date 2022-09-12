//desde express quiero tener el metodo router
const { Router } = require("express");
const router = Router();

//get
router.get("/get", (req, response) => {
  const data = {
    nombre: "nuchi",
    apellido: "jauch",
  };
  response.json(data);
});

module.exports = router; //puedo usar este modulo desde otros archivos
