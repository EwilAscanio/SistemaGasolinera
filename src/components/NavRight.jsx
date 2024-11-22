import Image from "next/image";
import { TiThMenu } from "react-icons/ti";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import imgbandera from "@/images/banderaVzla.png";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LinkSignout from "./ui/LinkSignout";
import axios from "axios";

const loadUser = async (email) => {
  const { data } = await axios.get(`http://localhost:3000/api/users/${email}`);
  console.log("Data recibida de funcion loadUser:", data);
  return data;
};

const NavRight = async () => {
  const sesion = await getServerSession(authOptions);
  console.log("Sesion:", sesion);
  console.log("Sesion User:", sesion.user);

  const user = sesion.user;
  console.log("Usuario Recibido en Sesion:", user);

  const user_rol = await loadUser(user.email);
  console.log("rol:", user_rol);

  return (
    <>
      <div className="flex items-center gap-10">
        <TiThMenu />

        <div className="bg-gray-200 rounded-xl flex items-center text-gray-400 p-1">
          <FaSearch />
          <input
            className="bg-gray-200 border-none p-1 outline-none text-black w-[100%] rounded-xl ml-2"
            type="search"
            placeholder="Buscar"
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <IoIosNotifications />

        <Image
          src={imgbandera}
          width={30}
          height={10}
          alt="Bandera Venezuela"
          className="w-auto h-auto"
        ></Image>

        <p>Español</p>
      </div>

      <div className="flex items-center gap-4">
        <i className="text-2xl">
          <FaUserCircle />
        </i>

        <div>
          <p>{user.name}</p>
          <p>{user_rol.name_rol}</p>
        </div>
      </div>

      <div>
        <LinkSignout />
      </div>
    </>
  );
};

export default NavRight;
