"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BiSolidCategory } from "react-icons/bi";
import { LuArrowRight } from "react-icons/lu";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const ActualizarUsoVehiculo = ({ params }) => {
  const [usoVehiculo, setUsoVehiculo] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/usocars/${params.id}`
      )
      .then((res) => {
        setUsoVehiculo(res.data[0]);
        reset(res.data[0]);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [params.id, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/usocars/${params.id}`,
        data
      );
      if (res.status === 200) {
        Swal.fire({
          title: "Actualizar Categoría",
          text: "La categoría ha sido actualizada exitosamente.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        router.push(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/auth/dashboard`);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error de respuesta del servidor:", error.response.data);
        console.error("Estado de la respuesta:", error.response.status);

        if (error.response.status === 400) {
          Swal.fire({
            title: "Error",
            text: "Error al Actualizar Categoría",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    }
  };

  if (!usoVehiculo) {
    return <div>Cargando...</div>; // Mensaje de carga
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Actualizar Categoria
          </h1>
          <p className="text-gray-600 mt-2">Rellene los datos correctamente</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Campo nombre */}
          <div className="relative flex flex-col">
            <div className="flex items-center relative">
              <BiSolidCategory
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Nombre del Uso Vehiculo"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("name_uso", {
                  required: "Campo requerido",
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener mínimo 2 caracteres",
                  },
                })}
              />
            </div>
            {errors.name_uso && (
              <span className="text-red-600 text-sm mt-1">
                {errors.name_uso.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
          >
            Actualizar Categoría
            <LuArrowRight className="ml-2" size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActualizarUsoVehiculo;
