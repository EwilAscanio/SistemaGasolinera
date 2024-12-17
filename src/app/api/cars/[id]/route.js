import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const result = await conn.query(
      `
          SELECT * FROM cars WHERE placa_car = ?`,
      [params.id]
    );

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
    const {
      placa_car,
      codigo_car,
      marca_car,
      modelo_car,
      serial_car,
      color_car,
      maxlitros_car,
      id_tip,
      id_uso,
    } = await req.json();

    const result = await conn.query(
      `
    UPDATE cars
    SET placa_car = ?, codigo_car = ?, marca_car = ?, modelo_car = ?, serial_car = ?, color_car = ?, maxlitros_car = ?, id_tip = ?, id_uso = ?
    WHERE placa_car = ?
  `,
      [
        placa_car,
        codigo_car,
        marca_car,
        modelo_car,
        serial_car,
        color_car,
        maxlitros_car,
        id_tip,
        id_uso,
        params.id,
      ]
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Ocurrió un error en el servidor.",
      },
      {
        status: 500,
      }
    );
  }
};

export const DELETE = async (req, { params }) => {
  const result = await conn.query(
    `
          DELETE FROM cars WHERE placa_car = ?`,
    [params.id]
  );

  try {
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Vehiculo no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Vehiculo eliminado exitosamente",
      },
      {
        status: 200,
      }
    );
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
