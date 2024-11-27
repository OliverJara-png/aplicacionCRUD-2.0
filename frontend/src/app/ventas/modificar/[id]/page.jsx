"use client";

import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AutocompleteInput from "@/components/AutocompleteInput";

export default function ModificarVenta() {
  const router = useRouter();
  const { id } = useParams();
  const [venta, setVenta] = useState({ idUsuario: "", idProducto: "", cantidad: "", fecha: "", hora: "", estatus: "" });

  useEffect(() => {
    async function fetchVenta() {
      if (!id) {
        console.error("ID no definido");
        return;
      }
      const url = `http://localhost:3000/ventas/buscarVentaPorId/${id}`;
      try {
        const response = await axios.get(url);
        if (response.data && !response.data.error) {
          const ventaData = response.data;
          const usuarioResponse = await axios.get(`http://localhost:3000/usuarios/buscarPorId/${ventaData.idUsuario}`);
          const productoResponse = await axios.get(`http://localhost:3000/productos/buscarPorId/${ventaData.idProducto}`);
          const ventaConNombres = {
            ...ventaData,
            idUsuario: { value: ventaData.idUsuario, label: usuarioResponse.data.nombre },
            idProducto: { value: ventaData.idProducto, label: productoResponse.data.producto }
          };
          setVenta(ventaConNombres);
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
      const datosVenta = {
        idUsuario: venta.idUsuario.value, // Asegúrate de obtener solo el ID
        idProducto: venta.idProducto.value, // Asegúrate de obtener solo el ID
        cantidad: venta.cantidad,
        fecha: venta.fecha,
        hora: venta.hora,
        estatus: venta.estatus
      };
      await axios.put(url, datosVenta);
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
            <p>ID: {id}</p>
          </div>
          <div className="card-body">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <AutocompleteInput
              value={venta.idUsuario}
              onChange={(selectedOption) => setVenta({ ...venta, idUsuario: selectedOption })}
              type="usuario"
            />
            <label htmlFor="producto" className="form-label">Producto</label>
            <AutocompleteInput
              value={venta.idProducto}
              onChange={(selectedOption) => setVenta({ ...venta, idProducto: selectedOption })}
              type="producto"
            />
            <label htmlFor="cantidad" className="form-label">Cantidad</label>
            <input
              id="cantidad"
              className="form-control mb-3"
              value={venta.cantidad}
              onChange={(e) => setVenta({ ...venta, cantidad: e.target.value })}
              required
              type="number"
            />
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input
              id="fecha"
              className="form-control mb-3"
              value={venta.fecha}
              onChange={(e) => setVenta({ ...venta, fecha: e.target.value })}
              required
              type="date"
            />
            <label htmlFor="hora" className="form-label">Hora</label>
            <input
              id="hora"
              className="form-control mb-3"
              value={venta.hora}
              onChange={(e) => setVenta({ ...venta, hora: e.target.value })}
              required
              type="time"
            />
            <label htmlFor="estatus" className="form-label">Estatus</label>
            <select
              id="estatus"
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
            <button type="submit" className="btn btn-primary col-12">
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
