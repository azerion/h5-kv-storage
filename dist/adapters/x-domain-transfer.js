"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XDomainTransfer = void 0;
var XDomainTransfer = /** @class */ (function () {
    function XDomainTransfer(targetDomain) {
        this.storageAvailable = false;
    }
    XDomainTransfer.prototype.clear = function () {
        return Promise.resolve(undefined);
    };
    XDomainTransfer.prototype.getItem = function (key) {
        return Promise.resolve('');
    };
    XDomainTransfer.prototype.key = function (index) {
        return Promise.resolve('');
    };
    XDomainTransfer.prototype.length = function () {
        return Promise.resolve(0);
    };
    XDomainTransfer.prototype.removeItem = function (key) {
        return Promise.resolve(undefined);
    };
    XDomainTransfer.prototype.setItem = function (key, value) {
        return Promise.resolve(undefined);
    };
    XDomainTransfer.prototype.initialize = function () {
        return Promise.resolve('');
    };
    XDomainTransfer.prototype.setNamespace = function (namespace) {
    };
    return XDomainTransfer;
}());
exports.XDomainTransfer = XDomainTransfer;
//# sourceMappingURL=x-domain-transfer.js.map