"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const permiso_controller_1 = require("../controllers/permiso.controller");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
class PermisosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /*
         Rutas: /api/permisos
        */
        this.router.get('/', validar_jwt_1.validarJWT.validarJWT, permiso_controller_1.permisoController.listarPermisos);
        this.router.get('/:id', validar_jwt_1.validarJWT.validarJWT, permiso_controller_1.permisoController.listarUnPermiso);
        this.router.post('/', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(), validar_campos_1.validarCampos.validarCampos], permiso_controller_1.permisoController.crearPermiso);
        this.router.put('/:id', [(0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(), validar_campos_1.validarCampos.validarCampos], permiso_controller_1.permisoController.actualizarPermiso);
        this.router.delete('/:id', validar_jwt_1.validarJWT.validarJWT, permiso_controller_1.permisoController.eliminarPermiso);
    }
}
const permisosRoutes = new PermisosRoutes();
exports.default = permisosRoutes.router;
//# sourceMappingURL=permiso.routes.js.map