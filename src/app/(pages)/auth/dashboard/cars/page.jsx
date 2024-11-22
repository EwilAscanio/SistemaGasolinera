import axios from "axios";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const loadCars = async () => {
  const { data } = await axios.get("http://localhost:3000/api/cars");

  return data;
};

const ListCarsPage = async () => {
  const cars = await loadCars();

  console.log("VEHICULOS RECIBIDOS RECIBIDOS", cars);

  return (
    <>
      <div className="relative">
        <h1 className="text-center text-3xl font-bold mb-4 mt-4">
          Lista de Vehiculos
        </h1>

        <Link
          href={"/auth/dashboard/cars/registercars"}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:underline absolute right-0 top-0 mr-4 mt-4"
        >
          Crear Vehiculo
        </Link>
      </div>

      <div className=""></div>
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Placa</th>
              <th className="py-2 px-4 bg-gray-200">Modelo</th>
              <th className="py-2 px-4 bg-gray-200">Serial</th>
              <th className="py-2 px-4 bg-gray-200">Color</th>
              <th className="py-2 px-4 bg-gray-200">Max Litros</th>

              <th className="py-2 px-4 bg-gray-200">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.placa_car} className="text-center border-t">
                <td className="py-2 px-4">{car.placa_car}</td>
                <td className="py-2 px-4">{car.modelo_car}</td>
                <td className="py-2 px-4">{car.serial_car}</td>
                <td className="py-2 px-4">{car.color_car}</td>
                <td className="py-2 px-4">{car.maxlitros_car}</td>
                <td className="py-2 px-4">
                  <Link href={``}>
                    <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
                      Actualizar
                    </button>
                  </Link>

                  <Link href={``}>
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

export default ListCarsPage;
