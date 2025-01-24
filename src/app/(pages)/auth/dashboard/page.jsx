"use client";
import React, { useEffect, useState } from "react";
import GraficoPrincipal from "@/components/GraficoPrincipal"; // Asegúrate de que la ruta sea correcta
import { FaUsers, FaFileInvoiceDollar } from "react-icons/fa";
import { LuMilk } from "react-icons/lu";

const Page = () => {
  const [loading, setLoading] = useState(true);

  // Al crear este Hooks realizamos un simulacro de carga de datos para el gráfico, retrasando 2 segundos.
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <h2>Cargando...</h2>
        </div>
      ) : (
        <>
          <div className="flex  bg-gray-100">
            {/* Card Numero 1 Total Gasoil(Litros) */}
            <div className="flex max-w-sm gap-5 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-blue-200 mx-auto mt-10 justify-between ">
              <div className="p-5">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                  Total Litros Gasoil
                </h5>
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">
                  40.685
                </h5>
              </div>

              <div className="flex items-center justify-center bg-blue-500 rounded-t-lg p-5">
                <FaUsers className="w-full h-10 text-white" />
              </div>
            </div>

            {/* Card Numero 2 Total Gasolina (Litros) */}
            <div className="flex max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-blue-200 mx-auto mt-10 justify-between">
              <div className="p-5">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                  Total Litros de Gasolina
                </h5>
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">
                  10.293
                </h5>
              </div>

              <div className="flex items-center justify-center bg-green-500 rounded-t-lg p-5">
                <LuMilk className="w-full h-10 text-white" />
              </div>
            </div>

            {/* Card Numero 3 Total de Inventario */}
            <div className="flex max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-blue-200 mx-auto mt-10 justify-between">
              <div className="p-5">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                  Total de Inventario
                </h5>
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">
                  89.600 $
                </h5>
              </div>

              <div className="flex items-center justify-center bg-red-500 rounded-t-lg p-5">
                <FaFileInvoiceDollar className="w-full h-10 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-10 p-4">
            {/* Renderiza el componente GraficoPrincipal */}
            <GraficoPrincipal onLoad={handleLoad} />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
