import User from "../models/user.model.js"
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener usuarios" })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" })
        res.json(user)
    } catch (error) {
        return res.status(404).json({ message: "Usuario no encontrado" })
    }
}

export const updateUser = async (req, res) => {
    const { email, password, username } = req.body;
    const { id } = req.params;

    try {
  
        const userFound = await User.findById(id);
        if (!userFound) return res.status(404).json(['Usuario no encontrado']);

        if (email && email !== userFound.email) {
            const emailTaken = await User.findOne({ email });
            if (emailTaken) return res.status(400).json(['El correo ya está en uso']);
        }

        let passwordHash;
        if (password) {
            passwordHash = await bcrypt.hash(password, 10);
        } else {
            passwordHash = userFound.password;
        }
        
        const updatedUser = await User.findByIdAndUpdate(id, {
            username: username || userFound.username, 
            email: email || userFound.email,
            password: passwordHash,
        }, { new: true });

        res.json({
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
        });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado" })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: "Usuario no encontrado" })
    }
}
