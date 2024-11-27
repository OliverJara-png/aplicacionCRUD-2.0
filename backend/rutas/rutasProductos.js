const ruta = require("express").Router();
const { mostrarProductos, nuevoProducto, borrarProducto, buscarProductoPorId, modificarProducto } = require("../bd/productosBD");
const productosBD = require("../bd/conexion").productos; // Importar productosBD para buscarProductoPorNombre

ruta.get("/", async (req, res) => {
    const productos = await mostrarProductos();
    res.json(productos);
});

ruta.get("/buscarPorId/:id", async (req, res) => {
    const productoValido = await buscarProductoPorId(req.params.id);
    res.json(productoValido);
});

ruta.delete("/borrarProducto/:id", async (req, res) => {
    const borrado = await borrarProducto(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoProducto", async (req, res) => {
    const productoValido = await nuevoProducto(req.body);
    res.json(productoValido);
});

ruta.put("/modificarProducto/:id", async (req, res) => {
    const id = req.params.id;
    const datosProducto = req.body;
    const resultado = await modificarProducto(id, datosProducto);
    res.json(resultado);
});

ruta.get("/buscarProductoPorNombre/:nombre", async (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const productosSnapshot = await productosBD.get();
    const productos = [];
    
    productosSnapshot.forEach((doc) => {
        const producto = doc.data();
        if (producto.producto.toLowerCase().includes(nombre)) {
            productos.push({ id: doc.id, nombre: producto.producto });
        }
    });
    
    res.json(productos);
});

module.exports = ruta;
