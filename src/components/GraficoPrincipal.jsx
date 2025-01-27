import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Estadísticas de Gasolina",
    },
  },
};

const GraficoPrincipal = ({ data, labels, onLoad }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) {
      console.error("Error: No se pudo obtener el contexto del canvas.");
      return;
    }

    try {
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: data,
        },
        options,
      });

      // Llama a onLoad después de que el gráfico se haya creado
      setTimeout(() => {
        if (onLoad) {
          onLoad();
        }
      }, 0);

      return () => {
        myChart.destroy();
      };
    } catch (error) {
      console.error("Error al crear el gráfico:", error);
    }
  }, [onLoad]);

  return (
    <div className="flex items-center justify-center lg:h-72">
      <canvas ref={chartRef} className="h-full w-full"></canvas>
    </div>
  );
};

export default GraficoPrincipal;
