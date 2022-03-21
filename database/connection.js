"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// import { database } from '../config';
//database wide options
var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true,
    },
};
const db = new sequelize_1.Sequelize('heroku_cc1549a33ee30b2', 'b0a3ba28d4b4aa', '205c19f6', {
    host: 'us-cdbr-east-05.cleardb.net',
    dialect: 'mysql',
    // logging: false,
  });
exports.default = db;
//# sourceMappingURL=connection.js.map