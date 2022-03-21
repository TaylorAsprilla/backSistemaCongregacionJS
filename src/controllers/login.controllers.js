"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const tokenJwt_1 = require("../helpers/tokenJwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, password } = req.body;
    try {
        // Verificar Usuario
        const loginUsuario = yield usuario_model_1.default.findOne({
            where: {
                login: login,
            },
        });
        if (!loginUsuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no válido',
            });
        }
        // Verificar contraseña
        const validarPassword = bcrypt.compareSync(password, loginUsuario.getDataValue('password'));
        if (!validarPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no válida',
            });
        }
        // Generar Token - JWT
        const token = yield tokenJwt_1.tokenJwt.generarJWT(loginUsuario.getDataValue('id'), loginUsuario.getDataValue('login'));
        res.json({
            ok: true,
            token: token,
            usuario: loginUsuario,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
            error: error,
        });
    }
});
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUsaurio = req.id;
    const { body } = req;
    const usuario = yield usuario_model_1.default.build(body);
    // Generar el TOKEN - JWT
    const token = yield tokenJwt_1.tokenJwt.generarJWT(idUsaurio, usuario.getDataValue('login'));
    // Obtener el usuario por UID
    const usuarioID = yield usuario_model_1.default.findByPk(idUsaurio);
    res.json({
        ok: true,
        token,
        usuario: usuarioID,
    });
});
module.exports = {
    login,
    renewToken,
};
//# sourceMappingURL=login.controllers.js.map