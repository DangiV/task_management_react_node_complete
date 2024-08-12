import { createToken } from '../auth.js';
import UserDetails from '../Model/UserModel.js';
import bcrypt from 'bcrypt';

export const UserRegister = async (req, res) => {
    const { fName, lName, email, password } = req.body;
    try {
        const userExist = await UserDetails.findOne({ email: email });
        if (userExist) {
            return res.status(400).json("Email already exists");
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const userData = await UserDetails.create({
            fName,
            lName,
            email,
            password: hashPassword
        });
        res.status(201).json(userData);
    } catch (error) {
        console.log(error);
        res.status(500).json("Server error");
    }
};

export const UserLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserDetails.findOne({ email });
        if (!user) {
            return res.status(400).json('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json('Invalid credentials');
        }

        const userToken = createToken(user.id);
        res.status(200).json({ message: 'User login successful', response: user, token: userToken });
    } catch (error) {
        console.log(error);
        res.status(500).json('Server error');
    }
};