import axios from "axios";

import {
  LuUser,
  LuUserCircle,
  LuMail,
  LuLock,
  LuArrowRight,
} from "react-icons/lu";
import ButtonDelete from "@/components/ButtonDelete";

const loadUser = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/update/${id}`
  );
  return data;
};

const DeleteUsers = async ({ params }) => {
  const user = await loadUser(params.id);

  return (
    <div className="  flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Eliminar Usuario</h1>
          <p className="text-gray-600 mt-2">Los Datos a Eliminar</p>
        </div>
        <form className="space-y-4">
          {/* Campo numero 1 del Formulario NOMBRE*/}
          <div className="relative">
            <LuUser
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Full Name"
              defaultValue={user.name_usr}
              disabled
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo numero 2 del Formulario LOGIN*/}
          <div className="relative">
            <LuUserCircle
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Login"
              defaultValue={user.login_usr}
              disabled
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo numero 3 del Formulario EMAIL*/}
          <div className="relative">
            <LuMail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Email"
              defaultValue={user.email_usr}
              disabled
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo numero 4 del Formulario PASSWORD*/}
          <div className="relative">
            <LuLock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              placeholder="Password"
              defaultValue={user.password_usr}
              disabled
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo numero 5 del Formulario ROL */}
          <div className="relative">
            <select
              className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              defaultValue={user.id_rol}
              disabled
            >
              <option value="" className="">
                Rol de Usuario
              </option>
              <option value="2">Usuario</option>
              <option value="1">Administrador</option>
            </select>
            <LuUserCircle
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <LuArrowRight
              className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400"
              size={20}
            />
          </div>

          <ButtonDelete
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
            user_id={params.id}
          />
        </form>
      </div>
    </div>
  );
};

export default DeleteUsers;
