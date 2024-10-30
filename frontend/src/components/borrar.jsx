"use client";
import Link from "next/link";
import axios from "axios";

export default function BorrarUsuario({ id }) {
    async function borrar(e) {
        e.preventDefault();
        const url = `http://localhost:3000/usuarios/borrarUsuario/${id}`;
        const respuesta = await axios.delete(url);
        console.log(respuesta);
        window.location.replace("/usuarios/mostrar");
    }

    return (
        <Link href="" onClick={borrar} className="btn btn-danger">
            Borrar
        </Link>
    );
}
