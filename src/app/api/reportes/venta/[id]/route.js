import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

// Método para consultar los datos para el reporte Ventas de Combustible según su Uso de Vehículo
export const GET = async (request) => {
  try {
    // Obtener los parámetros de la URL
    const { searchParams } = new URL(request.url);
    const fechaInicial = searchParams.get("fechaInicial");
    const fechaFinal = searchParams.get("fechaFinal");

    // Validar que las fechas estén presentes
    if (!fechaInicial || !fechaFinal) {
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
        SELECT * FROM ventascombustible where fechadespacho >= ? and fechadespacho <= ?;
      `,
      [fechaInicio, fechaFin] // Pasar los parámetros
    );

    // Validar si no se encontraron registros
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

    //Consulta para obtener el total de Litros despachados.
    const totalResult = await conn.query(
      `
        SELECT sum(litrosdespachados) as totalLitros FROM ventascombustible where fechadespacho >= ? and fechadespacho <= ?;
      `,
      [fechaInicio, fechaFin] // Pasar los parámetros
    );

    //Obtener el total de Litros despachados
    const totalLitros = totalResult[0].totalLitros || 0;

    return NextResponse.json({
      registros: result,
      totalLitros: totalLitros,
    });
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
