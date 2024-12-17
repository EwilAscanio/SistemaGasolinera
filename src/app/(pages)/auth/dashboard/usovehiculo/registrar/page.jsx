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

const RegistrarUsoVehiculo = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/usocars`,
        data
      );

      if (res.status === 200) {
        Swal.fire({
          title: "Registrar Categoría",
          text: "La Categoría ha sido registrada exitosamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        router.push(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard`);
        router.refresh();
      }
    } catch (error) {
      if (error.response) {
        console.error("Error de respuesta del servidor:", error.response.data);
        console.error("Estado de la respuesta:", error.response.status);

        if (error.response.status === 400) {
          Swal.fire({
            title: "Error al Registrar Categoría",
            text: "Datos Duplicados",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    }
  });

  return (
    <div className="mt-20 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Registrar Categoría
          </h1>
          <p className="text-gray-600 mt-2">Rellene los datos correctamente</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Campo numero 1 del Formulario NOMBRE*/}
          <div className="relative">
            <LuUser
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name_uso", {
                required: {
                  value: true,
                  message: "campo requerido",
                },
                minLength: {
                  value: 2,
                  message: "El nombre debe terner minimo 2 caracteres",
                },
              })}
            />
            {/* Manejo de Errores */}
            {errors.name && (
              <span className="text-red-600 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
          >
            Crear Categoría
            <LuArrowRight className="ml-2" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrarUsoVehiculo;
