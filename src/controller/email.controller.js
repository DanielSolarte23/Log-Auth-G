// email.controller.js
import { transporter } from '../config/mailer.js';
import crypto from 'crypto';
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config/config.js";
import { createAccesToken } from "../libs/jwt.js";
import dotenv from 'dotenv';
dotenv.config();

export const sendVerificationEmail = async (user, host) => {
  const verificationToken = crypto.randomBytes(32).toString('hex');


  user.verificationToken = verificationToken;
  await user.save();

  const verificationLink = `http://${host}/api/verify-email/${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verifica tu correo electrónico',
    html: `
      <h1>Verifica tu correo electrónico</h1>
      <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Token de verificación inválido" });
    }

    // Actualizar el estado de verificación
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    // Generar nuevo token de acceso con el estado verified actualizado
    const accessToken = await createAccesToken({
      id: user._id,
      verified: true
    });

    // Enviar el token en una cookie
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    // Enviar respuesta con los datos del usuario y mensaje de éxito
    res.json({
      message: "Email verificado exitosamente",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = Date.now() + 3600000; // 1 hora

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetPasswordExpires;
    await user.save();

    // Cambia esto para apuntar al frontend
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Restablecimiento de contraseña',
      html: `
        <h1>Restablecimiento de contraseña</h1>
        <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace expirará en 1 hora.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Se ha enviado un enlace de restablecimiento a tu correo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Token de restablecimiento inválido o expirado"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    user.password = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
