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
exports.congregacionController = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const congregacion_model_1 = __importDefault(require("../models/congregacion.model"));
class CongregacionController {
    listarCongregaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const congregacion = yield congregacion_model_1.default.findAll({
                order: connection_1.default.col('nombre'),
            });
            res.json({ ok: true, congregacion: congregacion, id: req.id });
        });
    }
    listarUnaCongregacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const congregacion = yield congregacion_model_1.default.findByPk(id);
            if (congregacion) {
                res.json({ ok: true, congregacion: congregacion, id: req.id });
            }
            else {
                res.status(404).json({
                    msg: `No existe la Congregacion con el id ${id}`,
                });
            }
        });
    }
    crearCongregacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { nombre } = req.body;
            try {
                const existeCongregacion = yield congregacion_model_1.default.findOne({
                    where: { nombre: nombre },
                });
                if (existeCongregacion) {
                    return res.status(400).json({
                        msg: 'Ya existe una Congregacion con el nombre: ' + nombre,
                    });
                }
                const congregacion = yield congregacion_model_1.default.build(body);
                // Guardar Congregación
                yield congregacion.save();
                res.json({ ok: true, msg: 'Congregación creada ', congregacion: congregacion });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: 'Hable con el administrador',
                });
            }
        });
    }
    actualizarCongregacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            const { nombre } = body, campos = __rest(body, ["nombre"]);
            try {
                const congregacion = yield congregacion_model_1.default.findByPk(id);
                if (!congregacion) {
                    return res.status(404).json({
                        msg: 'No existe una Congregación con el id ' + id,
                    });
                }
                const getNombre = yield congregacion.get().nombre;
                // Actualizaciones
                if (getNombre !== body.nombre) {
                    const existeNombre = yield congregacion_model_1.default.findOne({
                        where: {
                            nombre: body.nombre,
                        },
                    });
                    if (existeNombre) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'Ya existe una Congregación con ese nombre',
                        });
                    }
                }
                campos.nombre = nombre;
                const congregacionActualizada = yield congregacion.update(campos, { new: true });
                res.json({ msg: 'Congregación Actualizada ', congregacionActualizada: congregacionActualizada });
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
    eliminarCongregacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const congregacion = yield congregacion_model_1.default.findByPk(id);
                if (congregacion) {
                    const nombre = yield congregacion.get().nombre;
                    yield congregacion.update({ estado: false });
                    res.json({
                        ok: true,
                        msg: 'La Congregación ' + nombre + 'Se eliminó ',
                        id: req.id,
                    });
                }
                if (!congregacion) {
                    return res.status(404).json({
                        msg: 'No existe una congregacgión con el id ' + id,
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
exports.congregacionController = new CongregacionController();
//# sourceMappingURL=congregacion.controller.js.map