import axios from "axios";

import {
  LuUser,
  LuUserCircle,
  LuMail,
  LuLock,
  LuArrowRight,
} from "react-icons/lu";
import ButtonDelete from "@/components/ButtonDelete";
import EliminarPropietario from "@/components/EliminarPropietario";

const loadPropietario = async (id) => {
  console.log("ID", id);
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/propietario/${id}`
  );
  console.log("Data recibida LOAD DELETE USERS:", data);
  return data;
};

const DeletePropietario = async ({ params }) => {
  console.log("PARAMS DELETEUSERS", params);

  const propietario = await loadPropietario(params.id);

  return (
    <>
      <div className="flex justify-around mt-4"></div>
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Eliminar Propietario
            </h1>
            <p className="text-gray-600 mt-2">Los Datos a Eliminar</p>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Campo numero 1 del Formulario CEDULA PROPIETARIO */}
              <div className="relative">
                <LuUser
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cedula Propietario"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                  defaultValue={propietario.cedula_pro}
                />
              </div>

              {/* Campo numero 2 del Formulario NOMBRE PROPIETARIO */}
              <div className="relative">
                <LuUserCircle
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Nombre Propietario"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                  defaultValue={propietario.name_pro}
                />
              </div>

              {/* Campo numero 3 del Formulario APELLIDO PROPIETARIO */}
              <div className="relative">
                <LuMail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Apellido Propietario"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                  defaultValue={propietario.apellido_pro}
                />
              </div>

              {/* Campo numero 4 del Formulario DIRECCION PROPIETARIO */}
              <div className="relative">
                <LuMail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Direccion Propietario"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                  defaultValue={propietario.direccion_pro}
                />
              </div>

              {/* Campo numero 5 del Formulario TELEFONO PROPIETARIO */}
              <div className="relative">
                <LuMail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Telefono Propietario"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                  defaultValue={propietario.telefono_pro}
                />
              </div>

              {/* Campo numero 6 del Formulario EMAIL PROPIETARIO */}
              <div className="relative">
                <LuMail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Email Propietario"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                  defaultValue={propietario.email_pro}
                />
              </div>

              {/* Botón para eliminar propietario */}
              <EliminarPropietario cedula_pro={propietario.cedula_pro} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeletePropietario;
