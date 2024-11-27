"use client";
import axios from "axios";

export default function CancelarVenta({ id, reloadVentas }) {
    async function cancelarVenta(e) {
        e.preventDefault();
        const confirmacion = window.confirm("¿Estás seguro de que deseas cancelar esta venta?");
        if (confirmacion) {
            try {
                const url = `http://localhost:3000/ventas/cancelarVenta/${id}`;
                await axios.put(url);
                reloadVentas(); // Llama a la función para recargar las ventas
            } catch (error) {
                console.error("Error al cancelar la venta:", error);
            }
        }
    }

    return (
        <button onClick={cancelarVenta} className="btn btn-danger">
            Cancelar
        </button>
    );
}
