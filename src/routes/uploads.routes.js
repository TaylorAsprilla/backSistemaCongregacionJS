"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const uploads_controller_1 = require("../controllers/uploads.controller");
class UploadsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /*
         Rutas: /api/uploads
        */
        this.router.use((0, express_fileupload_1.default)());
        this.router.put('/:tipo/:id', uploads_controller_1.uploadsController.fileUpload);
        this.router.get('/:tipo/:foto', uploads_controller_1.uploadsController.mostrarFoto);
    }
}
const vacunasRoutes = new UploadsRoutes();
exports.default = vacunasRoutes.router;
//# sourceMappingURL=uploads.routes.js.map