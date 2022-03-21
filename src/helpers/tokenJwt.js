"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenJwt = void 0;
const jwt = require('jsonwebtoken');
class TokenJwt {
    generarJWT(id, usuario) {
        return new Promise((resolve, reject) => {
            const payload = {
                id,
                usuario,
            };
            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '24h',
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo genere el JWT');
                }
                else {
                    resolve(token);
                }
            });
        });
    }
}
exports.tokenJwt = new TokenJwt();
//# sourceMappingURL=tokenJwt.js.map