import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
    uid: {
        type: String, ref: "user",
    }, connection: String,
});

export default mongoose.model("connection", connectionSchema);
