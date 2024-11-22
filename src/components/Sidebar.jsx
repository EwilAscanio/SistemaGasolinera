import Button from "./Button";

import { MdDashboardCustomize } from "react-icons/md";
import { FaUsers, FaUserShield, FaHorseHead, FaCarSide } from "react-icons/fa6";
import { MdPointOfSale } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

const loadUser = async (email) => {
  const { data } = await axios.get(`http://localhost:3000/api/users/${email}`);
  console.log("Data recibida de funcion loadUser:", data);
  return data;
};
const Sidebar = async () => {
  const sesion = await getServerSession(authOptions);
  const user = sesion.user;
  const user_rol = await loadUser(user.email);

  return (
    <>
      <div className="flex flex-col gap-1 items-center mt-10">
        <h2 className="font-bold underline text-blue-800 drop-shadow-lg text-lg">
          Menu de Usuarios
        </h2>
        {user_rol.name_rol == "Administrador" ? (
          <>
            <Button
              url={"/auth/dashboard"}
              content="Dashboard"
              icono={<MdDashboardCustomize />}
            />
            <Button
              url={"/auth/dashboard/listusers"}
              content="Usuarios"
              icono={<TbReportAnalytics />}
            />

            <Button
              url={"/auth/dashboard/propietario"}
              content="Propietario"
              icono={<FaUsers />}
            />

            <Button
              url={"/auth/dashboard/cars"}
              content="Vehiculos"
              icono={<FaCarSide />}
            />
          </>
        ) : (
          <>
            <Button
              url={"/dashboard"}
              content="Dashboard"
              icono={<MdDashboardCustomize />}
            />
            <Button
              url={"/auth/dashboard/users"}
              content="Listar Usuarios"
              icono={<TbReportAnalytics />}
            />
          </>
        )}
      </div>

      <div className="flex flex-col gap-3 items-center">
        <h2 className="mt-4 font-bold underline text-blue-800 drop-shadow-lg text-lg">
          Procesos
        </h2>
        <Button
          url={"/auth/dashboard/venta"}
          content="Venta Gasolina"
          icono={<MdPointOfSale />}
        />
      </div>
    </>
  );
};

export default Sidebar;
