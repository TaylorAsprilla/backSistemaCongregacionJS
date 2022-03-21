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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.busquedaController = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../database/connection"));
const campo_model_1 = __importDefault(require("../models/campo.model"));
const congregacion_model_1 = __importDefault(require("../models/congregacion.model"));
const ministerio_model_1 = __importDefault(require("../models/ministerio.model"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
class BusquedasController {
    busquedaUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const busqueda = req.params.busqueda;
            const resultadoUsuario = yield usuario_model_1.default.findAll({
                where: {
                    numero_documento: busqueda,
                },
            });
            res.json({ ok: true, busqueda: resultadoUsuario });
        });
    }
    busquedaMinisterios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const busqueda = req.params.busqueda;
            const resultadoMinisterio = yield ministerio_model_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [{ nombre: { [sequelize_1.Op.substring]: busqueda } }],
                },
                order: connection_1.default.col('nombre'),
            });
            res.json({ ok: true, busqueda: resultadoMinisterio });
        });
    }
    getTodo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const busqueda = req.params.busqueda;
            const [usuarios, congregaciones, campos, ministerios] = yield Promise.all([
                usuario_model_1.default.findAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            { primer_nombre: { [sequelize_1.Op.substring]: busqueda } },
                            { segundo_nombre: { [sequelize_1.Op.substring]: busqueda } },
                            { primer_apellido: { [sequelize_1.Op.substring]: busqueda } },
                            { segundo_apellido: { [sequelize_1.Op.substring]: busqueda } },
                            { numero_documento: { [sequelize_1.Op.substring]: busqueda } },
                            { email: { [sequelize_1.Op.substring]: busqueda } },
                            { celular: { [sequelize_1.Op.substring]: busqueda } },
                            { fecha_nacimiento: { [sequelize_1.Op.substring]: busqueda } },
                        ],
                    },
                    order: connection_1.default.col('primer_nombre'),
                }),
                congregacion_model_1.default.findAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            { nombre: { [sequelize_1.Op.substring]: busqueda } },
                            { direccion: { [sequelize_1.Op.substring]: busqueda } },
                            { telefono: { [sequelize_1.Op.substring]: busqueda } },
                        ],
                    },
                    order: connection_1.default.col('nombre'),
                }),
                campo_model_1.default.findAll({
                    where: {
                        [sequelize_1.Op.or]: [
                            { nombre: { [sequelize_1.Op.substring]: busqueda } },
                            { direccion: { [sequelize_1.Op.substring]: busqueda } },
                            { telefono: { [sequelize_1.Op.substring]: busqueda } },
                        ],
                    },
                    order: connection_1.default.col('nombre'),
                }),
                ministerio_model_1.default.findAll({
                    where: { [sequelize_1.Op.or]: [{ nombre: { [sequelize_1.Op.substring]: busqueda } }, { descripcion: { [sequelize_1.Op.substring]: busqueda } }] },
                    order: connection_1.default.col('nombre'),
                }),
            ]);
            res.json({
                ok: true,
                usuarios,
                congregaciones,
                campos,
                ministerios,
            });
        });
    }
}
exports.busquedaController = new BusquedasController();
//# sourceMappingURL=busquedas.controller.js.map