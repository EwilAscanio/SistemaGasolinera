import Image from "next/image";
import Link from "next/link";
import ImageHome from "@/images/Logo.jpg";

import Footer from "@/components/Footer";
import NavbarTransparent from "@/components/NavbarTransparent";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Contenedor de fondo con imagen y overlay */}
      <div className="fixed inset-0 -z-10">
        <Image
          src={ImageHome}
          alt="Fondo"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Contenido de la página */}
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}

        <NavbarTransparent />

        {/* Contenido principal */}
        <main className="flex-grow flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenido a Sistema de Control de Gasolina
          </h1>
          <p className="text-xl mb-8">
            Manejo interno para el control de surtido de Gasolina
          </p>

          <div className="space-x-4">
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Iniciar Sesión
            </Link>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
