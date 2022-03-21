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
exports.permisoController = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const permiso_model_1 = __importDefault(require("../models/permiso.model"));
class PermisoController {
    listarPermisos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const permiso = yield permiso_model_1.default.findAll({
                order: connection_1.default.col('nombre'),
            });
            res.json({ ok: true, permiso: permiso, id: req.id });
        });
    }
    listarUnPermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const permiso = yield permiso_model_1.default.findByPk(id);
            if (permiso) {
                res.json({ ok: true, permiso: permiso, id: req.id });
            }
            else {
                res.status(404).json({
                    msg: `No existe el permiso con el id ${id}`,
                });
            }
        });
    }
    crearPermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { nombre } = req.body;
            try {
                const existePermiso = yield permiso_model_1.default.findOne({
                    where: { nombre: nombre },
                });
                if (existePermiso) {
                    return res.status(400).json({
                        msg: 'Ya existe el Permiso con el nombre: ' + nombre,
                    });
                }
                const permiso = yield permiso_model_1.default.build(body);
                // Guardar Permiso
                yield permiso.save();
                res.json({ o: true, msg: 'Permiso creado ', permiso: permiso });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: 'Hable con el administrador',
                });
            }
        });
    }
    actualizarPermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            const { nombre } = body, campos = __rest(body, ["nombre"]);
            try {
                const permiso = yield permiso_model_1.default.findByPk(id);
                if (!permiso) {
                    return res.status(404).json({
                        msg: 'No existe el permiso con el id ' + id,
                    });
                }
                const getNombre = yield permiso.get().nombre;
                // Actualizaciones
                if (getNombre !== body.nombre) {
                    const existeNombre = yield permiso_model_1.default.findOne({
                        where: {
                            nombre: body.nombre,
                        },
                    });
                    if (existeNombre) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'Ya existe el Permiso con ese nombre',
                        });
                    }
                }
                campos.nombre = nombre;
                const permisoActualizado = yield permiso.update(campos, { new: true });
                res.json({ msg: 'Permiso Actualizado ', permisoActualizado: permisoActualizado });
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
    eliminarPermiso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const permiso = yield permiso_model_1.default.findByPk(id);
                if (permiso) {
                    const nombre = yield permiso.get().nombre;
                    yield permiso.update({ estado: false });
                    res.json({
                        ok: true,
                        msg: 'El permiso ' + nombre + 'Se eliminó ',
                        id: req.id,
                    });
                }
                if (!permiso) {
                    return res.status(404).json({
                        msg: 'No existe el permiso con el id ' + id,
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
exports.permisoController = new PermisoController();
//# sourceMappingURL=permiso.controller.js.map