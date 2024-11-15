import { conn } from "@/libs/mariadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

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

export const PUT = async (req, { params }) => {
  console.log("PARAMS PUT:", params);

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
    /*
      
      console.log(data);
      let { name_usr, login_usr, email_usr, password_usr, id_rol } = data;


        console.log(name_usr, login_usr, email_usr, password_usr, id_rol);
        
    const result = await conn.query(
    );
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Usuario no encontrado",
        },
        {
          status: 404,
        }
      );
    }*/
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

/*
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const data = await request.json();
    const { nombre, email } = data;

    // Validación básica
    if (!nombre || !email) {
      return Response.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Actualizar usuario en la base de datos
    const query =
      "UPDATE users SET name_usr = ?, email_usr = ? WHERE id_usr = ?";
    await conn.query(query, [nombre, email, id]);

    return Response.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    return Response.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
} */
