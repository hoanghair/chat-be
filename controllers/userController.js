import user from "../models/user.js";
import group from "../models/group.js"

const getUser = async (req, res) => {
    try {
        const {id, query} = req;
        if (query.userId) {
            const resUser = await user.findById(query.userId, {password: 0, __v: 0});
            res.status(200).json({user: resUser});
        } else {
            const resUser = await user.findById(id, {password: 0, __v: 0});
            res.status(200).json({user: resUser});
        }

    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

const searchUser = async (req, res) => {
    try {
        const {id, query} = req;
        const users = await user.find({email: {$regex: query.email, $options: "i"}, _id: {$ne: id}}, {
            _id: 1, name: 1, email: 1
        })

        const resUsers = await Promise.all(users.map(async (u) => {
            const groupExists = await group.findOne({
                $or: [{creator: id, receiver: u._id}, {creator: u._id, receiver: id}]
            });
            return {
                ...u.toObject(), groupId: groupExists ? groupExists._id : null
            };
        }));

        res.status(200).json({data: resUsers});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

const updateUser = async (req, res) => {
    try {
        const {id, body} = req;
        const newUser = await user.findOneAndUpdate({_id: id}, {...body});
        res.status(200).json({data: newUser});
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message});
    }
}

export {getUser, searchUser, updateUser};
