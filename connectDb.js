import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.URL_DB, {useNewUrlParser: true});
        console.log("Connected to database successfully");
    } catch (error) {
        console.log(error.message);
    }
};

export default connectDb;
