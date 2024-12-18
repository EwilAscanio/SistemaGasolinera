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

const ActualizarPropietario = ({ params }) => {
  const [propietario, setPropietario] = useState(null);
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
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/propietario/${params.id}`
      )
      .then((res) => {
        setPropietario(res.data);
        reset(res.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [params.id, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/propietario/${params.id}`,
        data
      );
      if (res.status === 200) {
        Swal.fire({
          title: "Actualizar Propietario",
          text: "El propietario ha sido actualizado exitosamente.",
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
            text: "Error al Actualizar el Propietario",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    }
  };

  if (!propietario) {
    return <div>Cargando...</div>; // Mensaje de carga
  }

  return (
    <>
      <div className="flex justify-around mt-4"></div>
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Actualizar Propietario
            </h1>
            <p className="text-gray-600 mt-2">
              Rellene los datos correctamente
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("cedula_pro", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                    minLength: {
                      value: 2,
                      message: "La cedula debe terner minimo 2 caracteres",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.cedula_pro && (
                  <span className="text-red-600 text-sm">
                    {errors.cedula_pro.message}
                  </span>
                )}
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
                  {...register("name_pro", {
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
                {errors.name_pro && (
                  <span className="text-red-600 text-sm">
                    {errors.name_pro.message}
                  </span>
                )}
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
                  {...register("apellido_pro", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.apellido_pro && (
                  <span className="text-red-600 text-sm">
                    {errors.apllido_pro.message}
                  </span>
                )}
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
                  {...register("direccion_pro", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.direccion_pro && (
                  <span className="text-red-600 text-sm">
                    {errors.direccion_pro.message}
                  </span>
                )}
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
                  {...register("telefono_pro", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.telefono_pro && (
                  <span className="text-red-600 text-sm">
                    {errors.telefono_pro.message}
                  </span>
                )}
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
                  {...register("email_pro", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.email_pro && (
                  <span className="text-red-600 text-sm">
                    {errors.email_pro.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="col-span-2  w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
              >
                Actualizar Propietario
                <LuArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ActualizarPropietario;
