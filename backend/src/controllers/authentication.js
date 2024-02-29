import { pool } from "../database/conexion.js";
import jwt from "jsonwebtoken";

export const iniciarUser = async (req, res) => {
  try {
    let { correo, password } = req.body;
    let sql = `SELECT id_usuario, nombres, rol FROM usuarios WHERE correo='${correo}' and password='${password}'`;
    const [rows] = await pool.query(sql);
    if (rows.length > 0) {
      const token = jwt.sign({ rows }, process.env.AUT_SECRET, {
        expiresIn: process.env.AUT_EXPIRE,
      });
      res
        .status(200)
        .json({ message: "Usuario Autorizado", data: rows, token: token });
    } else {
      res.status(404).json({ message: "Usuario no autorizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verificarUsuario = async (req, res, next) => {
  const [rows] = await pool.query(`SELECT * FROM usuarios`);
  try {
    const token_client = req.header("token");
    if (!token_client)
      return res.status(404).json({ message: "token es requerido" });
    else {
      const token = jwt.verify(
        token_client,
        process.env.AUT_SECRET,
        async (error, decoded) => {
          if (error)
            return res.status(401).json({ message: "token no valido" });
          else {
            next();
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
