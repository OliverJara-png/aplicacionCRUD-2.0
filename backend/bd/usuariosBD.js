const { usuarios: usuariosBD } = require("./conexion"); // Asegura que 'usuariosBD' esté definido
const Usuario = require("../clases/UsuarioClase");
const { encriptarPassword, validarPassword } = require("../middlewares/funcionesPassword");

function validarDatos(usuario2) {
    return usuario2.nombre !== undefined && usuario2.usuario !== undefined && usuario2.password !== undefined;
}

async function login(req, usuario, password) {
    const usuarios = await usuariosBD.where("usuario", "==", usuario).get();
    let user = { usuario: "anonimo", tipoUsuario: "sin acceso" };

    usuarios.forEach(usu => {
        const passwordValido = validarPassword(password, usu.data().password, usu.data().salt);
        if (passwordValido) {
            if (usu.data().tipoUsuario === "usuario") {
                req.session.usuario = usu.data().usuario;
                user = { usuario: req.session.usuario, tipoUsuario: "usuario" };
            } else if (usu.data().tipoUsuario === "admin") {
                req.session.admin = usu.data().usuario;
                user = { usuario: req.session.admin, tipoUsuario: "admin" };
            }
        }
    });
    return user;
}

async function mostrarUsuarios() {
    const usuarios = await usuariosBD.get();
    const usuariosValidos = [];

    usuarios.forEach(usuario => {
        const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
        const usuario2 = usuario1.getusuario;
        if (validarDatos(usuario2)) {
            usuariosValidos.push(usuario2);
        }
    });
    return usuariosValidos;
}

async function buscarPorId(id) {
    const usuario = await usuariosBD.doc(id).get();
    const usuario1 = new Usuario({ id: usuario.id, ...usuario.data() });
    return validarDatos(usuario1.getusuario) ? usuario1.getusuario : { error: true };
}

async function nuevoUsuario(data) {
    const { salt, hash } = encriptarPassword(data.password);
    data.password = hash;
    data.salt = salt;
    data.tipoUsuario = "usuario";
    const usuario1 = new Usuario(data);

    if (validarDatos(usuario1.getusuario)) {
        await usuariosBD.doc().set(usuario1.getusuario);
        return true;
    }
    return false;
}

async function borrarUsuario(id) {
    const usuario = await buscarPorId(id);
    if (usuario.error !== true) {
        await usuariosBD.doc(id).delete();
        return true;
    }
    return false;
}

async function modificarUsuario(id, data) {
    if (data.password) {
        const { salt, hash } = encriptarPassword(data.password);
        data.password = hash;
        data.salt = salt;
    }
    if (!validarDatos({ ...data, password: data.password || "dummy" })) {
        return { error: "Datos insuficientes para la modificación" };
    }

    try {
        await usuariosBD.doc(id).update(data);
        return { success: true, message: "Usuario modificado exitosamente" };
    } catch (error) {
        console.error("Error al modificar el usuario:", error);
        return { error: "No se pudo modificar el usuario" };
    }
}

// Función para buscar usuario por nombre
async function buscarUsuarioPorNombre(nombre) {
    const usuariosSnapshot = await usuariosBD.get();
    const usuarios = [];

    usuariosSnapshot.forEach(doc => {
        const usuario = doc.data();
        if (usuario.nombre.toLowerCase().includes(nombre)) {
            usuarios.push({ id: doc.id, nombre: usuario.nombre });
        }
    });

    return usuarios;
}

module.exports = {
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId,
    modificarUsuario,
    login,
    buscarUsuarioPorNombre // Exporta la función
};
