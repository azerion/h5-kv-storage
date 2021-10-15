(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.kvstorage = {}));
})(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

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

    var CookieStorage = /** @class */ (function () {
        function CookieStorage() {
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
        return CookieStorage;
    }());

    var XDomainTransfer = /** @class */ (function () {
        function XDomainTransfer(targetDomain) {
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
        return XDomainTransfer;
    }());

    var StorageCommand;
    (function (StorageCommand) {
        StorageCommand[StorageCommand["init"] = 0] = "init";
        StorageCommand[StorageCommand["setItem"] = 1] = "setItem";
        StorageCommand[StorageCommand["getItem"] = 2] = "getItem";
        StorageCommand[StorageCommand["removeItem"] = 3] = "removeItem";
        StorageCommand[StorageCommand["clear"] = 4] = "clear";
        StorageCommand[StorageCommand["setNamespace"] = 5] = "setNamespace";
        StorageCommand[StorageCommand["length"] = 6] = "length";
        StorageCommand[StorageCommand["key"] = 7] = "key";
        StorageCommand[StorageCommand["error"] = 8] = "error";
    })(StorageCommand || (StorageCommand = {}));

    var XDomain = /** @class */ (function () {
        function XDomain(xDomainName, iframeId) {
            this.storageEnabled = false;
            this.xDomainName = '';
            this.target = window.parent;
            this.xDomainName = xDomainName;
            if (iframeId && document.querySelector(iframeId) !== null) {
                this.iframe = document.querySelector(iframeId);
                return;
            }
            this.iframe = document.createElement('iframe');
        }
        XDomain.prototype.initialize = function () {
            var _this = this;
            var _a, _b;
            if (this.storageEnabled === true) {
                console.log('Adapter already initilized');
            }
            if ('complete' === ((_b = (_a = this.iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.readyState)) ;
            return new Promise(function (resolve) {
                _this.iframe.addEventListener("load", function () {
                    console.log('loaded!');
                    _this.target = _this.iframe.contentWindow;
                    resolve();
                });
            }).then(function () { return _this.sendMessageToIframe({
                command: StorageCommand.init
            }); }).then(function (message) {
                _this.storageEnabled = true;
                return message;
            });
        };
        XDomain.prototype.clear = function () {
            if (!this.storageEnabled) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.clear
            });
        };
        XDomain.prototype.getItem = function (key) {
            if (!this.storageEnabled) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.getItem,
                key: key
            });
        };
        XDomain.prototype.key = function (index) {
            if (!this.storageEnabled) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.key,
                length: index
            });
        };
        XDomain.prototype.length = function () {
            if (!this.storageEnabled) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.length,
            });
        };
        XDomain.prototype.removeItem = function (key) {
            if (!this.storageEnabled) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.removeItem,
                key: key
            });
        };
        XDomain.prototype.setItem = function (key, value) {
            if (!this.storageEnabled) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.setItem,
                key: key,
                value: value
            });
        };
        XDomain.prototype.sendMessageToIframe = function (message) {
            var _this = this;
            var returnedResult;
            if (message.command === StorageCommand.init) {
                returnedResult = false;
            }
            var messageChannel = new MessageChannel();
            return new Promise(function (resolve, reject) {
                if (!_this.storageEnabled && message.command !== StorageCommand.init) {
                    reject('Messaging not enabled!');
                }
                if (message.command === StorageCommand.init) {
                    //small timeout to see if stuff is enabled
                    setTimeout(function () {
                        if (!returnedResult) {
                            reject('Unable to get a response in time');
                        }
                    }, 1000);
                }
                messageChannel.port1.onmessage = function (event) {
                    var receivedMessage = (event.data && event.data.hasOwnProperty('command')) ? event.data : null;
                    if (receivedMessage.status === undefined || receivedMessage.status !== 'ok') {
                        reject(receivedMessage.value);
                    }
                    console.log('Message received from target', StorageCommand[receivedMessage.command], event);
                    switch (receivedMessage.command) {
                        case StorageCommand.setNamespace:
                        // this.namespace = receivedMessage.value + ':';
                        case StorageCommand.length:
                            resolve(receivedMessage.length);
                            break;
                        case StorageCommand.getItem:
                        case StorageCommand.key:
                            resolve(receivedMessage.value);
                            break;
                        case StorageCommand.setItem:
                        case StorageCommand.removeItem:
                        case StorageCommand.clear:
                        case StorageCommand.init:
                            resolve(receivedMessage.status);
                            break;
                        default:
                            reject(receivedMessage.value);
                            break;
                    }
                };
                if (_this.storageEnabled || message.command === StorageCommand.init) {
                    console.log('Sending message to parent: ', message);
                    _this.target.postMessage(message, _this.xDomainName, [messageChannel.port2]);
                }
            });
        };
        return XDomain;
    }());

    var KvStorage = /** @class */ (function () {
        function KvStorage(namespace) {
            if (namespace === void 0) { namespace = 'kvs'; }
            this.storageAdapter = new LocalStorage();
            this.namespace = namespace;
        }
        KvStorage.prototype.setNamespace = function (namedSpace) {
            this.namespace = namedSpace;
        };
        KvStorage.prototype.setAdapter = function (storageAdapter) {
            this.storageAdapter = storageAdapter;
        };
        Object.defineProperty(KvStorage.prototype, "length", {
            get: function () {
                return this.storageAdapter.length();
            },
            enumerable: false,
            configurable: true
        });
        KvStorage.prototype.key = function (n) {
            return this.storageAdapter.key(n);
        };
        KvStorage.prototype.getItem = function (key) {
            return this.storageAdapter.getItem(this.namespace + ':' + key);
        };
        KvStorage.prototype.setItem = function (key, value) {
            return this.storageAdapter.setItem(this.namespace + ':' + key, value);
        };
        KvStorage.prototype.removeItem = function (key) {
            return this.storageAdapter.removeItem(this.namespace + ':' + key);
        };
        KvStorage.prototype.clear = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.storageAdapter.clear()];
                });
            });
        };
        return KvStorage;
    }());

    exports.CookieStorage = CookieStorage;
    exports.KvStorage = KvStorage;
    exports.LocalStorage = LocalStorage;
    exports.XDomain = XDomain;
    exports.XDomainTransfer = XDomainTransfer;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=h5-kv-storage.js.map
