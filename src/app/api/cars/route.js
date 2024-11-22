import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const result = await conn.query("SELECT * FROM cars");

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
      placa_car,
      marca_car,
      modelo_car,
      serial_car,
      color_car,
      maxlitros_car,
      id_tip,
    } = data;

    console.log("DATA", data);

    const result = await conn.query("INSERT INTO cars set ?", {
      placa_car,
      marca_car,
      modelo_car,
      serial_car,
      color_car,
      maxlitros_car,
      id_tip,
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
