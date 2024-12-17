import axios from "axios";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const loadUsoVehiculo = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/usocars`
  );

  return data;
};

const UsoVehiculoPage = async () => {
  const usoVehiculo = await loadUsoVehiculo();

  return (
    <>
      <div className="relative">
        <h1 className="text-center text-3xl font-bold mb-4 mt-4">
          Categoria Uso de Vehiculos
        </h1>

        <Link
          href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/usovehiculo/registrar`}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:underline absolute right-0 top-0 mr-4 mt-4"
        >
          Crear Categoria
        </Link>
      </div>

      <div className=""></div>
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white text-center">
          <thead>
            <tr>
              <th className="py-2 px-12 bg-gray-200">Id</th>
              <th className="py-2 px-4 bg-gray-200">Nombre</th>
              <th className="py-2 px-4 bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usoVehiculo.map((usoVehiculo) => (
              <tr key={usoVehiculo.id_uso} className="text-center border-t">
                <td className="py-2 px-4">{usoVehiculo.id_uso}</td>
                <td className="py-2 px-4">{usoVehiculo.name_uso}</td>
                <td className="py-2 px-4">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/usovehiculo/actualizar/${usoVehiculo.id_uso}`}
                  >
                    <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                      Actualizar
                    </button>
                  </Link>

                  <Link
                    href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard/usovehiculo/eliminar/${usoVehiculo.id_uso}`}
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

export default UsoVehiculoPage;
