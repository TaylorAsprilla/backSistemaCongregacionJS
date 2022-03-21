"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const congregacion_controller_1 = require("../controllers/congregacion.controller");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
class CongregacionRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /*
         Rutas: /api/congregacion
        */
        this.router.get('/', congregacion_controller_1.congregacionController.listarCongregaciones);
        this.router.get('/:id', validar_jwt_1.validarJWT.validarJWT, congregacion_controller_1.congregacionController.listarUnaCongregacion);
        this.router.post('/', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(), validar_campos_1.validarCampos.validarCampos], congregacion_controller_1.congregacionController.crearCongregacion);
        this.router.put('/:id', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(), validar_campos_1.validarCampos.validarCampos], congregacion_controller_1.congregacionController.actualizarCongregacion);
        this.router.delete('/:id', validar_jwt_1.validarJWT.validarJWT, congregacion_controller_1.congregacionController.eliminarCongregacion);
    }
}
const congregacionRoutes = new CongregacionRoutes();
exports.default = congregacionRoutes.router;
//# sourceMappingURL=congregacion.routes.js.map