
import { Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  googleCallback,
  googleLogout,
} from "../controller/googleAuth.controller.js";
import dotenv from "dotenv";
dotenv.config()

const router = Router();

// Configurar Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALL_BACK_URL,
      prompt: "select_account",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const userData = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          accessToken, // Guardar el accessToken
        };
        done(null, userData);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Callback de Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    try {
      const result = await googleCallback(req, req.user);

      res.cookie("token", result.token);

      //Redireccion al front despues de la autenticacion
      res.redirect(`http://localhost:5173/usuarios`);
    } catch (error) {
      res.redirect("http://localhost:5173/notfound");
    }
  }
);

router.post("/google/logout", googleLogout);

export default router;
