import { z } from 'zod'

export const registerShema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido'
    }),
    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'correo invalido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, {
        message: 'La contraseña debe tener mas de 6 caracteres'
    })
})

export const loginShema = z.object({
    email: z.string({
        required_error: 'El correo es requerido'
    }).email({
        message: 'Correo invalido'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, {
        message: 'La contraseña debe tener mas de 6 caracteres'
    })
})

export const resetPasswordSchema = z.object({
    password: z.string()
      .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres"
      })
  });