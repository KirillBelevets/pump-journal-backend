"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'https://pump-journal-frontend.vercel.app',
            'http://localhost:3001',
        ],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.init();
    return app.getHttpAdapter().getInstance();
}
//# sourceMappingURL=vercel.bootstrap.js.map