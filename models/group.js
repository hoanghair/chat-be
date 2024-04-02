import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    creator: {
        type: String, ref: "user",
    }, receiver: {
        type: String, ref: "user",
    },
});

export default mongoose.model("group", groupSchema);
