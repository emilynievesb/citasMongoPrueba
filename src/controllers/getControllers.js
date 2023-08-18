import { getUsuario } from "../services/getServices.js";

const getUsuarioController = async (req, res, next) => {
  try {
    const res = await getUsuario();
    res.status(200).json(res);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export { getUsuarioController };
