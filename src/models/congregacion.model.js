"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const Congregacion = connection_1.default.define('congregacion', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: 1,
    },
}, {
    freezeTableName: true,
});
exports.default = Congregacion;
//# sourceMappingURL=congregacion.model.js.map