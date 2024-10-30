"use client";
import axios from "axios";

export default function BorrarProducto({ id }) {
    async function borrar(e) {
        e.preventDefault();
        const url = `http://localhost:3000/productos/borrarProducto/${id}`;
        await axios.delete(url);
        window.location.reload();
    }

    return (
        <button onClick={borrar} className="btn btn-danger">
            Borrar
        </button>
    );
}
