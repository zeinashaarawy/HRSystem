"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => ({
    uri: process.env.MONGODB_URI,
    dbName: process.env.DATABASE_NAME,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
    },
}));
//# sourceMappingURL=database.config.js.map