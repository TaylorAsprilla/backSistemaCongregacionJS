"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jwt = require('jsonwebtoken');
class ValidarJWT {
    validarJWT(req, res, next) {
        const token = req.header('x-token');
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: ' No hay token en la petición',
            });
        }
        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET);
            req.id = id;
            next();
        }
        catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido',
            });
        }
    }
}
exports.validarJWT = new ValidarJWT();
//# sourceMappingURL=validar-jwt.js.map