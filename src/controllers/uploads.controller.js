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
exports.uploadsController = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const actualizar_imagen_1 = require("../helpers/actualizar-imagen");
const { v4: uuidv4 } = require('uuid');
class UploadsController {
    fileUpload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipo = req.params.tipo;
            const id = req.params.id;
            // Validar tipo
            const tiposValidos = ['usuarios', 'ministerios', 'carnets'];
            if (!tiposValidos.includes(tipo)) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No es un usuario',
                });
            }
            // Validar que exista un archivo
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hay ningún archivo',
                });
            }
            // Procesar la imagen
            const file = req.files.imagen;
            const nombreCortado = file.name.split('.');
            const extensionArchivo = nombreCortado[nombreCortado.length - 1];
            // Validar extension
            const extensionesValidas = ['png', 'jpg', 'jpeg', 'pdf', 'PDF', 'PNG', 'JPEG', 'JPG'];
            if (!extensionesValidas.includes(extensionArchivo)) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No es una extensión permitida',
                });
            }
            // Generar el nombre del archivo
            const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;
            // Path para guardar la imagen
            const path = `./uploads/${tipo}/${nombreArchivo}`;
            // Mover la imagen
            file.mv(path, (err) => {
                console.log('imagen-----', path);
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error al mover la imagen',
                    });
                }
                // Actualizar base de datos
                actualizar_imagen_1.actualizarImagen.actualizarImagen(id, tipo, nombreArchivo);
                return res.json({ ok: true, msg: 'Archivo subido', nombreArchivo: nombreArchivo, path });
            });
        });
    }
    mostrarFoto(req, res) {
        const tipo = req.params.tipo;
        const foto = req.params.foto;
        const pathImg = path_1.default.join(__dirname, `../../../uploads/${tipo}/${foto}`);
        if (fs_1.default.existsSync(pathImg)) {
            res.sendFile(pathImg);
        }
        else {
            const pathImg = path_1.default.join(__dirname, `../../../uploads/no-image.jpg`);
            res.sendFile(pathImg);
        }
    }
}
exports.uploadsController = new UploadsController();
//# sourceMappingURL=uploads.controller.js.map