"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const { login, renewToken } = require('../controllers/login.controllers');
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
/*
  Path: 'api/login'
*/
class LoginRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/', [
            (0, express_validator_1.check)('login', 'El nombre de usuario es obligatorio').not().isEmpty(),
            (0, express_validator_1.check)('password', 'El password es obligatorio').not().isEmpty(),
            validar_campos_1.validarCampos.validarCampos,
        ], login);
        this.router.get('/renew', validar_jwt_1.validarJWT.validarJWT, renewToken);
    }
}
const loginRoutes = new LoginRoutes();
exports.default = loginRoutes.router;
//# sourceMappingURL=login.routes.js.map