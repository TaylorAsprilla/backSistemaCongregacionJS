"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const tipo_documento_controller_1 = require("../controllers/tipo-documento.controller");
const validar_campos_1 = require("../middlewares/validar-campos");
const validar_jwt_1 = require("../middlewares/validar-jwt");
class TipoDocumentoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /*
         Rutas: /api/tipodocumento
        */
        this.router.get('/', tipo_documento_controller_1.tipoDocumentoController.listarTipoDocumento);
        this.router.get('/:id', validar_jwt_1.validarJWT.validarJWT, tipo_documento_controller_1.tipoDocumentoController.listarUnTipoDocumento);
        this.router.post('/', [
            (0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(),
            validar_campos_1.validarCampos.validarCampos,
            validar_jwt_1.validarJWT.validarJWT,
        ], tipo_documento_controller_1.tipoDocumentoController.crearTipoDocumento);
        this.router.put('/:id', [
            (0, express_validator_1.check)('nombre', 'El nombre es obligatorio ').not().isEmpty(),
            validar_campos_1.validarCampos.validarCampos,
            validar_jwt_1.validarJWT.validarJWT,
        ], tipo_documento_controller_1.tipoDocumentoController.actualizarTipoDocumento);
        this.router.delete('/:id', validar_jwt_1.validarJWT.validarJWT, tipo_documento_controller_1.tipoDocumentoController.eliminarTipoDocumento);
    }
}
const congregacionRoutes = new TipoDocumentoRoutes();
exports.default = congregacionRoutes.router;
//# sourceMappingURL=tipo-documento.routes.js.map