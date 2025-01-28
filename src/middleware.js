export { default } from "next-auth/middleware";

//Utilizamos esta configuracion para bloquear too acceso a las paginas si no esta logueado.
export const config = { matcher: ["/auth/dashboard/:path*"] };
