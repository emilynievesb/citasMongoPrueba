import "reflect-metadata";
import { plainToClass, classToPlain } from "class-transformer";
import dotenv from "dotenv";
import { Router } from "express";
import { SignJWT, jwtVerify } from "jose";
import { Usuario } from "../collections/usuario.js";

dotenv.config();
const appToken = Router();

appToken.use("/:colletion", async (req, res) => {
  try {
    const { colletion } = req.params;
    console.log(colletion);
    const classMappings = {
      usuario: Usuario,
    };
    const ClassType = classMappings[colletion];
    if (!ClassType) {
      throw new Error("Clase no encontrada");
    }
    const inst = plainToClass(ClassType, {});
    const encoder = new TextEncoder();
    const jwtconstructor = new SignJWT(Object.assign({}, classToPlain(inst)));
    const jwt = await jwtconstructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("30m")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    req.data = jwt;
    res.status(201).send({ status: 201, message: jwt });
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .send({ status: 404, message: "Token solicitado no valido" });
  }
});

const authorizationMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization)
    return res.status(400).send({ status: 400, token: "Token no enviado" });
  try {
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    req.data = jwtData;
    next();
  } catch (error) {
    res.status(498).send({ status: 498, token: "Token caducado" });
  }
};

const contentMiddlewareUsuario = (req, res, next) => {
  let { payload } = req.data;
  const { iat, exp, ...newPayload } = payload;
  payload = newPayload;
  const inst = new Usuario();
  const classPlain = classToPlain(inst);
  let equal = JSON.stringify(classPlain) === JSON.stringify(payload);
  !equal
    ? res.status(406).send({ status: 406, message: "No Autorizado" })
    : next();
};

export { appToken, authorizationMiddleware, contentMiddlewareUsuario };
