import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await conn.query("SELECT * FROM usoCars");

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          result.error || "Error al obtener los datos de uso del vehiculo",
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

    const { name_uso } = data;

    //Verificar si la categoría ya existe
    const categoriaExistente = await conn.query(
      "SELECT * FROM usoCars WHERE name_uso = ?",
      [name_uso]
    );
    if (categoriaExistente.length > 0) {
      return NextResponse.json(
        { message: "La categoría ya existe." },
        { status: 400 }
      );
    }

    const result = await conn.query("INSERT INTO usoCars set ?", {
      name_uso,
    });

    return NextResponse.json(result, { status: 200 });
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
