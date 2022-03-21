"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ministerio_controllers_1 = require("../controllers/ministerio.controllers");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
class MinisteriosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /*
         Rutas: /api/ministerios
        */
        this.router.get('/', validar_jwt_1.validarJWT.validarJWT, ministerio_controllers_1.ministerioController.listarMinisterios);
        this.router.get('/:id', validar_jwt_1.validarJWT.validarJWT, ministerio_controllers_1.ministerioController.listarUnMinisterio);
        this.router.post('/', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(), validar_campos_1.validarCampos.validarCampos], ministerio_controllers_1.ministerioController.crearMinisterio);
        this.router.put('/:id', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(), validar_campos_1.validarCampos.validarCampos], ministerio_controllers_1.ministerioController.actualizarUsuario);
        this.router.delete('/:id', validar_jwt_1.validarJWT.validarJWT, ministerio_controllers_1.ministerioController.eliminarMinisterio);
    }
}
const ministeriosRoutes = new MinisteriosRoutes();
exports.default = ministeriosRoutes.router;
//# sourceMappingURL=ministerio.routes.js.map