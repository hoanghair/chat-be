import connectionModal from "../models/connection.js";

const addConnection = async (uid, connection) => {
    await connectionModal.create({ uid, connection });
};

const removeConnection = async (uid) => {
    await connectionModal.findByIdAndDelete({ uid });
};
export { addConnection, removeConnection };
