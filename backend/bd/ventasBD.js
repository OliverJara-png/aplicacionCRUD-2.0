const { productos, usuarios } = require("./conexion"); // Importar las colecciones necesarias
const ventasBD = require("./conexion").bd.collection("ventas");
const Venta = require("../clases/VentaClase");

async function nuevaVenta(data) {
    if (!data.idUsuario || !data.idProducto || data.cantidad === undefined) {
        throw new Error('Faltan campos necesarios para crear la venta');
    }

    const venta = new Venta(data);
    const ventaData = venta.getventa;

    await ventasBD.doc().set(ventaData);
    return ventaData;
}

async function mostrarVentas() {
    const ventasSnapshot = await ventasBD.where("estatus", "==", "vendido").get();
    let ventas = [];

    for (let doc of ventasSnapshot.docs) {
        const ventaData = doc.data();

        // Usar las colecciones correctamente para obtener los documentos de producto y usuario
        const productoDoc = await productos.doc(ventaData.idProducto).get();
        const usuarioDoc = await usuarios.doc(ventaData.idUsuario).get();

        const venta = {
            id: doc.id,
            productoNombre: productoDoc.exists ? productoDoc.data().producto : "Producto no encontrado",
            usuarioNombre: usuarioDoc.exists ? usuarioDoc.data().nombre : "Usuario no encontrado",
            cantidad: ventaData.cantidad,
            fecha: ventaData.fecha,
            hora: ventaData.hora,
            estatus: ventaData.estatus,
        };

        ventas.push(venta);
    }

    return ventas;
}

async function buscarVentaPorId(id) {
    const venta = await ventasBD.doc(id).get();
    if (!venta.exists) {
        console.log("Venta no encontrada con el ID:", id);
        return { error: "Venta no encontrada" };
    }
    const ventaData = { id: venta.id, ...venta.data() };
    console.log("Venta encontrada:", ventaData); // Verifica el contenido
    return ventaData;
}

async function cancelarVenta(id) {
    const venta = await ventasBD.doc(id).get();
    if (!venta.exists) {
        return { error: "Venta no encontrada" };
    }

    await ventasBD.doc(id).update({ estatus: "cancelado" });
    return { message: "Venta cancelada" };
}

// Verifica que todos los IDs sean válidos antes de acceder a los documentos de Firestore
async function modificarVenta(id, data) {
    const venta = await ventasBD.doc(id).get();
    if (!venta.exists) {
        return { error: "Venta no encontrada" };
    }

    // Verifica que los datos incluyen IDs válidos
    if (!data.idUsuario || !data.idProducto) {
        throw new Error("Faltan campos necesarios para modificar la venta");
    }

    await ventasBD.doc(id).update(data);
    return { message: "Venta modificada exitosamente" };
}



module.exports = {
    nuevaVenta,
    mostrarVentas,
    buscarVentaPorId,
    cancelarVenta,
    modificarVenta
};
