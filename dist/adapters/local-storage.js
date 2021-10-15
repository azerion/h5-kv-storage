"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        this.storageAvailable = false;
        this.namespace = 'kvs';
    }
    LocalStorage.prototype.initialize = function () {
        try {
            if (typeof localStorage === 'object') {
                localStorage.setItem('kv-storage-test', 'true');
                localStorage.removeItem('kv-storage-test');
                this.storageAvailable = true;
                return Promise.resolve('ok');
            }
        }
        catch (e) { }
        return Promise.reject('Unable to local your storage');
    };
    LocalStorage.prototype.setNamespace = function (namespace) {
    };
    LocalStorage.prototype.clear = function () {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.clear());
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    LocalStorage.prototype.getItem = function (key) {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.getItem(key));
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    LocalStorage.prototype.key = function (index) {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.key(index));
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    LocalStorage.prototype.length = function () {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.length);
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    LocalStorage.prototype.removeItem = function (key) {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.removeItem(key));
        }
        else {
            return Promise.reject("LocalStorage not available");
        }
    };
    LocalStorage.prototype.setItem = function (key, value) {
        if (this.storageAvailable) {
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