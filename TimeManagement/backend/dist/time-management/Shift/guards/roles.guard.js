"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const roles_decorator_1 = require("../decorators/roles.decorator");
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userRole = request.headers['x-user-role'] ||
            request.headers['X-User-Role'] ||
            request.headers['X-USER-ROLE'] ||
            user?.role;
        if (!userRole) {
            return true;
        }
        const normalizeRole = (role) => {
            if (!role)
                return '';
            return role.toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
        };
        const normalizedUserRole = normalizeRole(userRole);
        const normalizedRequiredRoles = requiredRoles.map(normalizeRole);
        console.log('[RolesGuard] Role check:', {
            endpoint: `${request.method} ${request.url}`,
            userRole,
            normalizedUserRole,
            requiredRoles,
            normalizedRequiredRoles,
            hasAccess: normalizedRequiredRoles.includes(normalizedUserRole),
            headers: {
                'x-user-role': request.headers['x-user-role'],
                'X-User-Role': request.headers['X-User-Role'],
                'X-USER-ROLE': request.headers['X-USER-ROLE'],
            },
        });
        const hasAccess = normalizedRequiredRoles.includes(normalizedUserRole);
        if (!hasAccess) {
            console.warn('[RolesGuard] Access denied:', {
                endpoint: `${request.method} ${request.url}`,
                userRole,
                normalizedUserRole,
                requiredRoles,
                normalizedRequiredRoles,
                headers: {
                    'x-user-role': request.headers['x-user-role'],
                    'x-user-id': request.headers['x-user-id'],
                },
            });
            throw new common_1.ForbiddenException(`Access denied. Required roles: ${requiredRoles.join(', ')}. ` +
                `Your role: ${userRole || 'not provided'}. ` +
                `Please ensure you have the correct permissions or contact your administrator.`);
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map