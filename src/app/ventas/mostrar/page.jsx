import Link from "next/link";
import axios from "axios";
import CancelarVenta from "@/components/borrarVenta";

async function getVentas() {
    const url = "http://localhost:3000/ventas/mostrarVentas";
    try {
        const response = await axios.get(url);
        console.log("Ventas obtenidas:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        return [];
    }
}

export default async function Ventas() {
    const ventas = await getVentas();

    return (
        <>
            <h1>Ventas</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID Usuario</th>
                        <th>ID Producto</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{venta.idUsuario}</td>
                            <td>{venta.idProducto}</td>
                            <td>{venta.fecha}</td>
                            <td>{venta.hora}</td>
                            <td>{venta.estatus}</td>
                            <td>
                                <Link href={`/ventas/modificar/${venta.id}`} className="btn btn-warning me-2">
                                    Modificar
                                </Link>
                                <CancelarVenta id={venta.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
