"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const busquedas_controller_1 = require("../controllers/busquedas.controller");
const { login, renewToken } = require('../controllers/login.controllers');
const validar_jwt_1 = require("../middlewares/validar-jwt");
/*
  Path: 'api/busqueda'
*/
class BusquedasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/usuarios/:busqueda', busquedas_controller_1.busquedaController.busquedaUsuarios);
        this.router.get('/ministerios/:busqueda', validar_jwt_1.validarJWT.validarJWT, busquedas_controller_1.busquedaController.busquedaMinisterios);
        this.router.get('/:busqueda', validar_jwt_1.validarJWT.validarJWT, busquedas_controller_1.busquedaController.getTodo);
    }
}
const busqeudasRoutes = new BusquedasRoutes();
exports.default = busqeudasRoutes.router;
//# sourceMappingURL=busquedas.routes.js.map