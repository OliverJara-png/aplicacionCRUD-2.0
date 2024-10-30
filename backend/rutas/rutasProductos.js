var ruta = require("express").Router();
var { mostrarProductos, nuevoProducto, borrarProducto, buscarProductoPorId, modificarProducto } = require("../bd/productosBD");

ruta.get("/", async (req, res) => {
    const productos = await mostrarProductos();
    res.json(productos);
});

ruta.get("/buscarPorId/:id", async (req, res) => {
    var productoValido = await buscarProductoPorId(req.params.id);
    res.json(productoValido);
});

ruta.delete("/borrarProducto/:id", async (req, res) => {
    var borrado = await borrarProducto(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoProducto", async (req, res) => {
    var productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

// Ruta para modificar producto
ruta.put("/modificarProducto/:id", async (req, res) => {
    const id = req.params.id;
    const datosProducto = req.body;
    const resultado = await modificarProducto(id, datosProducto);
    res.json(resultado);
});

module.exports = ruta;
