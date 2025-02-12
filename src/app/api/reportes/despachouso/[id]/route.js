import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

// Método para consultar los datos para el reporte Ventas de Combustible según su Uso de Vehículo
export const GET = async (request) => {
  try {
    // Obtener los parámetros de la URL
    const { searchParams } = new URL(request.url);
    const fechaInicial = searchParams.get("fechaInicial");
    const fechaFinal = searchParams.get("fechaFinal");
    const id_uso = searchParams.get("id_uso");

    // Validar que las fechas estén presentes
    if (!fechaInicial || !fechaFinal || !id_uso) {
      return NextResponse.json(
        {
          message: "Todos los datos son requeridas.",
        },
        {
          status: 400,
        }
      );
    }

    // Ajustar las fechas para incluir la hora
    const fechaInicio = `${fechaInicial} 00:00:00`;
    const fechaFin = `${fechaFinal} 23:59:59`;

    // Consulta SQL con filtro por fechas
    const result = await conn.query(
      `
     SELECT * FROM ventascombustible JOIN usoCars ON ventascombustible.id_uso = usoCars.id_uso
where ventascombustible.fechadespacho >= ? and ventascombustible.fechadespacho <= ? and usoCars.id_uso = ?
      
      `,
      [fechaInicio, fechaFin, id_uso] // Pasar las fechas como parámetros
    );

    // Validar si no hay registros
    if (result.length === 0) {
      return NextResponse.json(
        {
          message:
            "No se encontraron registros para las fechas proporcionadas.",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error en la API:", error); // Log del error
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
