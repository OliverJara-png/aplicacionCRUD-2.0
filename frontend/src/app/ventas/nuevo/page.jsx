"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AutocompleteInput from "@/components/AutocompleteInput";

export default function NuevaVenta() {
  const router = useRouter();
  const [idUsuario, setIdUsuario] = useState(null);
  const [idProducto, setIdProducto] = useState(null);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [cantidad, setCantidad] = useState("");

  async function guardarVenta(e) {
    e.preventDefault();
    
    if (!idUsuario || !idProducto) {
      alert("Por favor, selecciona un usuario y un producto.");
      return;
    }

    const url = "http://localhost:3000/ventas/nuevaVenta";
    const datos = {
      idUsuario: idUsuario.value,
      idProducto: idProducto.value,
      fecha,
      hora,
      cantidad,
      estatus: "vendido",
    };

    try {
      await axios.post(url, datos);
      router.push("/ventas/mostrar");
    } catch (error) {
      console.error("Error al guardar la venta:", error);
      alert("Hubo un error al guardar la venta. Intenta nuevamente.");
    }
  }

  return (
    <div className="m-0 row justify-content-center">
      <form onSubmit={guardarVenta} className="col-6 mt-5">
        <div className="card">
          <div className="card-header">
            <h1>Nueva Venta</h1>
          </div>
          <div className="card-body">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <AutocompleteInput
              value={idUsuario}
              onChange={setIdUsuario}
              type="usuario"
            />
            <label htmlFor="producto" className="form-label">Producto</label>
            <AutocompleteInput
              value={idProducto}
              onChange={setIdProducto}
              type="producto"
            />
            <label htmlFor="cantidad" className="form-label">Cantidad</label>
            <input
              id="cantidad"
              placeholder="Cantidad"
              className="form-control mb-3"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
              type="number"
            />
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input
              id="fecha"
              placeholder="Fecha"
              className="form-control mb-3"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
              type="date"
            />
            <label htmlFor="hora" className="form-label">Hora</label>
            <input
              id="hora"
              placeholder="Hora"
              className="form-control mb-3"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              required
              type="time"
            />
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary col-12">
              Guardar Venta
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
