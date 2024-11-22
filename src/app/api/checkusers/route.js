import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();
    const { login_usr, email_usr } = data;

    // Verificar si el usuario existe
    const existingUser = await conn.query(
      "SELECT * FROM users WHERE login_usr = ? OR email_usr = ?",
      [login_usr, email_usr]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          message: "El nombre de usuario o correo electrónico ya está en uso.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json({ exists: false });
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
