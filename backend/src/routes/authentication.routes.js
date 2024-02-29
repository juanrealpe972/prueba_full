import { Router } from "express";
import {
  iniciarUser,
  verificarUsuario,
} from "../controllers/authentication.js";

const routerAuth = Router();

routerAuth.post("/validar", iniciarUser);
routerAuth.get("/verificar", verificarUsuario);

export default routerAuth;
