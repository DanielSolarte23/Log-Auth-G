import { Router } from "express";
import { 
  login, 
  register, 
  logout, 
  profile, 
  verifyToken 
} from "../controller/auth.controller.js";
import { 
  verifyEmail, 
  requestPasswordReset, 
  resetPassword 
} from "../controller/email.controller.js";
import { authRequire } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js"
import { 
  registerShema, 
  loginShema, 
  resetPasswordSchema 
} from "../schemas/auth.schema.js";

const router = Router();

// Rutas existentes
router.post('/register', validateSchema(registerShema), register);
router.post('/login', validateSchema(loginShema), login);
router.post('/logout', logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequire, profile);


router.get('/verify-email/:token', verifyEmail);
router.post('/request-password-reset', requestPasswordReset);


// Procesa la nueva contraseña
router.post('/reset-password/:token', validateSchema(resetPasswordSchema), resetPassword);


export default router;