"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CiCreditCard1 } from "react-icons/ci";
import Swal from "sweetalert2";
import axios from "axios";

const PageReports = () => {
  const router = useRouter();
  const [cedula, setCedula] = useState("");
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [error, setError] = useState("");
  const [tiposUso, setTiposUso] = useState([]); // Estado para almacenar los tipos de uso
  const [selectedUso, setSelectedUso] = useState(""); // Estado para almacenar el tipo de uso seleccionado
  const [tipoVehiculo, setTipoVehiculo] = useState([]); // Estado para almacenar el tipo de vehículo
  const [selectedTipo, setSelectedTipo] = useState(""); // Estado para almacenar el tipo de vehículo seleccionado
  const [fechaInicialTipo, setFechaInicialTipo] = useState(""); // Estado para almacenar la fecha inicial del tipo de vehículo
  const [fechaFinalTipo, setFechaFinalTipo] = useState(""); // Estado para almacenar la fecha final del tipo de vehículo
  const [fechaInicialVenta, setFechaInicialVenta] = useState(""); // Estado para almacenar la fecha inicial de la venta de gasolina
  const [fechaFinalVenta, setFechaFinalVenta] = useState(""); // Estado para almacenar la fecha final de la venta de gasolina

  const handleSubmitVehiculo = (e) => {
    e.preventDefault();
    //Verificacion de cedula
    if (!cedula) {
      setError("Por favor, ingrese la cédula del propietario.");
      return;
    }
    setError(""); // Limpiar el error

    // Redirigir a la página de reporte con el ID del propietario
    router.push(`reportes/propietario/${cedula}`);
  };

  const handleSubmitDespacho = (e) => {
    e.preventDefault();

    // Verificar si el Select de Uso de Vehiculo está vacío
    if (selectedUso === "") {
      setError("Por favor, seleccione un Uso de Vehiculo.");
      return;
    }

    // Verificar que las fechas estén presentes
    if (!fechaInicial || !fechaFinal) {
      setError("Por favor, ingrese ambas fechas.");
      return;
    }

    setError(""); // Limpiar el error
    // Redirigir a la página de despacho con las fechas
    router.push(
      `reportes/despachouso/despacho?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}&id_uso=${selectedUso}`
    );
  };

  const handleSubmitTipoVehiculo = (e) => {
    e.preventDefault();

    // Verificar si el Select de Uso de Vehiculo está vacío
    if (selectedTipo === "") {
      setError("Por favor, seleccione un Tipo de Vehiculo.");
      return;
    }

    // Verificar que las fechas estén presentes
    if (!fechaInicialTipo || !fechaFinalTipo) {
      setError("Por favor, ingrese ambas fechas.");
      return;
    }

    setError(""); // Limpiar el error
    // Redirigir a la página de despacho con las fechas
    router.push(
      `reportes/despachotipo/despacho?fechaInicial=${fechaInicialTipo}&fechaFinal=${fechaFinalTipo}&id_tip=${selectedTipo}`
    );
  };

  const handleSubmitVentaGasolina = (e) => {
    e.preventDefault();

    // Verificar que las fechas estén presentes
    if (!fechaInicialVenta || !fechaFinalVenta) {
      setError("Por favor, ingrese ambas fechas.");
      return;
    }

    setError(""); // Limpiar el error
    // Redirigir a la página de despacho con las fechas
    router.push(
      `reportes/venta/despacho?fechaInicial=${fechaInicialVenta}&fechaFinal=${fechaFinalVenta}`
    );
  };

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

  // Función para cargar los tipos de uso desde la API
  const cargarTipoVehiculo = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/tipocars`
      );
      if (res.status === 200) {
        setTipoVehiculo(res.data); // Suponiendo que res.data es un array de tipos de uso
      }
    } catch (error) {
      console.error("Error al cargar los tipos de uso:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudieron cargar los tipos de Vehiculo.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

  useEffect(() => {
    cargarTipoVehiculo(); // Cargar tipos de Vehiculo al montar el componente
  }, []);

  return (
    <>
      <div className="flex justify-around mt-4"></div>
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Reportes del Sistema
            </h1>
            <p className="text-gray-600 mt-2">
              Escoge que reporte desea visualizar
            </p>
          </div>

          {/* Mensaje de error */}
          <div className="absolute top-0 left-0 right-0">
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>

          {/* Formulario para los reportes */}
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Reporte Número 1 Total de Despachos */}
              <div className="relative border border-gray-300 rounded-lg p-4">
                <p className="text-center text-gray-600 mb-4">
                  Mostrar Despacho por Tipo de Vehiculo.
                </p>
                <select
                  className="text-gray-400 w-full pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedTipo}
                  onChange={(e) => setSelectedTipo(e.target.value)} // Actualiza el estado del tipo de uso seleccionado
                >
                  <option value="">Tipo del Vehiculo</option>
                  {tipoVehiculo.map((tipoVehiculos) => (
                    <option
                      key={tipoVehiculos.id_tip}
                      value={tipoVehiculos.id_tip}
                    >
                      {tipoVehiculos.name_tip}
                    </option>
                  ))}
                </select>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Fecha Inicial"
                    className="w-40 pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={fechaInicialTipo}
                    onChange={(e) => setFechaInicialTipo(e.target.value)}
                  />
                  <input
                    type="date"
                    placeholder="Fecha Final"
                    className="w-40 pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={fechaFinalTipo}
                    onChange={(e) => setFechaFinalTipo(e.target.value)}
                  />
                </div>
                <button
                  className="col-span-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-2"
                  onClick={handleSubmitTipoVehiculo}
                >
                  Mostrar Reporte
                </button>
              </div>

              {/* Reporte Número 2 */}
              <div className="relative border border-gray-300 rounded-lg p-4">
                <p className="text-center text-gray-600 mb-4">
                  Mostrar Despacho por Uso de Vehiculo.
                </p>
                <select
                  className="text-gray-400 w-full pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedUso}
                  onChange={(e) => setSelectedUso(e.target.value)} // Actualiza el estado del tipo de uso seleccionado
                >
                  <option value="">Uso del Vehiculo</option>
                  {tiposUso.map((tipoUso) => (
                    <option key={tipoUso.id_uso} value={tipoUso.id_uso}>
                      {tipoUso.name_uso}
                    </option>
                  ))}
                </select>

                <div className="mt-2 grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Fecha Inicial"
                    className="w-40 pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={fechaInicial}
                    onChange={(e) => setFechaInicial(e.target.value)}
                  />
                  <input
                    type="date"
                    placeholder="Fecha Final"
                    className=" w-40 pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={fechaFinal}
                    onChange={(e) => setFechaFinal(e.target.value)}
                  />
                </div>
                <button
                  className="col-span-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-2"
                  onClick={handleSubmitDespacho}
                >
                  Mostrar Reporte
                </button>
              </div>

              {/* Reporte Número 3 */}
              <div className="relative border border-gray-300 rounded-lg p-4">
                <p className="text-center text-gray-600 mb-4">
                  Mostrar Los Vehiculos segun el propietario.
                </p>
                <CiCreditCard1
                  className="absolute left-7 top-20 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Cedula del Propietario"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
                <button
                  className="col-span-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-2"
                  onClick={handleSubmitVehiculo}
                >
                  Mostrar Reporte
                </button>
              </div>

              {/* Reporte Número 4 Despacho de Gasolina */}
              <div className="relative border border-gray-300 rounded-lg p-4">
                <p className="text-center text-gray-600 mb-4">
                  Mostrar Despacho de Gasolina.
                </p>

                <div className="mt-2 grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    placeholder="Fecha Inicial"
                    className="w-40 pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={fechaInicialVenta}
                    onChange={(e) => setFechaInicialVenta(e.target.value)}
                  />
                  <input
                    type="date"
                    placeholder="Fecha Final"
                    className=" w-40 pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={fechaFinalVenta}
                    onChange={(e) => setFechaFinalVenta(e.target.value)}
                  />
                </div>
                <button
                  className="col-span-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-2"
                  onClick={handleSubmitVentaGasolina}
                >
                  Mostrar Reporte
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PageReports;
