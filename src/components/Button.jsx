import Link from "next/link";
import React from "react";

const Button = ({ content, icono, url }) => {
  console.log(url);
  console.log(typeof url);
  return (
    <Link
      href={`${url}`}
      className="cursor-pointer w-48 h-10 bg-white text-black rounded-xl hover:bg-blue-600 hover:shadow-lg transition-all hover:duration-300 ease-in-out hover:text-white text-lg flex items-center gap-4 p-2"
    >
      <i>{icono}</i>
      <span className="text-lg">{content}</span>
    </Link>
  );
};

export default Button;
