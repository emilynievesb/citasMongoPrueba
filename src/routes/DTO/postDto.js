import { date, number, string, object } from "yup";
const agregarCitaDTO = async (req, res, next) => {
  try {
    let productSchema = object({
      primerNombre: string().required(),
      segundoNombre: string().required(),
      primerApellido: string().required(),
      segundoApellido: string().required(),
      telefono: number().required().positive(),
      direccion: string().required(),
      email: string().required(),
      tipoDocumento: number().required().positive(),
      genero: number().required().positive(),
      acudiente: number().nullable().positive(),
    });
    await productSchema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json(error.errors);
  }
};

export { agregarCitaDTO };
