import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controllers.js";
import { validarUsuario } from "../middleware/usuario.js";

const routerUser = Router();

routerUser.get("/listar", getUsers);
routerUser.get("/buscar/:id", getUser);
routerUser.post("/crear", validarUsuario, createUser);
routerUser.put("/actualizar/:id", updateUser);
routerUser.delete("/eliminar/:id", deleteUser);

export default routerUser;
