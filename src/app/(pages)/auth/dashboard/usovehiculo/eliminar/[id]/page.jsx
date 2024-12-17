import axios from "axios";
import { BiSolidCategory } from "react-icons/bi";
import EliminarUsoVehiculo from "@/components/EliminarUsoVehiculo";

const loadUsoVehiculo = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/usocars/${id}`
  );

  return data;
};

const PageEliminarUso = async ({ params }) => {
  const usoVehiculo = await loadUsoVehiculo(params.id);

  return (
    <div className="  flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Eliminar Categoría Uso Vehiculo
          </h1>
          <p className="text-gray-600 mt-2">Los Datos a Eliminar</p>
        </div>
        <form className="space-y-4">
          {/* Campo numero 1 del Formulario NOMBRE*/}
          <div className="relative">
            <BiSolidCategory
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Full Name"
              defaultValue={usoVehiculo[0].name_uso}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <EliminarUsoVehiculo
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
            id_uso={params.id}
          />
        </form>
      </div>
    </div>
  );
};

export default PageEliminarUso;
