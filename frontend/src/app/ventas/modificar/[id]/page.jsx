"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModificarVenta() {
    const router = useRouter();
    const { id } = useParams(); // Captura el ID de los parámetros de la URL
    const [venta, setVenta] = useState({ idUsuario: "", idProducto: "", fecha: "", hora: "", estatus: "" });

    console.log("ID recibido en ModificarVenta:", id); // Verifica que el ID se esté obteniendo

    useEffect(() => {
        async function fetchVenta() {
            if (!id) {
                console.error("ID no definido");
                return;
            }
            const url = `http://localhost:3000/ventas/buscarVentaPorId/${id}`;
            try {
                const response = await axios.get(url);
                console.log("Datos de la venta recibidos:", response.data); // Verifica los datos recibidos
                if (response.data && !response.data.error) {
                    setVenta(response.data);
                } else {
                    console.error("Venta no encontrada o error en la respuesta");
                }
            } catch (error) {
                console.error("Error al obtener la venta:", error);
            }
        }
        fetchVenta();
    }, [id]);

    async function modificarVenta(e) {
        e.preventDefault();
        const url = `http://localhost:3000/ventas/modificarVenta/${id}`;
        try {
            await axios.put(url, venta);
            router.push("/ventas/mostrar");
        } catch (error) {
            console.error("Error al modificar la venta:", error);
        }
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={modificarVenta} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Modificar Venta</h1>
                        <p>ID: {id}</p> {/* Muestra el ID aquí para verificar */}
                    </div>
                    <div className="card-body">
                        <input
                            placeholder="ID Usuario"
                            className="form-control mb-3"
                            value={venta.idUsuario}
                            onChange={(e) => setVenta({ ...venta, idUsuario: e.target.value })}
                            required
                        />
                        <input
                            placeholder="ID Producto"
                            className="form-control mb-3"
                            value={venta.idProducto}
                            onChange={(e) => setVenta({ ...venta, idProducto: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Fecha"
                            className="form-control mb-3"
                            value={venta.fecha}
                            onChange={(e) => setVenta({ ...venta, fecha: e.target.value })}
                            required
                            type="date"
                        />
                        <input
                            placeholder="Hora"
                            className="form-control mb-3"
                            value={venta.hora}
                            onChange={(e) => setVenta({ ...venta, hora: e.target.value })}
                            required
                            type="time"
                        />
                        <select
                            className="form-control mb-3"
                            value={venta.estatus}
                            onChange={(e) => setVenta({ ...venta, estatus: e.target.value })}
                            required
                        >
                            <option value="vendido">Vendido</option>
                            <option value="cancelado">Cancelado</option>
                        </select>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary col-12">Guardar Cambios</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
