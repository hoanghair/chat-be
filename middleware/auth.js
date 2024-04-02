import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, process.env.KEY_JWT, (err, decoded) => {
        if (err) {
            console.log({err})
            res.status(404).json({message: "You do not have permission to access"});
        } else {
            req.id = decoded.id;
            next();
        }
    });
};

export {authentication};
