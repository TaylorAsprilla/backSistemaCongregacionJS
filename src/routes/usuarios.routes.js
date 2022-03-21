"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_controller_1 = require("../controllers/usuarios.controller");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /*
         Rutas: /api/usuarios
        */
        this.router.get('/', validar_jwt_1.validarJWT.validarJWT, usuarios_controller_1.usuarioController.listarUsuarios);
        this.router.get('/todos', validar_jwt_1.validarJWT.validarJWT, usuarios_controller_1.usuarioController.listarTodosLosUsuarios);
        this.router.get('/:id', validar_jwt_1.validarJWT.validarJWT, usuarios_controller_1.usuarioController.listarUnUsuario);
        this.router.post('/', [
            (0, express_validator_1.check)('primer_nombre', 'El nombre es obligatorio ').not().isEmpty(),
            (0, express_validator_1.check)('primer_apellido', 'El apellido es obligatorio ').not().isEmpty(),
            (0, express_validator_1.check)('numero_documento', 'El Número del documento es obligatorio ').not().isEmpty(),
            validar_campos_1.validarCampos.validarCampos,
        ], usuarios_controller_1.usuarioController.crearUsuario);
        this.router.put('/:id', [
            (0, express_validator_1.check)('primer_nombre', 'El nombre es obligatorio ').not().isEmpty(),
            (0, express_validator_1.check)('primer_apellido', 'El apellido es obligatorio ').not().isEmpty(),
            (0, express_validator_1.check)('numero_documento', 'El Número del documento es obligatorio ').not().isEmpty(),
            validar_campos_1.validarCampos.validarCampos,
        ], usuarios_controller_1.usuarioController.actualizarUsuario);
        this.router.delete('/:id', validar_jwt_1.validarJWT.validarJWT, usuarios_controller_1.usuarioController.eliminarUsuario);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
//# sourceMappingURL=usuarios.routes.js.map