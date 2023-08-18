import { Usuario } from "../collections/usuario.js";

const getUsuario = async () => {
  const usuario = new Usuario();
  return await usuario.getUsuario();
};

export { getUsuario };
