const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../clases/UsuarioClase");
const {encriptarPassword, validarPassword}=require("../middlewares/funcionesPassword");

function validarDatos(usuario2){
    var datosCorrectos=false;

    if(usuario2.nombre != undefined && usuario2.usuario != undefined && usuario2.password != undefined){
        datosCorrectos=true;
    }

    return datosCorrectos;
}

async function mostrarUsuarios(){
    const usuarios = await usuariosBD.get();
    //console.log(usuarios);
    var usuariosValidos = [];
    usuarios.forEach(usuario => {
        //console.log(usuario.id);
        const usuario1 = new Usuario({id:usuario.id, ...usuario.data()});
        const usuario2 = usuario1.getusuario
        //console.log(usuario1.getusuario);
        if(validarDatos(usuario2)){
            usuariosValidos.push(usuario2);
        }
    });
    //console.log(usuariosValidos); 
    return usuariosValidos; 
}

async function buscarPorId(id) {
    const usuario = await usuariosBD.doc(id).get();
    const usuario1 = new Usuario({id:usuario.id,...usuario.data()});
    var usuarioValido = {error:true};
    if (validarDatos(usuario1.getusuario)){
        usuarioValido = usuario1.getusuario
    }
    //console.log(usuarioValido);
    return usuarioValido
}

async function nuevoUsuario(data) {
    const {salt,hash}=encriptarPassword(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1 = new Usuario(data);
    var usuarioValido = false;
    if (validarDatos(usuario1.getusuario)){
        await usuariosBD.doc().set(usuario1.getusuario);
        usuarioValido=true;
    }
    return usuarioValido;
}

async function borrarUsuario(id) {
    const usuario = await buscarPorId(id);
    var borrado = false;
    if(usuario.error != true){
        await usuariosBD.doc(id).delete();
        borrado = true;
    }
    //console.log(usuario);
    return borrado;
}

async function modificarUsuario(id, data) {
    // Encriptar la contraseña si se ha proporcionado una nueva
    if (data.password) {
        const { salt, hash } = encriptarPassword(data.password);
        data.password = hash;
        data.salt = salt;
    }

    // Validar que al menos uno de los campos a modificar esté presente
    const usuarioValido = validarDatos({ ...data, password: data.password || "dummy" });
    if (!usuarioValido) {
        return { error: "Datos insuficientes para la modificación" };
    }

    // Actualizar el documento en Firestore
    try {
        await usuariosBD.doc(id).update(data); // Solo actualiza los campos enviados
        return { success: true, message: "Usuario modificado exitosamente" };
    } catch (error) {
        console.error("Error al modificar el usuario:", error);
        return { error: "No se pudo modificar el usuario" };
    }
}


module.exports={
    mostrarUsuarios,
    nuevoUsuario,
    borrarUsuario,
    buscarPorId,
    modificarUsuario
}

//borrarUsuario("100");
//borrarUsuario("200");
//borrarUsuario("500");

/*data={
    nombre:"Benito Juarez",
    usuario:"benito",
    password:"abc"
}

nuevoUsuario(data);*/

//buscarPorId("100"); 
//buscarPorId("200");
//mostrarUsuarios();