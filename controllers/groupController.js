import { decryptMessage } from "../common/index.js";
import group from "../models/group.js";
import message from "../models/message.js"

const getGroupChat = async (req, res) => {
    try {
        const {id} = req;
        const groups = await group
            .find({$or: [{creator: id}, {receiver: id}]}, {__v: 0})
            .populate([{
                path: "creator", select: "name avatar", match: {_id: {$ne: id}},
            }, {
                path: "receiver", select: "name avatar", match: {_id: {$ne: id}},
            },]);

        const resGroups = await Promise.all(groups.map(async (g) => {
            const lastMessage = await message.findOne({group: g._id}, {}, {sort: {createdAt: -1}});
            return {
              ...g.toObject(),
              msg: lastMessage
                ? {
                    content: decryptMessage(lastMessage.message),
                    createdAt: lastMessage.createdAt,
                  }
                : null,
            };
        }));
        res.status(200).json({groups: resGroups});
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error});
    }
};
const addGroup = async (req, res) => {
    try {
        const {id, body} = req;
        const newGroup = await group.create({creator: id, receiver: body.uid});
        _io.socketsJoin(newGroup._id);
        res.status(200).json({message: "Created successfully", groupId: newGroup._id});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export {getGroupChat, addGroup};
