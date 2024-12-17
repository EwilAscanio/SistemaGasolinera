"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Logo from "@/images/Logo.jpg";

const Navbar2 = () => {
  const [isClick, setisClick] = useState(false);
  const toogleNavbar = () => {
    setisClick(!isClick);
  };

  return (
    <nav className="bg-transparent text-white">
      <div className="container mx-auto px-4 py-2 flex justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={Logo}
            alt="Logo"
            width={150}
            height={150}
            className="rounded-full shadow-2xl"
          />
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-xl sm:lg hover:text-blue-500 hover:underline cursor-pointer"
          >
            Inicio
          </Link>

          <Link
            href="/services"
            className="text-xl sm:lg hover:text-blue-500 hover:underline cursor-pointer"
          >
            Servicios
          </Link>
          <Link
            href="/contact"
            className="text-xl sm:lg hover:text-blue-500 hover:underline cursor-pointer"
          >
            Contacto
          </Link>
        </div>
        <button
          onClick={toogleNavbar}
          className="md:hidden block p-2 rounded-md hover:bg-transparentinline-flex items-center justify-center text-white hover:text-white "
        >
          {isClick ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/200/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/200/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {isClick && (
        <div className="md:hidden block">
          <div className="container mx-auto px-4 py-2">
            <ul className=" flex items-center justify-center gap-4">
              <li>
                <Link
                  href="/"
                  className="text-lg hover:text-blue-500 hover:underline cursor-pointer"
                >
                  Inicio
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="text-lg hover:text-blue-500 hover:underline cursor-pointer"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-lg hover:text-blue-500 hover:underline cursor-pointer"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;
