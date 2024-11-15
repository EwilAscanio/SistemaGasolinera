import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const data = await req.json();
    console.log(data);
    const {
      cedula_pro,
      name_pro,
      apellido_pro,
      direccion_pro,
      telefono_pro,
      email_pro,
    } = data;

    console.log("DATA", data);

    const result = await conn.query("INSERT INTO propietario set ?", {
      cedula_pro,
      name_pro,
      apellido_pro,
      direccion_pro,
      telefono_pro,
      email_pro,
    });

    console.log(result);

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
