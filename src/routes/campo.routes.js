"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const campo_controller_1 = require("../controllers/campo.controller");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
class CampoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /*
         Rutas: /api/campo
        */
        this.router.get('/', campo_controller_1.campoController.listarCampos);
        this.router.get('/:id', validar_jwt_1.validarJWT.validarJWT, campo_controller_1.campoController.listarUnCampo);
        this.router.post('/', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio').not().isEmpty(), validar_campos_1.validarCampos.validarCampos], campo_controller_1.campoController.crearCampo);
        this.router.put('/:id/', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(), validar_campos_1.validarCampos.validarCampos], campo_controller_1.campoController.actualizarCampo);
        this.router.delete('/:id', validar_jwt_1.validarJWT.validarJWT, campo_controller_1.campoController.eliminarCampo);
    }
}
const campoRoutes = new CampoRoutes();
exports.default = campoRoutes.router;
//# sourceMappingURL=campo.routes.js.map