"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportePDF from "@/components/reportes/DespachoUsoVehiculo"; // Asegúrate de importar el componente PDF

const DespachoUso = () => {
  const router = useRouter();
  const [despacho, setDespacho] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const fechaInicial = params.get("fechaInicial");
    const fechaFinal = params.get("fechaFinal");

    const fetchDespacho = async () => {
      if (fechaInicial && fechaFinal) {
        try {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/reportes/despachouso/despacho?fechaInicial=${fechaInicial}&fechaFinal=${fechaFinal}`
          );
          console.log("Data Report Desc:", res.data);
          setDespacho(res.data); // Almacena el array de vehículos
        } catch (error) {
          console.error("Error al Buscar el Despacho:", error);
          setError("Error al cargar los datos de los Despachos.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDespacho();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day} - ${month} - ${year}`;
  };

  if (loading)
    return (
      <p className="flex items-center justify-center h-screen">Cargando...</p>
    );
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="relative flex flex-col justify-between items-center">
        <h1 className="text-center text-3xl font-bold mb-4 mt-4">
          Reporte de Despacho por Uso de Vehículo
        </h1>

        <PDFDownloadLink
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          document={<ReportePDF despacho={despacho} />}
          fileName="reporte_despacho.pdf"
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
              <th className="py-2 px-4 bg-gray-200">Id Ticket</th>
              <th className="py-2 px-4 bg-gray-200">Cedula</th>
              <th className="py-2 px-4 bg-gray-200">Placa</th>
              <th className="py-2 px-4 bg-gray-200">Litros Despach.</th>
              <th className="py-2 px-4 bg-gray-200">Fecha Despach.</th>
              <th className="py-2 px-4 bg-gray-200">Uso Vehiculo</th>
            </tr>
          </thead>
          <tbody>
            {despacho.length > 0 ? (
              despacho.map((item) => (
                <tr key={item.id_ticket} className="text-center border-t">
                  <td className="py-2 px-4">{item.id_ticket}</td>
                  <td className="py-2 px-4">{item.cedula_pro}</td>
                  <td className="py-2 px-4">{item.placa_car}</td>
                  <td className="py-2 px-4">{item.litrosdespachados}</td>
                  <td className="py-2 px-4">
                    {formatDate(item.fechadespacho)}
                  </td>
                  <td className="py-2 px-4">{item.name_uso}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No hay despachos asociados a esta fecha.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DespachoUso;
