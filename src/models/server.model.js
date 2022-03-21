"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../../database/connection"));
const usuarios_routes_1 = __importDefault(require("../routes/usuarios.routes"));
const login_routes_1 = __importDefault(require("../routes/login.routes"));
const ministerio_routes_1 = __importDefault(require("../routes/ministerio.routes"));
const vacuna_routes_1 = __importDefault(require("../routes/vacuna.routes"));
const permiso_routes_1 = __importDefault(require("../routes/permiso.routes"));
const uploads_routes_1 = __importDefault(require("../routes/uploads.routes"));
const busquedas_routes_1 = __importDefault(require("../routes/busquedas.routes"));
const congregacion_routes_1 = __importDefault(require("../routes/congregacion.routes"));
const campo_routes_1 = __importDefault(require("../routes/campo.routes"));
const path_1 = __importDefault(require("path"));
const tipo_documento_routes_1 = __importDefault(require("../routes/tipo-documento.routes"));
const genero_routes_1 = __importDefault(require("../routes/genero.routes"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            login: '/api/login',
            ministerios: '/api/ministerios',
            vacunas: '/api/vacunas',
            permisos: '/api/permisos',
            uploads: '/api/uploads',
            busquedas: '/api/busquedas',
            congregacion: '/api/congregacion',
            campo: '/api/campo',
            tipoDocumento: '/api/tipodocumento',
            genero: '/api/genero',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        // Métodos Iniciales
        this.dbConenection();
        this.middlewares();
        // Definir las rutas
        this.routes();
    }
    // Conectar base de datos
    dbConenection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos online');
            }
            catch (error) {
                throw console.log(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // this.app.use(express.urlencoded({ extended: false }));
        // Carpeta pública
        this.app.use(express_1.default.static('./public'));
    }
    // Rutas
    routes() {
        // this.app.use('/', indexRoutes);
        this.app.use(this.apiPaths.usuarios, usuarios_routes_1.default);
        this.app.use(this.apiPaths.login, login_routes_1.default);
        this.app.use(this.apiPaths.ministerios, ministerio_routes_1.default);
        this.app.use(this.apiPaths.vacunas, vacuna_routes_1.default);
        this.app.use(this.apiPaths.permisos, permiso_routes_1.default);
        this.app.use(this.apiPaths.uploads, uploads_routes_1.default);
        this.app.use(this.apiPaths.busquedas, busquedas_routes_1.default);
        this.app.use(this.apiPaths.congregacion, congregacion_routes_1.default);
        this.app.use(this.apiPaths.campo, campo_routes_1.default);
        this.app.use(this.apiPaths.tipoDocumento, tipo_documento_routes_1.default);
        this.app.use(this.apiPaths.genero, genero_routes_1.default);
        this.app.get('*', (req, res) => {
            res.sendFile(path_1.default.resolve(__dirname, '../public/index.html'));
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.model.js.map