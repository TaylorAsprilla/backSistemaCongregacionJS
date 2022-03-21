"use strict";
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
exports.tipoDocumentoController = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const tipo_documento_model_1 = __importDefault(require("../models/tipo-documento.model"));
class TipoDocumentoController {
    listarTipoDocumento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoDocumento = yield tipo_documento_model_1.default.findAll({
                order: connection_1.default.col('nombre'),
            });
            res.json({ ok: true, tipoDocumento: tipoDocumento });
        });
    }
    listarUnTipoDocumento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tipoDocumento = yield tipo_documento_model_1.default.findByPk(id);
            if (tipoDocumento) {
                res.json({ ok: true, tipoDocumento: tipoDocumento, id: req.id });
            }
            else {
                res.status(404).json({
                    msg: `No existe el Tipo de Documento con el id ${id}`,
                });
            }
        });
    }
    crearTipoDocumento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.body;
            try {
                const existeTipoDocumento = yield tipo_documento_model_1.default.findOne({
                    where: { nombre: nombre },
                });
                if (existeTipoDocumento) {
                    return res.status(400).json({
                        msg: 'Ya existe un Tipo de documento con el nombre: ' + nombre,
                    });
                }
                const tipoDocumento = yield tipo_documento_model_1.default.build(req.body);
                // Guardar Tipo de documento
                const tipoDocumentoCreado = yield tipoDocumento.save();
                res.json({
                    o: true,
                    msg: 'Tipo de Documento creado ',
                    tipoDocumento: tipoDocumentoCreado,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: 'Hable con el administrador',
                });
            }
        });
    }
    actualizarTipoDocumento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            const { nombre } = body, campos = __rest(body, ["nombre"]);
            try {
                const tipoDocumento = yield tipo_documento_model_1.default.findByPk(id);
                if (!tipoDocumento) {
                    return res.status(404).json({
                        msg: 'No existe un tipo de Documento con el id ' + id,
                    });
                }
                const getNombre = yield tipoDocumento.get().nombre;
                // Actualizaciones
                if (getNombre !== body.nombre) {
                    const existeNombre = yield tipo_documento_model_1.default.findOne({
                        where: {
                            nombre: body.nombre,
                        },
                    });
                    if (existeNombre) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'Ya existe un Tipo de documento con el nombre ' + nombre,
                        });
                    }
                }
                campos.nombre = nombre;
                // Se actualiza el campo
                const tipoDocumentoActualizado = yield tipoDocumento.update(campos, { new: true });
                res.json({ msg: 'Tipo de documento Actualizado ', tipoDocumentoActualizado: tipoDocumentoActualizado });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador',
                });
            }
        });
    }
    eliminarTipoDocumento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const tipoDocumento = yield tipo_documento_model_1.default.findByPk(id);
                if (tipoDocumento) {
                    const nombre = yield tipoDocumento.get().nombre;
                    yield tipoDocumento.update({ estado: false });
                    res.json({
                        ok: true,
                        msg: 'El tipo de documento ' + nombre + ' se eliminó ',
                        id: req.id,
                    });
                }
                if (!tipoDocumento) {
                    return res.status(404).json({
                        msg: 'No existe un tipo de documento con el id ' + id,
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
exports.tipoDocumentoController = new TipoDocumentoController();
//# sourceMappingURL=tipo-documento.controller.js.map