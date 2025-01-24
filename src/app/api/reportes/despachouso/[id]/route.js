import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

// Método para consultar los datos para el reporte Ventas de Combustible según su Uso de Vehículo
export const GET = async (request) => {
  try {
    // Obtener los parámetros de la URL
    const { searchParams } = new URL(request.url);
    const fechaInicial = searchParams.get("fechaInicial");
    const fechaFinal = searchParams.get("fechaFinal");

    console.log("Fechas:", fechaInicial, fechaFinal);

    // Validar que las fechas estén presentes
    if (!fechaInicial || !fechaFinal) {
      return NextResponse.json(
        {
          message: "Las fechas inicial y final son requeridas.",
        },
        {
          status: 400,
        }
      );
    }

    // Ajustar las fechas para incluir la hora
    const fechaInicio = `${fechaInicial} 00:00:00`;
    const fechaFin = `${fechaFinal} 23:59:59`;

    // Log de las fechas ajustadas
    console.log("Fechas Ajustadas:", fechaInicio, fechaFin);

    // Consulta SQL con filtro por fechas
    const result = await conn.query(
      `
     SELECT * FROM ventascombustible JOIN usoCars ON ventascombustible.id_uso = usoCars.id_uso
where ventascombustible.fechadespacho >= ? and ventascombustible.fechadespacho <= ?
      
      `,
      [fechaInicio, fechaFin] // Pasar las fechas como parámetros
    );

    console.log("Resultado de la consulta:", result);

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
