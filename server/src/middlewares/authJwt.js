const jwt = require("jsonwebtoken");
const jwtKey = require("../config/authKey");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({error: "Token not provided!"});
        }
        const decoded = await jwt.verify(authHeader, jwtKey.secret);

        req.userId = decoded.userId;

        return next();

    } catch (err) {
        return res.status(401).json({ error: "Unathourized!"});
    }
};