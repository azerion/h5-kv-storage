"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        this.storageEnabled = false;
        try {
            if (typeof localStorage === 'object') {
                localStorage.setItem('kv-storage-test', 'true');
                localStorage.removeItem('kv-storage-test');
                this.storageEnabled = true;
            }
        }
        catch (e) { }
    }
    LocalStorage.prototype.clear = function () {
        if (this.storageEnabled) {
            return Promise.resolve(localStorage.clear());
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    LocalStorage.prototype.getItem = function (key) {
        if (this.storageEnabled) {
            return Promise.resolve(localStorage.getItem(key));
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    LocalStorage.prototype.key = function (index) {
        if (this.storageEnabled) {
            return Promise.resolve(localStorage.key(index));
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    LocalStorage.prototype.length = function () {
        if (this.storageEnabled) {
            return Promise.resolve(localStorage.length);
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    LocalStorage.prototype.removeItem = function (key) {
        if (this.storageEnabled) {
            return Promise.resolve(localStorage.removeItem(key));
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    LocalStorage.prototype.setItem = function (key, value) {
        if (this.storageEnabled) {
            return Promise.resolve(localStorage.setItem(key, value));
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
//# sourceMappingURL=local-storage.js.map