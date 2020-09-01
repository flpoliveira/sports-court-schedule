const jwt = require("jsonwebtoken");
const jwtKey = require("../config/authKey");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({error: "Token not provided!"});
        }
        const [, token] = authHeader.split(' ')

        if (!token) {
            return res.status(401).json({ error: 'Token malformatted' })
        }

        const decoded = await jwt.verify(token, jwtKey.secret);

        req.userId = decoded.userId;

        return next();

    } catch (err) {
        return res.status(401).json({ error: "Unathourized!"});
    }
};