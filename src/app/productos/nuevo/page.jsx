"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function NuevoProducto() {
    const router = useRouter();

    async function guardarProducto(e) {
        e.preventDefault();
        const url = "http://localhost:3000/productos/nuevoProducto";
        const datos = {
            producto: document.getElementById("producto").value,
            cantidad: document.getElementById("cantidad").value,
            precio: document.getElementById("precio").value
        };
        await axios.post(url, datos);
        router.push("/productos/mostrar");
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={guardarProducto} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Nuevo Producto</h1>
                    </div>
                    <div className="card-body">
                        <input placeholder="Producto" className="form-control mb-3" id="producto" required />
                        <input placeholder="Cantidad" className="form-control mb-3" id="cantidad" required type="number" />
                        <input placeholder="Precio" className="form-control mb-3" id="precio" required type="number" />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary col-12">Guardar Producto</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
