import {hashPassword, genToken, verifyPassword, handleJoinRoomChat} from "../common/index.js";
import user from '../models/user.js';




const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const passwordHashed = await hashPassword(password);
        const userExit = await user.findOne({email});
        if (userExit) {
            res
                .status(404)
                .json({message: "The account has been previously registered"});
        } else {
            const newUser = await user.create({
                name, email, password: passwordHashed,
            });
            const token = genToken(newUser._id);
            const {password, __v, ...resUser} = newUser._doc;
            await handleJoinRoomChat(newUser._id)
            res.status(200).json({token: token, user: resUser});
        }
    } catch (error) {
        console.log({error})
        res.status(404).json({message: error.message});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userExit = await user.findOne({email: email});
        if (!userExit) {
            res.status(404).json({
                message: "This email has not been registered for an account.",
            });
        } else {
            const isPw = await verifyPassword(password, userExit.password);
            if (!isPw) {
                res.status(403).json({
                    message: "The password you entered is incorrect, please check again",
                });
            } else {
                const token = genToken(userExit._id);
                const {password, __v, ...resUser} = userExit._doc;
                await handleJoinRoomChat(userExit._id)
                res.status(200).json({token: token, user: resUser});
            }
        }
    } catch (error) {
        console.log({error})
        res.status(404).json({message: error.message});
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({message: "Logout successfully"});
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message});
    }
};

export {register, login, logout};
