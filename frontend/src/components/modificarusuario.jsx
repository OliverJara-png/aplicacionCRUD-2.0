"use client"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ModificarUsuario({ id }) {
    const router = useRouter();

    async function modificarUsuario(e) {
        e.preventDefault();
        const url = `http://localhost:3000/usuarios/modificarUsuario/${id}`;
        const datos = {
            nombre: document.getElementById("nombre").value,
            usuario: document.getElementById("usuario").value,
            password: document.getElementById("password").value
        };
        await axios.put(url, datos);
        router.push("/usuarios/mostrar");
    }

    return (
        <form onSubmit={modificarUsuario}>
            <input placeholder="Nombre" id="nombre" required />
            <input placeholder="Usuario" id="usuario" required />
            <input placeholder="Password" id="password" required />
            <button type="submit">Guardar cambios</button>
        </form>
    );
}
