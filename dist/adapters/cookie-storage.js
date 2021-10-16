"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CookieStorage = void 0;
var CookieStorage = /** @class */ (function () {
    function CookieStorage() {
        this.reg = new RegExp('', 'g');
        this.namespace = '';
        this.storageAvailable = false;
        this.setNamespace('kvs');
    }
    CookieStorage.prototype.length = function () {
        return Promise.resolve((this.getNameSpaceMatches() !== null) ? this.getNameSpaceMatches().length : 0);
    };
    CookieStorage.prototype.key = function (n) {
        var key = this.getNameSpaceMatches()[n];
        var result = this.getCookiesForNameSpace()[key] || null;
        return Promise.resolve(result);
    };
    CookieStorage.prototype.getItem = function (key) {
        var result = this.getCookiesForNameSpace()[key] || null;
        return Promise.resolve(result);
    };
    CookieStorage.prototype.setItem = function (key, value) {
        document.cookie = encodeURIComponent(this.namespace + key) + '=' + encodeURIComponent(value) + '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/';
        return Promise.resolve();
    };
    CookieStorage.prototype.removeItem = function (key) {
        document.cookie = encodeURIComponent(this.namespace + key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        return Promise.resolve();
    };
    CookieStorage.prototype.clear = function () {
        var cookies = this.getCookiesForNameSpace();
        for (var key in cookies) {
            if (cookies.hasOwnProperty(key)) {
                this.removeItem(key);
            }
        }
        return Promise.resolve();
    };
    CookieStorage.prototype.setNamespace = function (namespace) {
        if (namespace) {
            this.namespace = namespace + ':';
            this.reg = new RegExp('^' + this.namespace + '[a-zA-Z0-9]*', 'g');
        }
        return Promise.resolve();
    };
    CookieStorage.prototype.getNameSpaceMatches = function () {
        var _this = this;
        var cookies = decodeURIComponent(document.cookie).split('; ');
        return cookies.filter(function (val) {
            var temp = val.match(_this.reg) || [];
            return temp.length > 0 || false;
        });
    };
    CookieStorage.prototype.getCookiesForNameSpace = function () {
        var _this = this;
        var cookies = {};
        this.getNameSpaceMatches().forEach(function (cookie) {
            var temp = cookie.replace(_this.namespace, '').split('=');
            cookies[temp[0]] = temp[1];
        });
        return cookies;
    };
    CookieStorage.prototype.initialize = function () {
        this.storageAvailable = true;
        return Promise.resolve('ok');
    };
    return CookieStorage;
}());
exports.CookieStorage = CookieStorage;
//# sourceMappingURL=cookie-storage.js.map