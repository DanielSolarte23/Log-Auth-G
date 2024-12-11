import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import { getUser, getUsers, updateUser, deleteUser } from "../controller/user.controller.js";
import { registerShema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js"

const router = Router();

router.get('/usuarios', authRequire, getUsers)
router.get('/usuarios/:id', authRequire, getUser)
router.put('/usuarios/:id', authRequire, validateSchema(registerShema), updateUser)
router.delete('/usuarios/:id', authRequire, deleteUser)

export default router