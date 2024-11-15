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
import { useState, useEffect } from "react";
import Spinner from "@/components/ui/Spinner";

const UpdateUsers = ({ params }) => {
  const [user, setUser] = useState({
    name_usr: "",
    login_usr: "",
    email_usr: "",
    password_usr: "",
    id_rol: "",
  });

  const [loading, setLoading] = useState(true);

  console.log("PARAMS", params);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name_usr: "",
      login_usr: "",
      email_usr: "",
      password_usr: "",
      id_rol: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log("DATA UPDATE", data);
    const res = await axios.put(
      `http://localhost:3000/api/update/${params.id}`,
      data
    );

    console.log("RES UPDATE", res);

    if (res.status == 200) {
      Swal.fire({
        title: "Registrar Usuario",
        text: "El usuario ha sido registrado exitosamente.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      router.push("/auth/dashboard");
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
      console.log("RES", data);
      alert(
        "Ocurrió un error inesperado. Por favor, contacta al administrador."
      );
    }
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/api/update/${params.id}`).then((res) => {
      setUser({
        name_usr: res.data.name_usr,
        login_usr: res.data.login_usr,
        email_usr: res.data.email_usr,
        password_usr: res.data.password_usr,
        id_rol: res.data.id_rol,
      });
    });
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Spinner className="flex items-center justify-center h-screen w-screen" />
    );
  }

  return (
    <div className="  flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Actualizar Usuario
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
              {...register("name_usr", {
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

          {/* Campo numero 2 del Formulario LOGIN*/}
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
                value: user.login_usr,
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

          {/* Campo numero 3 del Formulario EMAIL*/}
          <div className="relative">
            <LuMail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email_usr", {
                value: user.email_usr,
                required: {
                  value: true,
                  message: "campo requerido",
                },
              })}
            />
            {/* Manejo de Errores */}
            {errors.email && (
              <span className="text-red-600 text-sm">
                {errors.email.message}
              </span>
            )}
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
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password_usr", {
                value: user.password_usr,
                required: {
                  value: true,
                  message: "campo requerido",
                },
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener minimo 6 digitos",
                },
              })}
            />
            {/* Manejo de Errores */}
            {errors.password && (
              <span className="text-red-600 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Campo numero 5 del Formulario ROL */}
          <div className="relative">
            <select
              className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              {...register("id_rol", { value: user.id_rol })}
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
          >
            Actualizar Usuario
            <LuArrowRight className="ml-2" size={20} />
          </button>
          {/* <ButtonUpdate user_id={params.id} /> */}
          {/* <input type="submit" /> */}
        </form>
      </div>
    </div>
  );
};

export default UpdateUsers;
