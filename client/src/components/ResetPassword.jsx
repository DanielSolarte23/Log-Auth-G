import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../App.css";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      return setMessage("Las contraseñas no coinciden");
    }
    try {
      const res = await axios.post(
        `http://localhost:3002/api/reset-password/${token}`,
        { password }
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Hubo un error al restablecer la contraseña");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Restablecer Contraseña</h1>

      <div>
        <input
          type="password"
          placeholder="Nueva contraseña"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "Debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="Confirmar contraseña"
          {...register("confirmPassword", {
            required: "La confirmación es obligatoria",
            validate: (value) =>
              value === watch("password") || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">Restablecer</button>
      <p>{message ? message + <Link to="/login">Iniciar Sesion</Link> : ""}</p>
    </form>
  );
};

export default ResetPasswordForm;
