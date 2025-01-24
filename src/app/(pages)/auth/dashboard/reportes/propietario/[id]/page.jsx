"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportePDF from "@/components/reportes/Propietario"; // Asegúrate de importar el componente PDF

const ReportPropietarioVehiculo = ({ params }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/reportes/${params.id}`
        );

        setVehiculos(res.data); // Almacena el array de vehículos
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        setError("Error al cargar los datos de los vehículos.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculos();
  }, [params.id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="relative flex flex-col justify-between items-center">
        <h1 className="text-center text-3xl font-bold mb-4 mt-4">
          Lista de Vehículos
        </h1>

        <PDFDownloadLink
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          document={<ReportePDF vehiculos={vehiculos} />}
          fileName="reporte_vehiculos.pdf"
        >
          {({ loading }) =>
            loading ? "Cargando documento..." : "Descargar Reporte"
          }
        </PDFDownloadLink>
      </div>

      <div className="p-4 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200">Placa</th>
              <th className="py-2 px-4 bg-gray-200">Marca</th>
              <th className="py-2 px-4 bg-gray-200">Modelo</th>
              <th className="py-2 px-4 bg-gray-200">Serial</th>
              <th className="py-2 px-4 bg-gray-200">Color</th>
              <th className="py-2 px-4 bg-gray-200">Máx. Litros</th>
              <th className="py-2 px-4 bg-gray-200">Cédula del Propietario</th>
              <th className="py-2 px-4 bg-gray-200">Código</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.length > 0 ? (
              vehiculos.map((vehiculo) => (
                <tr key={vehiculo.serial_car} className="text-center border-t">
                  <td className="py-2 px-4">{vehiculo.placa_car}</td>
                  <td className="py-2 px-4">{vehiculo.marca_car}</td>
                  <td className="py-2 px-4">{vehiculo.modelo_car}</td>
                  <td className="py-2 px-4">{vehiculo.serial_car}</td>
                  <td className="py-2 px-4">{vehiculo.color_car}</td>
                  <td className="py-2 px-4">{vehiculo.maxlitros_car}</td>
                  <td className="py-2 px-4">{vehiculo.cedula_pro}</td>
                  <td className="py-2 px-4">{vehiculo.codigo_car}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No hay vehículos asociados a este propietario.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportPropietarioVehiculo;
