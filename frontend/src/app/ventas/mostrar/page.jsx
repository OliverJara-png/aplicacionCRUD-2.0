"use client";

import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import CancelarVenta from "@/components/borrarVenta";

async function fetchVentas() {
    const url = "http://localhost:3000/ventas/mostrarVentas";
    
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNRESET') {
            console.error("Connection reset error:", error);
            // Manejo del error de conexión, puedes mostrar un mensaje al usuario aquí
        } else {
            console.error("Error fetching ventas:", error);
        }
        return []; // Devuelve una lista vacía para evitar que falle el renderizado
    }
}

export default function Ventas() {
    const [ventas, setVentas] = useState([]);

    // Función para cargar las ventas
    const loadVentas = async () => {
        const ventasData = await fetchVentas();
        setVentas(ventasData);
    };

    // Cargar las ventas al montar el componente
    useEffect(() => {
        loadVentas();
    }, []);

    return (
        <div>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Usuario</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, i) => (
                        <tr key={i}>
                            <td>{venta.productoNombre}</td>
                            <td>{venta.usuarioNombre}</td>
                            <td>{venta.cantidad}</td>
                            <td>{venta.fecha}</td>
                            <td>{venta.hora}</td>
                            <td>
                                <Link href={`/ventas/modificar/${venta.id}`} className="btn btn-warning me-2">
                                    Modificar
                                </Link>
                                <CancelarVenta id={venta.id} reloadVentas={loadVentas} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
