"use client";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModificarUsuario() {
    const router = useRouter();
    const { id } = useParams();
    const [usuario, setUsuario] = useState({ nombre: "", usuario: "", password: "" });

    useEffect(() => {
        async function fetchUsuario() {
            const url = `http://localhost:3000/usuarios/buscarPorId/${id}`;
            const response = await axios.get(url);
            setUsuario(response.data);
        }
        fetchUsuario();
    }, [id]);

    async function modificarUsuario(e) {
        e.preventDefault();
        const url = `http://localhost:3000/usuarios/modificarUsuario/${id}`;
        await axios.put(url, usuario);
        router.push("/usuarios/mostrar");
    }

    return (
        <div className="m-0 row justify-content-center">
            <form onSubmit={modificarUsuario} className="col-6 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h1>Modificar Usuario</h1>
                        <p>ID: {id}</p>
                    </div>
                    <div className="card-body">
                        <input
                            placeholder="Nombre"
                            className="form-control mb-3"
                            value={usuario.nombre}
                            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Usuario"
                            className="form-control mb-3"
                            value={usuario.usuario}
                            onChange={(e) => setUsuario({ ...usuario, usuario: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Password"
                            className="form-control mb-3"
                            value={usuario.password}
                            onChange={(e) => setUsuario({ ...usuario, password: e.target.value })}
                            required
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
