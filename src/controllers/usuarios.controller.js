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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const sequelize_1 = require("sequelize");
const bcrypt = __importStar(require("bcryptjs"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const tokenJwt_1 = require("../helpers/tokenJwt");
const connection_1 = __importDefault(require("../../database/connection"));
class UsuarioController {
    listarUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const desde = Number(req.query.desde) || 0;
            const [usuarios, totalUsuarios] = yield Promise.all([
                usuario_model_1.default.findAll({ offset: desde, limit: 5, order: connection_1.default.col('primer_nombre') }),
                usuario_model_1.default.count(),
            ]);
            res.json({ ok: true, usuarios: usuarios, totalUsuarios: totalUsuarios, id: req.id });
        });
    }
    listarTodosLosUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const desde = Number(req.query.desde) || 0;
            const [usuarios, totalUsuarios] = yield Promise.all([usuario_model_1.default.findAll(), usuario_model_1.default.count()]);
            res.json({ ok: true, usuarios: usuarios, totalUsuarios: totalUsuarios, id: req.id });
        });
    }
    listarUnUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield usuario_model_1.default.findByPk(id);
            if (usuario) {
                res.json({ ok: true, usuario, id: req.id });
            }
            else {
                res.status(404).json({
                    msg: `No existe el usuario con el id ${id}`,
                });
            }
        });
    }
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { password, numero_documento } = req.body;
            try {
                const existeUsuario = yield usuario_model_1.default.findOne({
                    where: {
                        [sequelize_1.Op.or]: [{ numero_documento: numero_documento }],
                    },
                });
                if (existeUsuario) {
                    return res.status(400).json({
                        msg: 'Ya existe un usuario con este número de documento: ' + numero_documento,
                    });
                }
                // Encriptar contraseña
                if (password) {
                    const salt = bcrypt.genSaltSync();
                    body.password = bcrypt.hashSync(password, salt);
                }
                const usuario = yield usuario_model_1.default.build(body);
                // Guardar Usuario
                yield usuario.save();
                // Generar Token - JWT
                const token = yield tokenJwt_1.tokenJwt.generarJWT(usuario.getDataValue('id'), usuario.getDataValue('login'));
                res.json({ ok: true, msg: 'Usuario creado ', usuario, token });
            }
            catch (error) {
                console.log('Error', error);
                res.status(500).json({
                    msg: 'Hable con el administrador',
                    error,
                });
            }
        });
    }
    actualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            const { password, numero_documento, imagen } = body, campos = __rest(body, ["password", "numero_documento", "imagen"]);
            try {
                const usuario = yield usuario_model_1.default.findByPk(id);
                if (!usuario) {
                    return res.status(404).json({
                        msg: 'No existe un usuario con el id ' + id,
                    });
                }
                const getNumeroDocumento = yield usuario.get().numero_documento;
                // Actualizaciones
                if (getNumeroDocumento !== numero_documento) {
                    const existeNumeroDocumento = yield usuario_model_1.default.findOne({
                        where: {
                            numero_documento: numero_documento,
                        },
                    });
                    if (existeNumeroDocumento) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'Ya existe un usuario con este Número de Documento',
                        });
                    }
                }
                // Encriptar contraseña
                if (password) {
                    const salt = bcrypt.genSaltSync();
                    campos.password = yield bcrypt.hashSync(password, salt);
                }
                campos.numero_documento = yield numero_documento;
                const usuarioActualizado = yield usuario.update(campos, { new: true });
                res.json({ msg: 'Usuario Actualizado ', usuarioActualizado });
            }
            catch (error) {
                res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador',
                    error: error,
                });
            }
        });
    }
    eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const usuario = yield usuario_model_1.default.findByPk(id);
                if (usuario) {
                    const nombre = yield usuario.get().primer_nombre;
                    const apellido = yield usuario.get().primer_apellido;
                    const numeroDocumento = yield usuario.get().numero_documento;
                    yield usuario.update({ estado: false });
                    res.json({
                        ok: true,
                        msg: 'El usuario ' + nombre + ' ' + apellido + ' con número de documento ' + numeroDocumento + 'Se eliminó ',
                        id: req.id,
                    });
                }
                if (!usuario) {
                    return res.status(404).json({
                        msg: 'No existe un usuario con el id ' + id,
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: 'Hable con el administrador',
                });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
//# sourceMappingURL=usuarios.controller.js.map