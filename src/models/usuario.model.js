"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const Usuario = connection_1.default.define('usuario', {
    primer_nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    segundo_nombre: {
        type: sequelize_1.DataTypes.STRING,
    },
    primer_apellido: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    segundo_apellido: {
        type: sequelize_1.DataTypes.STRING,
    },
    numero_documento: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    celular: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha_nacimiento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: 1,
    },
    documentoTutor: {
        type: sequelize_1.DataTypes.STRING,
    },
    id_congregacion: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_tipoDocumento: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_genero: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    id_vacuna: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
    imagen: {
        type: sequelize_1.DataTypes.STRING,
    },
    carnet: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    freezeTableName: true,
});
exports.default = Usuario;
//# sourceMappingURL=usuario.model.js.map