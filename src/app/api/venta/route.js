import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Consulta para sumar los litros despachados agrupados por mes
    const result = await conn.query(
      "SELECT MONTH(fechadespacho) AS mes, SUM(litrosdespachados) AS totalLitros FROM ventascombustible GROUP BY MONTH(fechadespacho)"
    );

    // Consulta para sumar todos los litros despachados (opcional)
    const [totalResult] = await conn.query(
      "SELECT SUM(litrosdespachados) AS totalLitros FROM ventascombustible"
    );

    // Procesa el resultado para asegurarte de que está en el formato correcto
    const ventasPorMes = result.map((item) => ({
      mes: item.mes,
      totalLitros: item.totalLitros,
    }));

    // Combina ambos resultados
    return NextResponse.json(
      {
        ventasPorMes, // Ventas agrupadas por mes
        totalLitros: totalResult.totalLitros, // Total de litros despachados
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "Error al obtener los datos",
      },
      {
        status: 500,
      }
    );
  }
};
