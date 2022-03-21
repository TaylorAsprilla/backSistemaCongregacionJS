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
exports.generoController = void 0;
const connection_1 = __importDefault(require("../../database/connection"));
const genero_model_1 = __importDefault(require("../models/genero.model"));
class GeneroController {
    listarGenero(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const genero = yield genero_model_1.default.findAll({
                order: connection_1.default.col('nombre'),
            });
            res.json({ ok: true, genero: genero });
        });
    }
}
exports.generoController = new GeneroController();
//# sourceMappingURL=genero.controller.js.map