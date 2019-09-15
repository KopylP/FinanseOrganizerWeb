"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SaveInformationWarnGuard = /** @class */ (function () {
    function SaveInformationWarnGuard() {
    }
    SaveInformationWarnGuard.prototype.canDeactivate = function (component, route, state) {
        return component.canDeactivate ? component.canDeactivate() : true;
    };
    return SaveInformationWarnGuard;
}());
exports.SaveInformationWarnGuard = SaveInformationWarnGuard;
//# sourceMappingURL=save-information-warn.guard.js.map