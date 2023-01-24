"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.update = exports.getUser = exports.create = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("../models/user"));
const user_type_1 = require("../types/user.type");
const authToken_1 = __importDefault(require("../utilities/authToken"));
const User = new user_1.default();
dotenv_1.default.config();
const create = async (req, res) => {
    try {
        const { error } = user_type_1.userSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const { ...newUserData } = req.body;
        const password = req.body.password;
        const salt = await bcrypt_1.default.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        newUserData.password = hashedPassword;
        const newUser = await User.create({ ...newUserData });
        const token = await (0, authToken_1.default)(newUser.id);
        return res
            .status(201)
            .json({ message: 'New user created successfully!', data: newUser, token: token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.create = create;
const getUser = async (req, res) => {
    try {
        const user = await User.getUser(req.user._id);
        return res.status(200).json({ data: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getUser = getUser;
const update = async (req, res) => {
    try {
        let updatedUser = {};
        if ('password' in req.body) {
            const { ...newUserData } = req.body;
            const password = req.body.password;
            const salt = await bcrypt_1.default.genSalt(Number(process.env.SALT));
            const hashedPassword = await bcrypt_1.default.hash(password, salt);
            newUserData.password = hashedPassword;
            updatedUser = await User.update({
                ...newUserData,
                id: req.user._id,
            });
        }
        else {
            const { ...newUserData } = req.body;
            updatedUser = await User.update({ ...newUserData, id: req.user._id });
        }
        return res
            .status(201)
            .json({ message: 'This user has been updated successfully!', data: updatedUser });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.update = update;
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.delete(req.user._id);
        return res
            .status(201)
            .json({ message: 'This user has been deleted successfully!', data: deletedUser });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteUser = deleteUser;
