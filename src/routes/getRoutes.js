import { Router } from "express";
import {
  authorizationMiddleware,
  contentMiddlewareUsuario,
} from "../utils/token.js";
import { getUsuarioController } from "../controllers/getControllers.js";
const getInitRoute = () => {
  const router = Router();
  router.get(
    "/usuario",
    authorizationMiddleware,
    contentMiddlewareUsuario,
    getUsuarioController
  );
  return router;
};
export { getInitRoute };
