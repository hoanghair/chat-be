import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, require: true,
    }, email: {
        type: String, unique: true, require: true,
    }, password: {
        type: String, require: true,
    }, online: {
        type: Boolean, default: true,
    }, phone: String, about: String, avatar: String, socketId: {
        type: String
    }
});
export default mongoose.model("user", userSchema);
