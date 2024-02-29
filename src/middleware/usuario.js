import { check } from "express-validator";

export const validarUsuario = [
  check("nombres", "El nombre es obligaroio o maximo 50 caracteres")
    .not()
    .isEmpty()
    .isLength({ max: 50 }),
  check("correo", "El correo es invalido")
    .not()
    .isEmpty()
    .isEmail()
    .isLength({ max: 50 }),
];
