"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const time_management_module_1 = require("./src/time-management/time-management.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(time_management_module_1.TimeManagementModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: false,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Time Management API')
        .setDescription('API documentation for Time Management subsystem - Phase 1: Shift Setup & Scheduling')
        .setVersion('1.0')
        .addTag('shifts', 'Shift template management')
        .addTag('assignments', 'Schedule assignment operations')
        .addTag('notifications', 'Shift expiry notifications')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map