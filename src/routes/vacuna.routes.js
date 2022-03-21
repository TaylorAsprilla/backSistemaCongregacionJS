"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const vacuna_controller_1 = require("../controllers/vacuna.controller");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
class VacunasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /*
         Rutas: /api/vacunas
        */
        this.router.get('/', vacuna_controller_1.vacunaController.listarVacunas);
        this.router.get('/:id', validar_jwt_1.validarJWT.validarJWT, vacuna_controller_1.vacunaController.listarUnVacuna);
        this.router.post('/', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(), validar_campos_1.validarCampos.validarCampos], vacuna_controller_1.vacunaController.crearVacuna);
        this.router.put('/:id', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(), validar_campos_1.validarCampos.validarCampos], vacuna_controller_1.vacunaController.actualizarVacuna);
        this.router.delete('/:id', validar_jwt_1.validarJWT.validarJWT, vacuna_controller_1.vacunaController.eliminarVacuna);
    }
}
const vacunasRoutes = new VacunasRoutes();
exports.default = vacunasRoutes.router;
//# sourceMappingURL=vacuna.routes.js.map