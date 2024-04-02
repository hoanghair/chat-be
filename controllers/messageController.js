import message from "../models/message.js";
import {decryptMessage, encryptMessage} from "../common/index.js";

const getMessage = async (req, res) => {
    try {
        const {id, query} = req;
        const messages = await message.find({group: query.group}, {__v: 0});
        const resMessages = messages.map((m) => {
            const messageDes = decryptMessage(m._doc.message);
            return {
                ...m._doc, message: messageDes, myMessage: m.uSend === id,
            }
        });
        res.status(200).json({messages: resMessages});
    } catch (error) {
        console.log({error})
        res.status(404).json({message: error.message});
    }
};

const addMessage = async (req, res) => {
    try {
        const {id, body} = req;

        const newMessage = await message.create({
            message: encryptMessage(body.content), uSend: id, group: body.groupId,
        });
        const messageRes = {...newMessage._doc, message: body.content}
        _io.to(body.groupId).emit('sendMessage',  {message: messageRes, groupId: body.groupId});
        res.status(200).json({message:messageRes});
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message});
    }
};

export {getMessage, addMessage};
