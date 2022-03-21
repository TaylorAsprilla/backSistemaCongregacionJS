"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const Ministerio = connection_1.default.define('ministerio', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descripcion: {
        type: sequelize_1.DataTypes.STRING,
    },
    logo: {
        type: sequelize_1.DataTypes.STRING,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: 1,
    },
}, {
    freezeTableName: true,
});
exports.default = Ministerio;
//# sourceMappingURL=ministerio.model.js.map