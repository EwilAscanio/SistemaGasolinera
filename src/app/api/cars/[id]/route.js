import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

/*

export const GET = async () => {
  try {
    const result = await conn.query("SELECT * FROM animal");

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: result.error || "Error al obtener los animales",
      },
      {
        status: 500,
      }
    );
  }
};
*/

export const GET = async (req, { params }) => {
  console.log("Params GET DELETE:", params);
  try {
    console.log("Parámetros recibidos get delete:", params);

    const result = await conn.query(`
          SELECT * FROM users WHERE id_usr = "${params.id}"`);

    console.log("Result", result);

    if (result.lenght === 0 || result == []) {
      return NextResponse(
        {
          message: "Usuario no encontrado",
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
