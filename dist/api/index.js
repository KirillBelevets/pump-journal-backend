"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const vercel_bootstrap_1 = require("../src/vercel.bootstrap");
let server;
async function handler(req, res) {
    if (!server) {
        server = await (0, vercel_bootstrap_1.bootstrap)();
    }
    server(req, res);
}
//# sourceMappingURL=index.js.map