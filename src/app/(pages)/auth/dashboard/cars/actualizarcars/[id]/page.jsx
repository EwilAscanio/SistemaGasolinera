"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LuArrowRight } from "react-icons/lu";
import { IoIosColorPalette, IoIosBarcode, IoLogoModelS } from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import { SiRimacautomobili } from "react-icons/si";
import { FaGasPump } from "react-icons/fa6";
import { FaBuilding, FaCode } from "react-icons/fa";
import { MdOutlineCarCrash } from "react-icons/md";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

const ActualizarCars = ({ params }) => {
  const [vehiculo, setVehiculo] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [tiposUso, setTiposUso] = useState([]); // Estado para tipos de uso

  // Función para cargar los tipos de uso desde la API
  const cargarTiposUso = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/usocars`
      );
      if (res.status === 200) {
        setTiposUso(res.data); // Suponiendo que res.data es un array de tipos de uso
      }
    } catch (error) {
      console.error("Error al cargar los tipos de uso:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los tipos de uso.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    cargarTiposUso(); // Cargar tipos de uso al montar el componente
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/${params.id}`)
      .then((res) => {
        setVehiculo(res.data);
        reset(res.data);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [params.id, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/${params.id}`,
        data
      );
      if (res.status === 200) {
        Swal.fire({
          title: "Actualizar Vehiculo",
          text: "El vehiculo ha sido actualizado exitosamente.",
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

  if (!vehiculo) {
    return <div>Cargando...</div>; // Mensaje de carga
  }

  return (
    <>
      <div className="flex justify-around mt-4"></div>
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Actualizar Vehiculo
            </h1>
            <p className="text-gray-600 mt-2">
              Rellene los datos correctamente
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {/* Campo numero 1 del Formulario PLACA VEHICULO */}
              <div className="relative">
                <CiCreditCard1
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Placa Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                  {...register("placa_car", {
                    required: "Campo requerido",
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

              {/* Campo numero 2 del Formulario CODIGO VEHICULO */}
              <div className="relative">
                <FaCode
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Codigo Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("codigo_car", {
                    required: "campo requerido",
                    minLength: {
                      value: 2,
                      message: "El codigo debe terner minimo 1 caracter",
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

              {/* Campo numero 3 del Formulario MARCA VEHICULO */}
              <div className="relative">
                <SiRimacautomobili
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Marca Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("marca_car", {
                    required: "campo requerido",
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

              {/* Campo numero 4 del Formulario MODELO VEHICULO */}
              <div className="relative">
                <IoLogoModelS
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Modelo Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("modelo_car", {
                    required: "campo requerido",
                  })}
                />
                {/* Manejo de Errores */}
                {errors.modelo_car && (
                  <span className="text-red-600 text-sm">
                    {errors.modelo_car.message}
                  </span>
                )}
              </div>

              {/* Campo numero 5 del Formulario SERIAL VEHICULO */}
              <div className="relative">
                <IoIosBarcode
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Serial Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("serial_car", {
                    required: "campo requerido",
                  })}
                />
                {/* Manejo de Errores */}
                {errors.serial_car && (
                  <span className="text-red-600 text-sm">
                    {errors.serial_car.message}
                  </span>
                )}
              </div>

              {/* Campo numero 6 del Formulario COLOR VEHICULO */}
              <div className="relative">
                <IoIosColorPalette
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Color Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("color_car", {
                    required: "campo requerido",
                  })}
                />
                {/* Manejo de Errores */}
                {errors.color_car && (
                  <span className="text-red-600 text-sm">
                    {errors.color_car.message}
                  </span>
                )}
              </div>

              {/* Campo numero 7 del Formulario MAX LITROS */}
              <div className="relative">
                <FaGasPump
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="numeric"
                  placeholder="Max de Litros"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("maxlitros_car", {
                    required: "campo requerido",
                  })}
                />
                {/* Manejo de Errores */}
                {errors.maxlitros_car && (
                  <span className="text-red-600 text-sm">
                    {errors.maxlitros_car.message}
                  </span>
                )}
              </div>

              {/* Campo numero 8 del Formulario TIPO VEHICULO */}
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
                  <option value="5">Moto</option>
                </select>
                <MdOutlineCarCrash
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <LuArrowRight
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400"
                  size={20}
                />
              </div>

              {/* Campo numero 9 del Formulario USO VEHICULO */}
              <div className="relative">
                <select
                  className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  {...register("id_uso")}
                >
                  <option value="">Uso del Vehiculo</option>
                  {tiposUso.map((tipoUso) => (
                    <option key={tipoUso.id_uso} value={tipoUso.id_uso}>
                      {tipoUso.name_uso}
                    </option>
                  ))}
                </select>
                <FaBuilding
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
                Actualizar Vehiculo
                <LuArrowRight className="ml-2" size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ActualizarCars;
