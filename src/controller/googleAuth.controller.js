import User from "../models/user.model.js";
import { createAccesToken } from "../libs/jwt.js";

export const googleCallback = async (req, user) => {
  try {
    // Buscar si el usuario ya existe por email
    let userFound = await User.findOne({ email: user.email });
    
    if (!userFound) {
      // Si no existe, crear nuevo usuario
      const newUser = new User({
        username: user.name,
        email: user.email,
        googleId: user.googleId,
      });
      userFound = await newUser.save();
    }
    
    // Crear token
    const token = await createAccesToken({ id: userFound._id });
    
    return {
      token,
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      }
    };
  } catch (error) {
    throw error;
  }
};


export const googleLogout = async (req, res) => {
    try {
        // Limpiar la cookie del token
        res.cookie('token', "", {
            expires: new Date(0)
        });
        
        // Limpiar la sesión de passport
        if (req.logout) {
            req.logout();
        }

        // Primero revocar el acceso local
        const revokeUrl = 'https://accounts.google.com/o/oauth2/revoke';
        const token = req.user?.accessToken; 

        if (token) {
            try {
                await fetch(`${revokeUrl}?token=${token}`);
            } catch (error) {
                console.error('Error revocando token:', error);
            }
        }

        // Redirigir a Google logout y luego volver a tu aplicación
        res.redirect(`https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${encodeURIComponent('http://localhost:5173')}`);
        
    } catch (error) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
    }
};