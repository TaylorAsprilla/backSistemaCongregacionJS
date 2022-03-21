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
exports.actualizarImagen = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const fs_1 = __importDefault(require("fs"));
const ministerio_model_1 = __importDefault(require("../models/ministerio.model"));
const jwt = require('jsonwebtoken');
class ActualizarImagen {
    actualizarImagen(id, tipo, nombreArchivo) {
        return __awaiter(this, void 0, void 0, function* () {
            let pathViejo = '';
            const idImagen = String(id);
            console.log(id);
            switch (tipo) {
                case 'usuarios':
                    const usuario = yield usuario_model_1.default.findOne({ where: { id: idImagen } });
                    if (!usuario) {
                        return false;
                    }
                    pathViejo = `./uploads/usuarios/${usuario.getDataValue('imagen')}`;
                    this.borrarImagen(pathViejo);
                    yield usuario.update({ imagen: nombreArchivo }, {
                        where: {
                            id: id,
                        },
                    });
                    return true;
                    break;
                case 'ministerios':
                    const ministerio = yield ministerio_model_1.default.findOne({ where: { id: idImagen } });
                    if (!ministerio) {
                        return false;
                    }
                    pathViejo = `./uploads/ministerios/${ministerio.getDataValue('imagen')}`;
                    this.borrarImagen(pathViejo);
                    yield ministerio.update({ logo: nombreArchivo }, {
                        where: {
                            id: idImagen,
                        },
                    });
                    return true;
                    break;
                case 'carnets':
                    const carnet = yield usuario_model_1.default.findOne({ where: { id: idImagen } });
                    if (!carnet) {
                        return false;
                    }
                    pathViejo = `./uploads/carnets/${carnet.getDataValue('imagen')}`;
                    this.borrarImagen(pathViejo);
                    yield carnet.update({ carnet: nombreArchivo }, {
                        where: {
                            id: idImagen,
                        },
                    });
                    return true;
                    break;
            }
        });
    }
    borrarImagen(path) {
        if (fs_1.default.existsSync(path)) {
            // Borrar la imagen anterior
            fs_1.default.unlinkSync(path);
        }
    }
}
exports.actualizarImagen = new ActualizarImagen();
//# sourceMappingURL=actualizar-imagen.js.map