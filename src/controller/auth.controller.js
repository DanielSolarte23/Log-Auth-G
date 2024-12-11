// controllers/auth.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "./email.controller.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userFound = await User.findOne({ email });
    if (userFound)
      return res.status(400).json(["El correo ya está en uso"]);

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
      verified: false
    });


    const userSaved = await newUser.save();


    await sendVerificationEmail(userSaved, req.headers.host);


    const token = await createAccesToken({
      id: userSaved._id,
      verified: false
    });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      verified: userSaved.verified,
      message: "Se ha enviado un correo de verificación a tu dirección de email"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Contraseña incorrecta"]);

    if (!userFound.verified) {
      return res.status(400).json(["Por favor verifica tu correo electrónico antes de iniciar sesión"]);
    }

    const token = await createAccesToken({
      id: userFound._id,
      verified: userFound.verified
    });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      verified: userFound.verified
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
    try {

        res.cookie('token', "", {
            expires: new Date(0)
        });

        if (req.logout) {
            req.logout();
        }

        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
    }
}

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)

  if (!userFound) return res.status(400).json({ mensaje: "Usuario no encontrado" })
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies

  if (!token) return res.status(401).json({ message: "No autorizado" })
  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id)
    if (!userFound) return res.status(401).json({ message: "No autorizado" })

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      verified: userFound.verified
    })
  })
}