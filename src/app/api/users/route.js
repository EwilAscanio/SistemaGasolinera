import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async () => {
  /* Comentario: Realizacion de la consulta a la base de datos
  para traer todos los usuarios registrados.
  Se utiliza un try catch para evaluar si la solicitud fue realizada
  con exito permite la consulta a la base de datos de los contrario da un error con status 500.
*/
  try {
    const result = await conn.query("SELECT * FROM users");

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: result.error,
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (req) => {
  try {
    const data = await req.json();

    let { name_usr, login_usr, email_usr, password_usr, id_rol } = data;
    password_usr = await bcrypt.hash(password_usr, 5);

    const result = await conn.query("INSERT INTO users set ?", {
      name_usr,
      login_usr,
      email_usr,
      password_usr,
      id_rol,
    });

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
