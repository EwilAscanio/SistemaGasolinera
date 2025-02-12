import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

// Método para consultar los datos para el reporte Ventas de Combustible según su Uso de Vehículo
export const GET = async (request) => {
  try {
    // Obtener los parámetros de la URL
    const { searchParams } = new URL(request.url);
    const fechaInicial = searchParams.get("fechaInicial");
    const fechaFinal = searchParams.get("fechaFinal");
    const id_tip = searchParams.get("id_tip");

    // Validar que las fechas estén presentes
    if (!fechaInicial || !fechaFinal || !id_tip) {
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
        SELECT * FROM ventascombustible JOIN tipoCars ON ventascombustible.id_tip = tipoCars.id_tip
        where ventascombustible.fechadespacho >= ? and ventascombustible.fechadespacho <= ?
        and tipoCars.id_tip = ?;
      `,
      [fechaInicio, fechaFin, id_tip] // Pasar los parámetros
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
