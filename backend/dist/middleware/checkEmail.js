"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfEmailAlreadyExist = void 0;
const connexion_1 = require("../DB/connexion");
const constants_1 = require("../constants/constants");
const checkIfEmailAlreadyExist = (req, res, next) => {
    const sql = process.env.SQL_CHECK_EMAIL;
    const { email } = req.body;
    if (!email)
        return res.status(400).json({ message: constants_1.emailNotFound });
    connexion_1.database.query(sql, email, (err, rows) => {
        if (err)
            return res.status(500).json(err);
        if (rows.length > 0)
            return res.status(401).json({ message: constants_1.incorrectCredential });
        next();
    });
};
exports.checkIfEmailAlreadyExist = checkIfEmailAlreadyExist;
