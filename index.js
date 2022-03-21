"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_model_1 = __importDefault(require("./src/models/server.model"));
// Configurar dot.env
dotenv_1.default.config();
const server = new server_model_1.default();
server.listen();
//# sourceMappingURL=index.js.map