import { conn } from "@/libs/mariadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  console.log("Params GET UPDATE:", params);
  try {
    console.log("Parámetros recibidos get UPDATE:", params);

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

export const PUT = async (req, { params }) => {
  try {
    let { name_usr, login_usr, email_usr, password_usr, id_rol } =
      await req.json();

    password_usr = await bcrypt.hash(password_usr, 5);

    const result = await conn.query(
      `
        UPDATE users
        SET name_usr = "${name_usr}", login_usr = "${login_usr}", email_usr = "${email_usr}", password_usr = "${password_usr}", id_rol = "${id_rol}"
        WHERE id_usr = "${params.id}"
      `
    );

    console.log("RESULT", result);

    return NextResponse.json(result);
  } catch (error) {
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
