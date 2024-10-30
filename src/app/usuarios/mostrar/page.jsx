import BorrarUsuario from "@/components/borrar";
import Link from "next/link";
import axios from "axios";

async function getUsuarios() {
    const url = "http://localhost:3000/usuarios";
    const Usuarios = await axios.get(url);
    return Usuarios.data;
}

export default async function Usuarios() {
    const usuarios = await getUsuarios();
    return (
        <>
            <h1>Usuarios</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.usuario}</td>
                            <td>
                                <Link href={`/usuarios/modificar/${usuario.id}`} className="btn btn-warning me-2">Modificar</Link>
                                <BorrarUsuario id={usuario.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
