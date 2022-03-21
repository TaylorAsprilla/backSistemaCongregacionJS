"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const Campo = connection_1.default.define('campo', {
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
    id_congregacion: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    freezeTableName: true,
});
exports.default = Campo;
//# sourceMappingURL=campo.model.js.map