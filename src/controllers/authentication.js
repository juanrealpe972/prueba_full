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
        .json({ message: "Usuario Autorizado", data: rows, token: token }),
        res.cookie("token", token)
    } else {
      res.status(404).json({ message: "Usuario no autorizado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verificarUsuario = async (req, res) => {
  try {
    const token = req.cookies;
    const [rows] = await pool.query(`SELECT * FROM usuarios`);
    if (!token) return res.status(404).json({ message: "No autorizado" });
    jwt.verify(token, process.env.AUT_SECRET, async (err) => {
      if (err) return res.status(401).json({ message: "No autorizado" });
      res.status(200).json({ message: "El usuario es", data: rows });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
