"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NuevaVenta() {
    const router = useRouter();

    async function guardarVenta(e) {
        e.preventDefault();
        const url = "http://localhost:3000/ventas/nuevaVenta";
        const datos = {
            idUsuario: document.getElementById("idUsuario").value,
            idProducto: document.getElementById("idProducto").value,
            fecha: document.getElementById("fecha").value,
            hora: document.getElementById("hora").value,
            estatus: "vendido"
        };
        await axios.post(url, datos);
        router.push("/ventas/mostrar");
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarVenta} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Nueva Venta</h1>
                    </div>
                    <div className="card-body">
                        <input placeholder="ID Usuario" className="form-control mb-3" id="idUsuario" required />
                        <input placeholder="ID Producto" className="form-control mb-3" id="idProducto" required />
                        <input placeholder="Fecha" className="form-control mb-3" id="fecha" required type="date" />
                        <input placeholder="Hora" className="form-control mb-3" id="hora" required type="time" />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary col-12">Guardar Venta</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
