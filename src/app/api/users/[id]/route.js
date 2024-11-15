import { NextResponse } from "next/server";
import { conn } from "@/libs/mariadb";

export const GET = async (req, { params }) => {
  console.log("Params GET:", params);
  try {
    console.log("Parámetros recibidos:", params);

    const result = await conn.query(`
          SELECT * FROM users INNER JOIN roles ON users.id_rol = roles.id_rol
          WHERE email_usr = "${params.id}"`);

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

export const DELETE = async (req, { params }) => {
  console.log("Params DELETE:", params);

  const result = await conn.query(`
          DELETE FROM users WHERE id_usr = "${params.id}"`);
  try {
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json("Usuario eliminado exitosamente");
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
