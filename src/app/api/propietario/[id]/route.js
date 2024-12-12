import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  console.log("Params GET PROPIETARIO:", params);
  try {
    console.log("Parámetros recibidos GET PROPIETARIO:", params);

    const result = await conn.query(`
          SELECT * FROM propietario WHERE cedula_pro = "${params.id}"`);

    console.log("Result", result);

    if (result.lenght === 0 || result == []) {
      return NextResponse(
        {
          message: "Propietario no encontrado",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
