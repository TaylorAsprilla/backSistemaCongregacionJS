"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const Vacuna = connection_1.default.define('vacuna', {
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
});
exports.default = Vacuna;
//# sourceMappingURL=vacuna.model.js.map