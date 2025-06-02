"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const vercel_bootstrap_1 = require("../src/vercel.bootstrap");
const serverPromise = (0, vercel_bootstrap_1.bootstrap)();
async function handler(req, res) {
    const app = await serverPromise;
    app(req, res);
}
//# sourceMappingURL=index.js.map