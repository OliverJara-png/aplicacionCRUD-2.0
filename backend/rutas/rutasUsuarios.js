const ruta = require("express").Router();
const {
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId,
    modificarUsuario,
    login,
    buscarUsuarioPorNombre, // Importa la función de búsqueda
} = require("../bd/usuariosBD");

ruta.post("/login", async (req, res) => {
    const usuario = await login(req, req.body.usuario, req.body.password);
    res.json(usuario);
});

ruta.get("/", async (req, res) => {
    const usuarios = await mostrarUsuarios();
    res.json(usuarios);
});

ruta.get("/buscarPorId/:id", async (req, res) => {
    const usuarioValido = await buscarPorId(req.params.id);
    res.json(usuarioValido);
});

ruta.delete("/borrarUsuario/:id", async (req, res) => {
    const borrado = await borrarUsuario(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoUsuario", async (req, res) => {
    const usuarioValido = await nuevoUsuario(req.body);
    res.json(usuarioValido);
});

// Ruta para modificar usuario
ruta.put("/modificarUsuario/:id", async (req, res) => {
    const id = req.params.id;
    const datosUsuario = req.body;
    const resultado = await modificarUsuario(id, datosUsuario);
    res.json(resultado);
});

// Ruta para buscar usuario por nombre
ruta.get("/buscarUsuarioPorNombre/:nombre", async (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const usuarios = await buscarUsuarioPorNombre(nombre); // Llama a la función desde usuariosBD.js
    res.json(usuarios);
});

module.exports = ruta;
