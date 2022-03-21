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
exports.campoController = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const campo_model_1 = __importDefault(require("../models/campo.model"));
class CampoController {
    listarCampos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const campo = yield campo_model_1.default.findAll({
                order: connection_1.default.col('nombre'),
            });
            res.json({ ok: true, campo: campo, id: req.id });
        });
    }
    listarUnCampo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const campo = yield campo_model_1.default.findByPk(id);
            if (campo) {
                res.json({ ok: true, campo: campo, id: req.id });
            }
            else {
                res.status(404).json({
                    msg: `No existe el Campo con el id ${id}`,
                });
            }
        });
    }
    crearCampo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, idCongregacion } = req.body;
            try {
                const existeCampo = yield campo_model_1.default.findOne({
                    where: { nombre: nombre },
                });
                if (existeCampo) {
                    return res.status(400).json({
                        msg: 'Ya existe un Campo con el nombre: ' + nombre,
                    });
                }
                const campo = yield campo_model_1.default.build(req.body);
                // Guardar Campo
                const campoCreado = yield campo.save();
                res.json({ ok: true, msg: 'Campo creado ', campo: campoCreado });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: 'Hable con el administrador',
                });
            }
        });
    }
    actualizarCampo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            const { nombre, idCongregacion } = body, campos = __rest(body, ["nombre", "idCongregacion"]);
            try {
                const campo = yield campo_model_1.default.findByPk(id);
                if (!campo) {
                    return res.status(404).json({
                        msg: 'No existe una Congregación con el id ' + id,
                    });
                }
                const getNombre = yield campo.get().nombre;
                // Actualizaciones
                if (getNombre !== body.nombre) {
                    const existeNombre = yield campo_model_1.default.findOne({
                        where: {
                            nombre: body.nombre,
                        },
                    });
                    if (existeNombre) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'Ya existe un Campo con ese nombre',
                        });
                    }
                }
                campos.nombre = nombre;
                campos.id_congregacion = idCongregacion;
                // Se actualiza el campo
                const campoActualizado = yield campo.update(campos, { new: true });
                res.json({ msg: 'Campo Actualizado ', campoActualizado: campoActualizado });
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
    eliminarCampo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const campo = yield campo_model_1.default.findByPk(id);
                if (campo) {
                    const nombre = yield campo.get().nombre;
                    yield campo.update({ estado: false });
                    res.json({
                        ok: true,
                        msg: 'El campo ' + nombre + ' se eliminó ',
                        id: req.id,
                    });
                }
                if (!campo) {
                    return res.status(404).json({
                        msg: 'No existe un campo con el id ' + id,
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
exports.campoController = new CampoController();
//# sourceMappingURL=campo.controller.js.map