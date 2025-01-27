"use client";
import React, { useEffect, useState } from "react";
import GraficoPrincipal from "@/components/GraficoPrincipal";
import { FaUsers, FaFileInvoiceDollar } from "react-icons/fa";
import { LuMilk } from "react-icons/lu";
import axios from "axios";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [totalLitros, setTotalLitros] = useState(0);
  const [meses, setMeses] = useState([]);
  const [gasolinaData, setGasolinaData] = useState([]);

  const mesesGrafico = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const gasoilData = [1400, 45, 50, 55, 60, 65, 70]; // Puedes dejarlo estático o obtenerlo de la API
  const inventarioData = [1890, 91, 92, 93, 95, 96, 98]; // Puedes dejarlo estático o obtenerlo de la API

  const datasets = [
    {
      label: "Gasoil (Litros)",
      data: gasoilData,
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(59, 130, 246)",
      fill: true,
    },
    {
      label: "Gasolina (Litros)",
      data: gasolinaData, // Datos dinámicos
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(76, 175, 80)",
      fill: true,
    },
    {
      label: "Inventario ($)",
      data: inventarioData,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgb(244, 67, 54)",
      fill: true,
    },
  ];

  useEffect(() => {
    const dataVentas = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/venta/`
        );
        console.log("Data Report Desc:", res.data.ventasPorMes);
        console.log("Data Report Desc:", res.data.ventasPorMes[0].mes);
        console.log("Data Report:", res.data.totalLitros);

        setTotalLitros(res.data.totalLitros);
        // setMeses(
        //   res.data.ventasporMes[0].map((item) => mesesGrafico[item.mes - 1])
        // );
        setMeses(
          res.data.ventasPorMes.map((item) => mesesGrafico[item.mes - 1])
        );

        // Supongamos que res.data.ventas contiene un array de litros por mes
        const litrosPorMes = res.data.ventasPorMes.map(
          (item) => item.totalLitros
        );
        setGasolinaData(litrosPorMes); // Actualizar los datos de gasolina
      } catch (error) {
        console.error("Error al Buscar la informacion de Ventas:", error);
      } finally {
        setLoading(false);
      }
    };
    dataVentas();
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
          <div className="flex bg-gray-100">
            {/* Card Numero 1 Total Gasoil(Litros) */}
            <div className="flex max-w-sm gap-5 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-blue-200 mx-auto mt-10 justify-between">
              <div className="p-5">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                  Total Litros Gasoil
                </h5>
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                  1.293
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
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                  {totalLitros}
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
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
                  89.600 $
                </h5>
              </div>
              <div className="flex items-center justify-center bg-red-500 rounded-t-lg p-5">
                <FaFileInvoiceDollar className="w-full h-10 text-white" />
              </div>
            </div>
          </div>
          <div className="mt-10 p-4">
            <GraficoPrincipal
              onLoad={handleLoad}
              data={datasets}
              labels={meses}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
