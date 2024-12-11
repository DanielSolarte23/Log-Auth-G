import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config/config.js";

export const authRequire = (req, res, next) => {
    const { token } = req.cookies;

    if (!token)
        return res.status(401).json({ mensaje: "No autorizacion de token" });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ mensaje: "Token Invalido" });

        req.user = user

        next()
    })
}