import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    if (result[0].length > 0) {
      res.status(200).json(result[0]);
    } else {
      res
        .status(404)
        .json({ message: "Error al listar usuarios: " + result[0] });
    }
  } catch (e) {
    res.status(500).json({ message: "Error con el sistema getUsers" + e });
  }
};

export const getUser = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE id_usuario = ?",
      [req.params.id]
    );
    if (result[0].length > 0) {
      res.status(201).json(result[0]);
    } else {
      res
        .status(404)
        .json({ message: "Error con el ID ingresada: " + result[0] });
    }
  } catch (e) {
    res.status(500).json({ message: "Error con el sistema getUsers" + e });
  }
};

export const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({errors});
    }
    const { nombres, direccion, telefono, correo, rol, password } = req.body;
    let sql = `INSERT INTO usuarios(nombres, direccion, telefono, correo, rol, password) VALUES (?,?,?,?,?,?)`;
    const [result] = await pool.query(sql, [nombres, direccion, telefono, correo, rol, password]);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Registro de mensaje exitoso" });
    } else {
      res.status(404).json({ message: "No se pudo registrar el usuario" });
    } 
  } catch (error) {
    res.status(500).json({ message: "Error con el sistema createUser: " + error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query(
      "UPDATE usuarios SET nombres = ?, direccion = ?, telefono = ?, correo = ?, rol = ?, password = ?"
    );
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error en el sistema de updateUser: " + e });
  }
};

export const deleteUser = async (req, res) => {
  try {
  } catch (e) {
    res
      .status(500)
      .json({ message: "Error en el sistema de updateUser: " + e });
  }
};
