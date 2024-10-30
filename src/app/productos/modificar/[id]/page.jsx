"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModificarProducto() {
    const router = useRouter();
    const { id } = useParams();
    const [producto, setProducto] = useState({ producto: "", cantidad: 0, precio: 0 });

    useEffect(() => {
        async function fetchProducto() {
            const url = `http://localhost:3000/productos/buscarPorId/${id}`;
            const response = await axios.get(url);
            setProducto(response.data);
        }
        fetchProducto();
    }, [id]);

    async function modificarProducto(e) {
        e.preventDefault();
        const url = `http://localhost:3000/productos/modificarProducto/${id}`;
        await axios.put(url, producto);
        router.push("/productos/mostrar");
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={modificarProducto} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Modificar Producto</h1>
                        <p>ID: {id}</p>
                    </div>
                    <div className="card-body">
                        <input
                            placeholder="Producto"
                            className="form-control mb-3"
                            value={producto.producto}
                            onChange={(e) => setProducto({ ...producto, producto: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Cantidad"
                            className="form-control mb-3"
                            value={producto.cantidad}
                            onChange={(e) => setProducto({ ...producto, cantidad: e.target.value })}
                            required
                            type="number"
                        />
                        <input
                            placeholder="Precio"
                            className="form-control mb-3"
                            value={producto.precio}
                            onChange={(e) => setProducto({ ...producto, precio: e.target.value })}
                            required
                            type="number"
                        />
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary col-12">Guardar Cambios</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
