"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  LuUser,
  LuUserCircle,
  LuMail,
  LuLock,
  LuArrowRight,
} from "react-icons/lu";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const UpdateUsers = ({ params }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/update/${params.id}`)
      .then((res) => {
        setUser(res.data);
        reset(res.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [params.id, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/update/${params.id}`,
        data
      );
      if (res.status === 200) {
        Swal.fire({
          title: "Actualizar Usuario",
          text: "El usuario ha sido actualizado exitosamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        router.push(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard`);
      } else {
        alert("Ocurrió un error al actualizar el usuario.");
      }
    } catch (error) {
      alert("Ocurrió un error en el servidor. Intenta nuevamente más tarde.");
    }
  };

  if (!user) {
    return <div>Cargando...</div>; // Mensaje de carga
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Actualizar Usuario
          </h1>
          <p className="text-gray-600 mt-2">Rellene los datos correctamente</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Campo nombre */}
          <div className="relative">
            <LuUser
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name_usr", {
                required: "Campo requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener mínimo 2 caracteres",
                },
              })}
            />
            {errors.name_usr && (
              <span className="text-red-600 text-sm">
                {errors.name_usr.message}
              </span>
            )}
          </div>

          {/* Campo login */}
          <div className="relative">
            <LuUserCircle
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Login"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("login_usr", {
                required: "Campo requerido",
                minLength: {
                  value: 2,
                  message: "El login debe tener mínimo 2 caracteres",
                },
              })}
            />
            {errors.login_usr && (
              <span className="text-red-600 text-sm">
                {errors.login_usr.message}
              </span>
            )}
          </div>

          {/* Campo email */}
          <div className="relative">
            <LuMail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email_usr", { required: "Campo requerido" })}
            />
            {errors.email_usr && (
              <span className="text-red-600 text-sm">
                {errors.email_usr.message}
              </span>
            )}
          </div>

          {/* Campo password */}
          <div className="relative">
            <LuLock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password_usr", {
                required: "Campo requerido",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener mínimo 6 caracteres",
                },
              })}
            />
            {errors.password_usr && (
              <span className="text-red-600 text-sm">
                {errors.password_usr.message}
              </span>
            )}
          </div>

          {/* Campo rol */}
          <div className="relative">
            <select
              className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              {...register("id_rol")}
            >
              <option value="">Rol de Usuario</option>
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
          >
            Actualizar Usuario
            <LuArrowRight className="ml-2" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUsers;
