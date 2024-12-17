import { conn } from "@/libs/mariadb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const result = await conn.query(`
          SELECT * FROM propietario WHERE cedula_pro = "${params.id}"`);

    if (result.lenght === 0 || result == []) {
      return NextResponse(
        {
          message: "Propietario no encontrado",
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
      cedula_pro,
      name_pro,
      apellido_pro,
      direccion_pro,
      telefono_pro,
      email_pro,
    } = await req.json();

    const result = await conn.query(
      `
    UPDATE propietario
    SET cedula_pro = ?, name_pro = ?, apellido_pro = ?, direccion_pro = ?, telefono_pro = ?, email_pro = ?
    WHERE cedula_pro = ?
  `,
      [
        cedula_pro,
        name_pro,
        apellido_pro,
        direccion_pro,
        telefono_pro,
        email_pro,
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
  try {
    if (!params.id) {
      return NextResponse.json(
        {
          message: "ID inválido",
        },
        {
          status: 400,
        }
      );
    }

    const result = await conn.query(
      `DELETE FROM propietario WHERE cedula_pro = ?`,
      [params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Propietario no encontrado",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "El Propietario ha sido eliminado exitosamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error); // Log del error para el desarrollador
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
