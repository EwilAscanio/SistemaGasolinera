import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await conn.query("SELECT * FROM propietario");

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
