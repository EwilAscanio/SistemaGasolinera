import Sidebar from "@/components/Sidebar";
import NavRight from "@/components/NavRight";
import Image from "next/image";
import Logo from "@/images/Logo.jpg";

export default function Layout({ children }) {
  return (
    <>
      {/* Inicio de Layout */}
      <div className="grid grid-cols-[20%,1fr,1fr] grid-rows-[10%,1fr] gap-4 bg-white h-[100vh]">
        {/* Inicio del Grid Fila 1 */}
        <div className="relative flex items-center justify-center">
          <div className="relative flex items-center justify-center h-[100%] min-h-[200px">
            {/* Cambiado a relative */}
            <Image
              src={Logo}
              alt="Logo"
              className="mt-16 object-contain rounded-full shadow-xl w-auto max-h-28"
              priority
              width={100} // Ajusta el ancho
              height={100} // Ajusta la altura
            />
          </div>
        </div>
        {/* Inicio de la Fila numero 2 */}

        <div className="col-span-2 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-around">
            <NavRight />
          </div>
        </div>

        {/* Inicio de la Fila numero 3 */}
        <div className="row-span-6 row-start-2 mt-10">
          <Sidebar />
        </div>

        {/* Inicio de la fila numero 4 */}
        <div className="col-span-2 row-span-6 row-start-2 bg-slate-100 flex flex-col items-center justify-center">
          {/* Inicio del Children */}
          <div className="relative bg-slate-100 w-[100%] h-[100%] rounded-3xl">
            <main className="absolute w-full max-h-full">{children}</main>
          </div>
        </div>
      </div>
    </>
  );
}
