import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: String, group: {
        type: String, ref: "group",
    }, uSend: {
        type: String, ref: "user",
    }, type: {
        type: String, default: "message",
    }, isDelete: {
        type: Boolean, default: false,
    },
}, {timestamps: true});

export default mongoose.model("message", messageSchema);
