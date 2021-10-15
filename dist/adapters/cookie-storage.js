"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieStorage = void 0;
var CookieStorage = /** @class */ (function () {
    function CookieStorage() {
        this.storageAvailable = false;
    }
    CookieStorage.prototype.clear = function () {
        return Promise.resolve(undefined);
    };
    CookieStorage.prototype.getItem = function (key) {
        return Promise.resolve('undefined');
    };
    CookieStorage.prototype.key = function (index) {
        return Promise.resolve('');
    };
    CookieStorage.prototype.length = function () {
        return Promise.resolve(0);
    };
    CookieStorage.prototype.removeItem = function (key) {
        return Promise.resolve(undefined);
    };
    CookieStorage.prototype.setItem = function (key, value) {
        return Promise.resolve(undefined);
    };
    CookieStorage.prototype.initialize = function () {
        return Promise.resolve('');
    };
    CookieStorage.prototype.setNamespace = function (namespace) {
    };
    return CookieStorage;
}());
exports.CookieStorage = CookieStorage;
//# sourceMappingURL=cookie-storage.js.map