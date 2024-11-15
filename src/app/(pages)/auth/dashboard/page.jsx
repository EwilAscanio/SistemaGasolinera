"use client";

import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import { FaUsers, FaFileInvoiceDollar } from "react-icons/fa";
import { LuMilk } from "react-icons/lu";

const data = {
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
  datasets: [
    {
      label: "Animales",
      data: [40, 45, 50, 55, 60, 65, 70],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(59, 130, 246)",
      fill: true,
    },
    {
      label: "Litros de Leche",
      data: [10, 15, 20, 25, 30, 35, 40],
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(76, 175, 80)",
      fill: true,
    },
    {
      label: "Inventario ($)",
      data: [89, 91, 92, 93, 95, 96, 98],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgb(244, 67, 54)",
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Estadísticas de Ganadería",
    },
  },
};

const ChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar", // Tipo de gráfico
      data,
      options,
    });

    return () => {
      myChart.destroy(); // Limpiar el gráfico cuando el componente se desmonte
    };
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

const page = () => {
  return (
    <div>
      <div className="flex  bg-gray-100">
        {/* Card Numero 1 Total Animales */}
        <div className="flex max-w-sm gap-5 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-blue-200 mx-auto mt-10 justify-between ">
          <div className="p-5">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Total Animales
            </h5>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 ">
              40.685
            </h5>
          </div>

          <div className="flex items-center justify-center bg-blue-500 rounded-t-lg p-5">
            <FaUsers className="w-full h-10 text-white" />
          </div>
        </div>

        {/* Card Numero 2 Total Litros de Leche */}
        <div className="flex max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-blue-200 mx-auto mt-10 justify-between">
          <div className="p-5">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              Total Litros de Leche
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
        <ChartComponent />
      </div>
    </div>
  );
};

export default page;
