"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
var log_1 = require("../utils/log");
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        this.storageAvailable = false;
        this.namespace = '';
    }
    LocalStorage.prototype.initialize = function () {
        try {
            if (typeof localStorage === 'object') {
                localStorage.setItem('kv-storage-test', 'true');
                localStorage.removeItem('kv-storage-test');
                this.storageAvailable = true;
                (0, log_1.log)(this.constructor.name, 'Initialized', log_1.LogLevel.debug);
                return Promise.resolve('ok');
            }
            else {
                (0, log_1.log)(this.constructor.name, 'localStorage not available', log_1.LogLevel.warn);
                return Promise.reject('Unable to local your storage');
            }
        }
        catch (e) {
            (0, log_1.log)(this.constructor.name, 'localStorage crashed during initialisation', log_1.LogLevel.warn);
            return Promise.reject('Unable to local your storage');
        }
    };
    LocalStorage.prototype.setNamespace = function (namespace) {
        this.namespace = namespace;
    };
    LocalStorage.prototype.clear = function () {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.clear());
        }
        else {
            return Promise.reject('LocalStorage not available');
        }
    };
    LocalStorage.prototype.getItem = function (key) {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.getItem(this.namespace + key));
        }
        else {
            return Promise.reject('LocalStorage not available');
        }
    };
    LocalStorage.prototype.key = function (index) {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.key(index));
        }
        else {
            return Promise.reject('LocalStorage not available');
        }
    };
    LocalStorage.prototype.length = function () {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.length);
        }
        else {
            return Promise.reject('LocalStorage not available');
        }
    };
    LocalStorage.prototype.removeItem = function (key) {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.removeItem(this.namespace + key));
        }
        else {
            return Promise.reject('LocalStorage not available');
        }
    };
    LocalStorage.prototype.setItem = function (key, value) {
        if (this.storageAvailable) {
            return Promise.resolve(localStorage.setItem(this.namespace + key, value));
        }
        else {
            return Promise.reject('LocalStorage not available');
        }
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
//# sourceMappingURL=local-storage.js.map