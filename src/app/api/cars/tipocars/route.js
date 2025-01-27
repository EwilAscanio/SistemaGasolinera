import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await conn.query("SELECT * FROM tipoCars");

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          result.error || "Error al obtener los datos de Tipo del vehiculo",
      },
      {
        status: 500,
      }
    );
  }
};
