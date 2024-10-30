const express = require("express");
const { nuevaVenta, mostrarVentas, buscarVentaPorId, cancelarVenta, modificarVenta } = require("../bd/ventasBD");
const ruta = express.Router();

ruta.post("/nuevaVenta", async (req, res) => {
    try {
        const venta = await nuevaVenta(req.body);
        res.json(venta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

ruta.get("/mostrarVentas", async (req, res) => {
    const ventas = await mostrarVentas();
    res.json(ventas);
});

ruta.get("/buscarVentaPorId/:id", async (req, res) => {
    const venta = await buscarVentaPorId(req.params.id);
    res.json(venta);
});

ruta.put("/cancelarVenta/:id", async (req, res) => {
    const respuesta = await cancelarVenta(req.params.id);
    res.json(respuesta);
});

ruta.put("/modificarVenta/:id", async (req, res) => {
    const id = req.params.id;
    const datosVenta = req.body;
    const respuesta = await modificarVenta(id, datosVenta);
    res.json(respuesta);
});

module.exports = ruta;
