import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto';
import fs from 'fs';

import group from "../models/group.js";

const hashPassword = async (pw) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(pw, salt);
    return hash;
};

const verifyPassword = async (pw, pwHash) => {
    return await bcrypt.compare(pw, pwHash);
};

const KEY_FILE_PATH = './secret.key';
let secretKey;
if (fs.existsSync(KEY_FILE_PATH)) {
    secretKey = fs.readFileSync(KEY_FILE_PATH);
} else {
    secretKey = crypto.randomBytes(32);
    fs.writeFileSync(KEY_FILE_PATH, secretKey);
}

const iv = crypto.randomBytes(16);

const encryptMessage = (message) => {
    const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

const decryptMessage = (encryptedMessage) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const genToken = (id) => {
    const token = jwt.sign({ id }, process.env.KEY_JWT);
    return token;
};

const handleJoinRoomChat = async (uId) => {
    const rooms = await group.find({$or: [{creator: uId}, {receiver: uId}]});
    const idRooms  = rooms.map(r => r._id.toString());
    idRooms.forEach((id) => {
        _io.socketsJoin(id)
    })
}

export { hashPassword, genToken, verifyPassword, handleJoinRoomChat, encryptMessage, decryptMessage };
