var ruta = require("express").Router();
var { mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorId, modificarUsuario } = require("../bd/usuariosBD");

ruta.get("/", async (req, res) => {
    const usuarios = await mostrarUsuarios();
    res.json(usuarios);
});

ruta.get("/buscarPorId/:id", async (req, res) => {
    var usuarioValido = await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

ruta.delete("/borrarUsuario/:id", async (req, res) => {
    var borrado = await borrarUsuario(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoUsuario", async (req, res) => {
    var usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

//ruta para modificar usuario
ruta.put("/modificarUsuario/:id", async (req, res) => {
    const id = req.params.id;
    const datosUsuario = req.body;
    const resultado = await modificarUsuario(id, datosUsuario);
    res.json(resultado);
});

module.exports = ruta;
