import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const cedulaPro = params.id; // Asegúrate de que params.id contenga el valor correcto
    console.log("Cédula del propietario:", cedulaPro);

    const result = await conn.query(
      `
          SELECT * FROM cars 
          INNER JOIN propietario ON cars.cedula_pro = propietario.cedula_pro 
          WHERE cars.cedula_pro = ?`,
      [cedulaPro]
    ); // Usar consulta parametrizada

    console.log("Resultado de la consulta:", result);

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Propietario no encontrado",
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
