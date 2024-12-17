import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const result = await conn.query(
      `
      SELECT * FROM usocars WHERE id_uso = ?`,
      [params.id]
    );

    // Verifica si el resultado está vacío
    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Categoría no encontrada",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(result, { status: 200 });
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
    const { name_uso } = await req.json();

    const result = await conn.query(
      `
        UPDATE usoCars
        SET name_uso = "${name_uso}"
        WHERE id_uso = "${params.id}"
      `
    );

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

export const DELETE = async (req, { params }) => {
  const result = await conn.query(`
          DELETE FROM usocars WHERE id_uso = "${params.id}"`);
  try {
    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Categoría no encontrada",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Categoría eliminada exitosamente",
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
