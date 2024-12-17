import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await conn.query("SELECT * FROM cars");

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: result.error || "Error al obtener los vehiculos",
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

    const {
      cedula_pro,
      placa_car,
      marca_car,
      modelo_car,
      serial_car,
      color_car,
      maxlitros_car,
      id_tip,
      id_uso,
    } = data;

    // Verificar si la placa ya está registrada
    const placaExistente = await conn.query(
      "SELECT * FROM cars WHERE placa_car = ?",
      [placa_car]
    );

    if (placaExistente.length > 0) {
      return NextResponse.json(
        { message: "La placa ya está registrada." },
        { status: 400 }
      );
    }

    const result = await conn.query("INSERT INTO cars set ?", {
      cedula_pro,
      placa_car,
      marca_car,
      modelo_car,
      serial_car,
      color_car,
      maxlitros_car,
      id_tip,
      id_uso,
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
