"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCampos = void 0;
const { validationResult } = require('express-validator');
class ValidarCampos {
    validarCampos(req, res, next) {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({
                ok: false,
                errors: errores.mapped(),
            });
        }
        next();
    }
}
exports.validarCampos = new ValidarCampos();
//# sourceMappingURL=validar-campos.js.map