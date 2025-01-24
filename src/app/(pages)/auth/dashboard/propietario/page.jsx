import axios from "axios";
import Link from "next/link";

const loadPropietario = async () => {
  const { data } = await axios.get(
    `${NEXT_PUBLIC_NEXTAUTH_URL}/api/propietario`
  );

  return data;
};

const ListPropietarioPage = async () => {
  const propietario = await loadPropietario();

  return (
    <>
      <div className="relative">
        <h1 className="text-center text-3xl font-bold mb-4 mt-4">
          Lista de Propietarios
        </h1>

        <Link
          href={"/auth/dashboard/propietario/registerpropietario"}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:underline absolute right-0 top-0 mr-4 mt-4"
        >
          Crear Propietario
        </Link>
      </div>

      <div className=""></div>
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Cedula</th>
              <th className="py-2 px-4 bg-gray-200">Nombre</th>
              <th className="py-2 px-4 bg-gray-200">Apellido</th>
              <th className="py-2 px-4 bg-gray-200">Direccion</th>
              <th className="py-2 px-4 bg-gray-200">Telefono</th>
              <th className="py-2 px-4 bg-gray-200">Email</th>
              <th className="py-2 px-4 bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {propietario.map((propietario) => (
              <tr key={propietario.cedula_pro} className="text-center border-t">
                <td className="py-2 px-4">{propietario.cedula_pro}</td>
                <td className="py-2 px-4">{propietario.name_pro}</td>
                <td className="py-2 px-4">{propietario.apellido_pro}</td>
                <td className="py-2 px-4">{propietario.direccion_pro}</td>
                <td className="py-2 px-4">{propietario.telefono_pro}</td>
                <td className="py-2 px-4">{propietario.email_pro}</td>

                <td className="py-2 px-4">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/propietario/actualizarpropietario/${propietario.cedula_pro}`}
                  >
                    <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                      Actualizar
                    </button>
                  </Link>

                  <Link
                    href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/propietario/eliminarpropietario/${propietario.cedula_pro}`}
                  >
                    <button className="bg-red-500 text-white py-1 px-3 rounded">
                      Eliminar
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListPropietarioPage;
