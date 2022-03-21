"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const genero_controller_1 = require("../controllers/genero.controller");
class GeneroRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        /*
         Rutas: /api/genero
        */
        this.router.get('/', genero_controller_1.generoController.listarGenero);
    }
}
const generoRoutes = new GeneroRoutes();
exports.default = generoRoutes.router;
//# sourceMappingURL=genero.routes.js.map