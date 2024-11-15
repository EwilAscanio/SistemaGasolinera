"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { IoLogOut } from "react-icons/io5";
import Swal from "sweetalert2";

const LinkSignout = () => {
  return (
    <Link
      href="/api/auth/signout"
      onClick={(e) => {
        e.preventDefault();
        Swal.fire({
          title: "¿Estás seguro?",
          text: "Esta acción cerrará tu sesión.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#2563eb",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, cerrar sesión",
        }).then((result) => {
          if (result.isConfirmed) {
            signOut();
          }
        });
      }}
      className="flex flex-col items-center justify-center"
    >
      <i className="text-2xl text-center">
        <IoLogOut />
      </i>
      Cerrar Sesion
    </Link>
  );
};

export default LinkSignout;
