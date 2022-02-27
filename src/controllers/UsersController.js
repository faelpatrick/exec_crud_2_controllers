import User from "../models/User";
import { createPasswordHash } from "../services/auth";

class UsersController {

    async index(req, res) {
        try {
            const users = await User.find();
            if (!users) return res.status(404).json({ error: "Not Found." });
            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ error: "User not found." });
            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async create(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne(email);
            if (user) return res.status(422).json({ message: `User ${email} already exists.` })
            //crypt password
            const encryptedPassword = await createPasswordHash(password);
            const newUser = User.create({ email, password: encryptedPassword });
            return res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, password } = req.body;
            const user = User.findById(id);
            if (!user) return res.status(404).json({ error: "User not found," });
            //crypt password
            const encryptedPassword = await createPasswordHash(password);
            await user.updateOne({ email, password: encryptedPassword });
            return res.status(200).json({ message: "User updated." })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ error: "User not found." });
            await user.deleteOne();
            return res.status(200).json({ message: "User deleted." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error." })
        }
    }
}
export default new UsersController();
