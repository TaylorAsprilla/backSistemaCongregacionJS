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
exports.vacunaController = void 0;
const vacuna_model_1 = __importDefault(require("../models/vacuna.model"));
class VacunaController {
    listarVacunas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vacuna = yield vacuna_model_1.default.findAll();
            res.json({ ok: true, vacuna: vacuna, id: req.id });
        });
    }
    listarUnVacuna(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const vacuna = yield vacuna_model_1.default.findByPk(id);
            if (vacuna) {
                res.json({ ok: true, vacuna: vacuna, id: req.id });
            }
            else {
                res.status(404).json({
                    msg: `No existe la vacuna con el id ${id}`,
                });
            }
        });
    }
    crearVacuna(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = req;
            const { nombre } = req.body;
            try {
                const existeVacuna = yield vacuna_model_1.default.findOne({
                    where: { nombre: nombre },
                });
                if (existeVacuna) {
                    return res.status(400).json({
                        msg: 'Ya existe una Vacuna con el nombre: ' + nombre,
                    });
                }
                const vacuna = yield vacuna_model_1.default.build(body);
                // Guardar Vacuna
                yield vacuna.save();
                res.json({ o: true, msg: 'Vacuna creada ', vacuna: vacuna });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: 'Hable con el administrador',
                });
            }
        });
    }
    actualizarVacuna(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            const { nombre } = body, campos = __rest(body, ["nombre"]);
            try {
                const vacuna = yield vacuna_model_1.default.findByPk(id);
                if (!vacuna) {
                    return res.status(404).json({
                        msg: 'No existe una vacuna con el id ' + id,
                    });
                }
                const getNombre = yield vacuna.get().nombre;
                // Actualizaciones
                if (getNombre !== body.nombre) {
                    const existeNombre = yield vacuna_model_1.default.findOne({
                        where: {
                            nombre: body.nombre,
                        },
                    });
                    if (existeNombre) {
                        return res.status(400).json({
                            ok: false,
                            msg: 'Ya existe una Vacuna con ese nombre',
                        });
                    }
                }
                campos.nombre = nombre;
                const vacunaActualizada = yield vacuna.update(campos, { new: true });
                res.json({ msg: 'Vacuna Actualizado ', vacunaActualizada: vacunaActualizada });
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
    eliminarVacuna(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { body } = req;
            try {
                const vacuna = yield vacuna_model_1.default.findByPk(id);
                if (vacuna) {
                    const nombre = yield vacuna.get().nombre;
                    yield vacuna.update({ estado: false });
                    res.json({
                        ok: true,
                        msg: 'La Vacuna ' + nombre + 'Se eliminó ',
                        id: req.id,
                    });
                }
                if (!vacuna) {
                    return res.status(404).json({
                        msg: 'No existe una vacuna con el id ' + id,
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
exports.vacunaController = new VacunaController();
//# sourceMappingURL=vacuna.controller.js.map