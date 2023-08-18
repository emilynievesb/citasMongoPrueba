class Usuario {
  _id;
  usu_nombre;
  usu_segdo_nombre;
  usu_primer_apellido;
  usu_segdo_apellido;
  usu_telefono;
  usu_direccion;
  usu_email;
  usu_tipodoc;
  usu_genero;
  usu_acudiente;
  constructor() {
    this.usu_nombre = "Emily";
    this.usu_segdo_nombre = "Julieth";
    this.usu_primer_apellido = "Nieves";
    this.usu_segdo_apellido = "Badillo";
    this.usu_telefono = 31616116;
    this.usu_direccion = "Calle 32";
    this.usu_email = "emi@gmail.com";
    this.usu_tipodoc = 1;
    this.usu_genero = 2;
    this.usu_acudiente = 111111;
  }

  async getUsuario() {
    return "Usuario retornado";
  }
}
export { Usuario };
