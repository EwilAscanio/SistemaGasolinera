import axios from "axios";
import { FaBarcode } from "react-icons/fa";
import { LuArrowRight } from "react-icons/lu";
import { IoIosColorPalette, IoIosBarcode, IoLogoModelS } from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import { SiRimacautomobili } from "react-icons/si";
import { FaGasPump } from "react-icons/fa6";
import { FaBuilding, FaCode } from "react-icons/fa";
import { MdOutlineCarCrash } from "react-icons/md";
import EliminarVehiculo from "@/components/EliminarVehiculo";

const loadVehiculo = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/${id}`
  );
  return data;
};

const loadUsoVehiculo = async (id) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/cars/usocars/${id}`
  );
  return data;
};

const PageEliminarCars = async ({ params }) => {
  const vehiculo = await loadVehiculo(params.id);
  const id_uso = vehiculo.id_uso;
  const usoVehiculo = await loadUsoVehiculo(id_uso);

  return (
    <>
      <div className="flex justify-around mt-4"></div>
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Eliminar Vehiculo
            </h1>
            <p className="text-gray-600 mt-2">Datos a Eliminar</p>
          </div>
          <form className="space-y-4">
            {/* <div className="flex items-center relative">
              <FaBarcode
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Cedula del propietario"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled
              />
              <button
                type="button"
                onClick={() => buscarPropietario(getValues("cedula_pro"))}
                className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
              >
                Buscar
              </button>
            </div> */}
            <div className="grid grid-cols-2 gap-4">
              {/* Campo numero 1 del Formulario PLACA VEHICULO */}
              <div className="relative">
                <CiCreditCard1
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Placa Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={vehiculo.placa_car}
                  disabled
                />
              </div>

              {/* Campo numero 2 del Formulario PLACA VEHICULO */}
              <div className="relative">
                <FaCode
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Codigo Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={vehiculo.codigo_car}
                  disabled
                />
              </div>

              {/* Campo numero 3 del Formulario MARCA VEHICULO */}
              <div className="relative">
                <SiRimacautomobili
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Marca Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={vehiculo.marca_car}
                  disabled
                />
              </div>

              {/* Campo numero 4 del Formulario MODELO VEHICULO */}
              <div className="relative">
                <IoLogoModelS
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Modelo Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={vehiculo.modelo_car}
                  disabled
                />
              </div>

              {/* Campo numero 5 del Formulario SERIAL VEHICULO */}
              <div className="relative">
                <IoIosBarcode
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Serial Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={vehiculo.serial_car}
                  disabled
                />
              </div>

              {/* Campo numero 6 del Formulario COLOR VEHICULO */}
              <div className="relative">
                <IoIosColorPalette
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Color Vehiculo"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={vehiculo.color_car}
                  disabled
                />
              </div>

              {/* Campo numero 7 del Formulario MAX LITROS */}
              <div className="relative">
                <FaGasPump
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="numeric"
                  placeholder="Max de Litros"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={vehiculo.maxlitros_car}
                  disabled
                />
              </div>

              {/* Campo numero 8 del Formulario TIPO VEHICULO */}
              <div className="relative">
                <select
                  className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  defaultValue={vehiculo.id_tip}
                  disabled
                >
                  <option value="">Tipo Vehiculo</option>
                  <option value="1">Sedan</option>
                  <option value="2">Camioneta</option>
                  <option value="3">Camion</option>
                  <option value="4">Gandola</option>
                  <option value="5">Moto</option>
                </select>

                <MdOutlineCarCrash
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <LuArrowRight
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400"
                  size={20}
                />
              </div>

              {/* Campo numero 9 del Formulario USO VEHICULO */}
              <div className="relative">
                <select
                  className="text-gray-400 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  disabled
                >
                  {/* <option value="">Uso del Vehiculo</option> */}
                  <option value={usoVehiculo[0].id_uso}>
                    {usoVehiculo[0].name_uso}
                  </option>
                </select>
                <FaBuilding
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <LuArrowRight
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400"
                  size={20}
                />
              </div>

              <EliminarVehiculo placa_car={vehiculo.placa_car} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PageEliminarCars;
