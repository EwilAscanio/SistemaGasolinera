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
import Link from "next/link";
import Swal from "sweetalert2";

const Animal = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("http://localhost:3000/api/cars", data);

    console.log(res);

    if (res.status == 200) {
      Swal.fire({
        title: "Registrar Vehiculo",
        text: "El vehiculo ha sido registrado exitosamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      router.push("http://localhost:3000/auth/dashboard");
      router.refresh();
    } else if (res.status === 400) {
      // Error de validación del servidor
      alert(
        "Los datos ingresados no son válidos. Por favor, verifica los campos."
      );
    } else if (res.status === 500) {
      // Error interno del servidor
      alert("Ocurrió un error en el servidor. Intenta nuevamente más tarde.");
    } else {
      // Otro error
      alert(
        "Ocurrió un error inesperado. Por favor, contacta al administrador."
      );
    }
  });

  return (
    <>
      <div className="flex justify-around mt-4">
        <Link href={``}>
          <button className="bg-green-500 text-white py-1 px-3 rounded mr-2">
            Listar Animales
          </button>
        </Link>
        <Link href={``}>
          <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2">
            Actualizar
          </button>
        </Link>
        <Link href={``}>
          <button className="bg-red-500 text-white py-1 px-3 rounded mr-2 hover:scale-110 hover:transition-all hover:duration-500 transition ease-in-out duration-500">
            Eliminar
          </button>
        </Link>
      </div>
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Registrar Vehiculo
            </h1>
            <p className="text-gray-600 mt-2">
              Rellene los datos correctamente
            </p>
          </div>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {/* Campo numero 1 del Formulario PLACA VEHICULO */}
              <div className="relative">
                <LuUser
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Placa Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("placa_car", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                    minLength: {
                      value: 2,
                      message: "La placa debe terner minimo 2 caracteres",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.placa_car && (
                  <span className="text-red-600 text-sm">
                    {errors.codigo_ani.message}
                  </span>
                )}
              </div>

              {/* Campo numero 2 del Formulario MARCA VEHICULO */}
              <div className="relative">
                <LuUserCircle
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Marca Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("marca_car", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                    minLength: {
                      value: 2,
                      message: "La marca debe terner minimo 2 caracteres",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.marca_car && (
                  <span className="text-red-600 text-sm">
                    {errors.marca_car.message}
                  </span>
                )}
              </div>

              {/* Campo numero 3 del Formulario MODELO VEHICULO */}
              <div className="relative">
                <LuMail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Modelo Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("modelo_car", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.modelo_car && (
                  <span className="text-red-600 text-sm">
                    {errors.modelo_car.message}
                  </span>
                )}
              </div>

              {/* Campo numero 4 del Formulario SERIAL VEHICULO */}
              <div className="relative">
                <LuMail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Serial Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("serial_car", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.serial_car && (
                  <span className="text-red-600 text-sm">
                    {errors.serial_car.message}
                  </span>
                )}
              </div>

              {/* Campo numero 5 del Formulario COLOR VEHICULO */}
              <div className="relative">
                <LuMail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Color Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("color_car", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.color_car && (
                  <span className="text-red-600 text-sm">
                    {errors.color_car.message}
                  </span>
                )}
              </div>

              {/* Campo numero 6 del Formulario MAX LITROS */}
              <div className="relative">
                <LuMail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="numeric"
                  placeholder="Max de Litros"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("maxlitros_car", {
                    required: {
                      value: true,
                      message: "campo requerido",
                    },
                  })}
                />
                {/* Manejo de Errores */}
                {errors.maxlitros_car && (
                  <span className="text-red-600 text-sm">
                    {errors.maxlitros_car.message}
                  </span>
                )}
              </div>

              {/* Campo numero 7 del Formulario TIPO VEHICULO */}
              <div className="relative">
                <select
                  className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  {...register("id_tip")}
                >
                  <option value="">Tipo Vehiculo</option>
                  <option value="1">Sedan</option>
                  <option value="2">Camioneta</option>
                  <option value="3">Camion</option>
                  <option value="4">Gandola</option>
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
                className="col-span-2  w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
              >
                Registrar Vehiculo
                <LuArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Animal;
