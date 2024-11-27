const productosBD = require("./conexion").productos;
const Producto = require("../clases/ProductoClase");

function validarDatosProducto(producto) {
    return producto.producto !== undefined && producto.cantidad !== undefined && producto.precio !== undefined;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    const productosValidos = [];
    
    productos.forEach(producto => {
        const productoData = new Producto({ id: producto.id, ...producto.data() });
        const productoValido = productoData.getproducto;
        if (validarDatosProducto(productoValido)) {
            productosValidos.push(productoValido);
        }
    });
    
    return productosValidos;
}

async function buscarProductoPorId(id) {
    const producto = await productosBD.doc(id).get();
    const productoData = new Producto({ id: producto.id, ...producto.data() });
    
    return validarDatosProducto(productoData.getproducto) ? productoData.getproducto : { error: true };
}

async function nuevoProducto(data) {
    if (!data.producto || !data.cantidad || !data.precio) {
        return { error: "Faltan datos para crear el producto" };
    }
    
    const productoData = new Producto(data);
    if (validarDatosProducto(productoData.getproducto)) {
        await productosBD.doc().set(productoData.getproducto);
        return true;
    }

    return false;
}

async function borrarProducto(id) {
    const producto = await buscarProductoPorId(id);
    if (producto.error) return false;

    await productosBD.doc(id).delete();
    return true;
}

async function modificarProducto(id, data) {
    if (!data.producto && !data.cantidad && !data.precio) {
        return { error: "Faltan datos para modificar el producto" };
    }
    
    const productoData = new Producto(data);
    if (!validarDatosProducto(productoData.getproducto)) {
        return { error: "Datos no válidos para modificar el producto" };
    }
    
    try {
        await productosBD.doc(id).update(data);
        return { success: true, message: "Producto modificado exitosamente" };
    } catch (error) {
        console.error("Error al modificar el producto:", error);
        return { error: "No se pudo modificar el producto" };
    }
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarProductoPorId,
    modificarProducto
};
