"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsValidOfferConstraint = exports.IsValidAssessmentScoreConstraint = exports.HasInterviewPanelConstraint = exports.HasConsentConstraint = exports.IsValidJobRequisitionConstraint = void 0;
exports.IsValidJobRequisition = IsValidJobRequisition;
exports.HasConsent = HasConsent;
exports.HasInterviewPanel = HasInterviewPanel;
exports.IsValidAssessmentScore = IsValidAssessmentScore;
exports.IsValidOffer = IsValidOffer;
const class_validator_1 = require("class-validator");
let IsValidJobRequisitionConstraint = class IsValidJobRequisitionConstraint {
    validate(value, args) {
        const object = args.object;
        if (!object.requisitionId || !object.openings || !object.hiringManagerId) {
            return false;
        }
        if (object.openings < 1) {
            return false;
        }
        return true;
    }
    defaultMessage(args) {
        return 'Job requisition must include requisitionId, openings (≥1), and hiringManagerId (BR2)';
    }
};
exports.IsValidJobRequisitionConstraint = IsValidJobRequisitionConstraint;
exports.IsValidJobRequisitionConstraint = IsValidJobRequisitionConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsValidJobRequisitionConstraint);
function IsValidJobRequisition(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidJobRequisitionConstraint,
        });
    };
}
let HasConsentConstraint = class HasConsentConstraint {
    validate(value, args) {
        return value === true;
    }
    defaultMessage(args) {
        return 'Candidate consent is required for data processing and storage (BR28)';
    }
};
exports.HasConsentConstraint = HasConsentConstraint;
exports.HasConsentConstraint = HasConsentConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], HasConsentConstraint);
function HasConsent(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: HasConsentConstraint,
        });
    };
}
let HasInterviewPanelConstraint = class HasInterviewPanelConstraint {
    validate(value, args) {
        return Array.isArray(value) && value.length > 0;
    }
    defaultMessage(args) {
        return 'At least one interview panel member is required (BR19)';
    }
};
exports.HasInterviewPanelConstraint = HasInterviewPanelConstraint;
exports.HasInterviewPanelConstraint = HasInterviewPanelConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], HasInterviewPanelConstraint);
function HasInterviewPanel(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: HasInterviewPanelConstraint,
        });
    };
}
let IsValidAssessmentScoreConstraint = class IsValidAssessmentScoreConstraint {
    validate(value, args) {
        return typeof value === 'number' && value >= 1 && value <= 10;
    }
    defaultMessage(args) {
        return 'Assessment score must be between 1 and 10 (BR21)';
    }
};
exports.IsValidAssessmentScoreConstraint = IsValidAssessmentScoreConstraint;
exports.IsValidAssessmentScoreConstraint = IsValidAssessmentScoreConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsValidAssessmentScoreConstraint);
function IsValidAssessmentScore(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidAssessmentScoreConstraint,
        });
    };
}
let IsValidOfferConstraint = class IsValidOfferConstraint {
    validate(value, args) {
        const object = args.object;
        if (!object.grossSalary || !object.role || !object.content) {
            return false;
        }
        if (object.grossSalary <= 0) {
            return false;
        }
        return true;
    }
    defaultMessage(args) {
        return 'Offer must include positive grossSalary, role, and content (BR26)';
    }
};
exports.IsValidOfferConstraint = IsValidOfferConstraint;
exports.IsValidOfferConstraint = IsValidOfferConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsValidOfferConstraint);
function IsValidOffer(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidOfferConstraint,
        });
    };
}
//# sourceMappingURL=business-rules.validator.js.map