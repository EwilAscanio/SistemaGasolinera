"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CiCreditCard1 } from "react-icons/ci";
import { SiRimacautomobili } from "react-icons/si";

const PageReports = () => {
  const router = useRouter();
  const [cedula, setCedula] = useState("");
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [error, setError] = useState("");

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
    // Verificar que las fechas estén presentes
    if (!fechaInicial || !fechaFinal) {
      setError("Por favor, ingrese ambas fechas.");
      return;
    }
    setError(""); // Limpiar el error
    // Redirigir a la página de despacho con las fechas
    router.push(
      `reportes/despachouso/despacho?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`
    );
  };

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
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Formulario para los reportes */}
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Reporte Número 1 */}
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
                  className="col-span-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
                  onClick={handleSubmitVehiculo}
                >
                  Mostrar Reporte
                </button>
              </div>

              {/* Reporte Número 2 */}
              <div className="relative border border-gray-300 rounded-lg p-4">
                <p className="text-center text-gray-600 mb-4">
                  Mostrar Despacho segun su Uso de Vehiculo.
                </p>
                <div className="grid grid-cols-2 gap-4">
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
                    className="w-40 pl-4 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={fechaFinal}
                    onChange={(e) => setFechaFinal(e.target.value)}
                  />
                </div>
                <button
                  className="col-span-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center mt-6"
                  onClick={handleSubmitDespacho}
                >
                  Mostrar Reporte
                </button>
              </div>

              {/* Otros campos del formulario */}
              <div className="relative">
                <SiRimacautomobili
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Marca Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PageReports;
