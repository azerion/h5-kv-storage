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

    var t = Date.now();
    var LogStatus;
    (function (LogStatus) {
        LogStatus[LogStatus["error"] = 0] = "error";
        LogStatus[LogStatus["warn"] = 1] = "warn";
        LogStatus[LogStatus["info"] = 2] = "info";
        LogStatus[LogStatus["debug"] = 3] = "debug";
        LogStatus[LogStatus["none"] = 4] = "none";
    })(LogStatus || (LogStatus = {}));
    var logLevel = LogStatus.none;
    function setLoglevel(level) {
        logLevel = level;
    }
    var themes = [
        'background: #c4161e; color: #fff',
        'background: #ff8c1c; color: #fff',
        'background: #ff0080; color: #fff',
        'background: #44a5ab; color: #fff',
    ];
    /**
     * log
     * Just shows stuff in as dank as possible.
     *
     * @param {String} name
     * @param {String} message
     * @param {String} status
     * @public
     */
    function log(name, message, status) {
        if (status === void 0) { status = LogStatus.debug; }
        if (status > logLevel) {
            return;
        }
        console.log('[' +
            ((Date.now() - t) / 1000).toString() +
            's]' +
            '%c %c %c h5-kv-storage %c %c %c ' +
            name +
            ' ', 'background: #278CEB', 'background:#006db6', 'color: #fff; background: #001c4a;', 'background: #006db6', 'background: #278CEB', themes[status], typeof message !== 'undefined' ? message : '');
    }

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
                    return Promise.resolve('ok');
                }
            }
            catch (e) {
                return Promise.reject('Unable to local your storage');
            }
            return Promise.reject('Unable to local your storage');
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

    var CookieStorage = /** @class */ (function () {
        function CookieStorage() {
            this.reg = new RegExp('', 'g');
            this.namespace = '';
            this.storageAvailable = false;
            void this.setNamespace('kvs');
        }
        CookieStorage.prototype.length = function () {
            return Promise.resolve(this.getNameSpaceMatches() !== null
                ? this.getNameSpaceMatches().length
                : 0);
        };
        CookieStorage.prototype.key = function (n) {
            var key = this.getNameSpaceMatches()[n];
            var result = this.getCookiesForNameSpace()[key] || null;
            return Promise.resolve(result === null || result === void 0 ? void 0 : result.toString());
        };
        CookieStorage.prototype.getItem = function (key) {
            var result = this.getCookiesForNameSpace()[key] || null;
            return Promise.resolve(result === null || result === void 0 ? void 0 : result.toString());
        };
        CookieStorage.prototype.setItem = function (key, value) {
            document.cookie =
                encodeURIComponent(this.namespace + key) +
                    '=' +
                    encodeURIComponent(value) +
                    '; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/';
            return Promise.resolve();
        };
        CookieStorage.prototype.removeItem = function (key) {
            document.cookie =
                encodeURIComponent(this.namespace + key) +
                    '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            return Promise.resolve();
        };
        CookieStorage.prototype.clear = function () {
            var cookies = this.getCookiesForNameSpace();
            for (var key in cookies) {
                if (Object.prototype.hasOwnProperty.call(cookies, key)) {
                    void this.removeItem(key);
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
                var temp = _this.reg.exec(val) || [];
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

    var TransferStorage = /** @class */ (function () {
        function TransferStorage(fromAdapter, toAdapter) {
            this.namespace = '';
            this.storageAvailable = false;
            this.fromAdapter = fromAdapter;
            this.toAdapter = toAdapter;
        }
        TransferStorage.prototype.initialize = function () {
            var _this = this;
            return this.fromAdapter.initialize().then(function () { return _this.toAdapter.initialize(); });
        };
        TransferStorage.prototype.setNamespace = function (namespace) {
            this.namespace = namespace;
            this.toAdapter.setNamespace(namespace);
            this.fromAdapter.setNamespace(namespace);
        };
        TransferStorage.prototype.clear = function () {
            var _this = this;
            return this.fromAdapter.clear().then(function () { return _this.toAdapter.clear(); });
        };
        TransferStorage.prototype.getItem = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.toAdapter.getItem(key)];
                        case 1:
                            item = _a.sent();
                            if (!(null === item)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.fromAdapter.getItem(key)];
                        case 2:
                            item = _a.sent();
                            return [4 /*yield*/, this.toAdapter.setItem(key, item || '')];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4: return [2 /*return*/, item];
                    }
                });
            });
        };
        TransferStorage.prototype.key = function (index) {
            return __awaiter(this, void 0, void 0, function () {
                var item;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.toAdapter.key(index)];
                        case 1:
                            item = _a.sent();
                            return [2 /*return*/, item];
                    }
                });
            });
        };
        TransferStorage.prototype.length = function () {
            return this.toAdapter.length();
        };
        TransferStorage.prototype.removeItem = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.fromAdapter.removeItem(key)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.toAdapter.removeItem(key)];
                    }
                });
            });
        };
        TransferStorage.prototype.setItem = function (key, value) {
            return this.toAdapter.setItem(key, value);
        };
        return TransferStorage;
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

    var XDomainStorage = /** @class */ (function () {
        function XDomainStorage(xDomainName, iframeIdOrUrl) {
            var _a;
            this.storageAvailable = false;
            this.xDomainName = '';
            this.target = window.parent;
            this.xDomainName = xDomainName;
            var isDomain = (((_a = /^(http|https):\/\//.exec(iframeIdOrUrl)) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0 || false;
            if (!isDomain && document.querySelector(iframeIdOrUrl) !== null) {
                this.iframe = document.querySelector(iframeIdOrUrl);
            }
            else {
                this.iframe = this.createIFrame(iframeIdOrUrl);
            }
        }
        XDomainStorage.prototype.createIFrame = function (url) {
            var iframe = document.createElement('iframe');
            iframe.setAttribute('id', 'kv-strg-x-dmn');
            iframe.setAttribute('width', '0px');
            iframe.setAttribute('height', '0px');
            iframe.setAttribute('style', 'position:absolute; top: -999px; display: none');
            iframe.setAttribute('src', url);
            document.body.appendChild(iframe);
            return iframe;
        };
        XDomainStorage.prototype.initialize = function () {
            var _this = this;
            var _a, _b;
            if (this.storageAvailable === true) {
                return Promise.reject('Adapter already initialized');
            }
            if (this.iframe === undefined) {
                this.storageAvailable = true;
                return Promise.resolve('ok');
            }
            if ('complete' === ((_b = (_a = this.iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.readyState)) {
                return new Promise(function (resolve) {
                    _this.iframe.addEventListener('load', function () {
                        _this.target = _this.iframe.contentWindow;
                        resolve('ok');
                    });
                })
                    .then(function () {
                    return _this.sendMessageToIframe({
                        command: StorageCommand.init,
                    });
                })
                    .then(function (message) {
                    _this.storageAvailable = true;
                    return message;
                });
            }
            return Promise.reject('Unable to initialize adapter!');
        };
        XDomainStorage.prototype.setNamespace = function (namespace) {
            if (!this.storageAvailable) {
                return;
            }
            this.sendMessageToIframe({
                command: StorageCommand.setNamespace,
                value: namespace,
            });
        };
        XDomainStorage.prototype.clear = function () {
            if (!this.storageAvailable) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.clear,
            });
        };
        XDomainStorage.prototype.getItem = function (key) {
            if (!this.storageAvailable) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.getItem,
                key: key,
            });
        };
        XDomainStorage.prototype.key = function (index) {
            if (!this.storageAvailable) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.key,
                length: index,
            });
        };
        XDomainStorage.prototype.length = function () {
            if (!this.storageAvailable) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.length,
            });
        };
        XDomainStorage.prototype.removeItem = function (key) {
            if (!this.storageAvailable) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.removeItem,
                key: key,
            });
        };
        XDomainStorage.prototype.setItem = function (key, value) {
            if (!this.storageAvailable) {
                return Promise.reject('XDomain storage not available');
            }
            return this.sendMessageToIframe({
                command: StorageCommand.setItem,
                key: key,
                value: value,
            });
        };
        XDomainStorage.prototype.sendMessageToIframe = function (message) {
            var _this = this;
            var returnedResult;
            if (message.command === StorageCommand.init) {
                returnedResult = false;
            }
            var messageChannel = new MessageChannel();
            return new Promise(function (resolve, reject) {
                if (!_this.storageAvailable && message.command !== StorageCommand.init) {
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
                    var receivedMessage = event.data &&
                        Object.prototype.hasOwnProperty.call(event.data, 'command')
                        ? event.data
                        : null;
                    if (receivedMessage === null ||
                        receivedMessage.status === undefined ||
                        receivedMessage.status !== 'ok') {
                        return reject('Wrong data!');
                    }
                    log(_this.constructor.name, 'Message received from ' +
                        _this.xDomainName +
                        ': ' +
                        StorageCommand[receivedMessage.command], LogStatus.debug);
                    switch (receivedMessage.command) {
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
                        case StorageCommand.setNamespace:
                            resolve(receivedMessage.status);
                            break;
                        default:
                            reject(receivedMessage.value);
                            break;
                    }
                };
                if (_this.storageAvailable || message.command === StorageCommand.init) {
                    log(_this.constructor.name, 'Sending message to ' +
                        _this.xDomainName +
                        ': ' +
                        StorageCommand[message.command], LogStatus.debug);
                    _this.target.postMessage(message, _this.xDomainName, [
                        messageChannel.port2,
                    ]);
                }
            });
        };
        return XDomainStorage;
    }());

    var KvStorage = /** @class */ (function () {
        function KvStorage(level) {
            if (level === void 0) { level = LogStatus.none; }
            this.namespace = '';
            setLoglevel(level);
        }
        KvStorage.prototype.setNamespace = function (namedSpace) {
            var _a;
            this.namespace = namedSpace;
            (_a = this.storageAdapter) === null || _a === void 0 ? void 0 : _a.setNamespace(this.namespace);
        };
        KvStorage.prototype.setAdapter = function (storageAdapter) {
            var _this = this;
            this.storageAdapter = storageAdapter;
            log(this.constructor.name, 'addding and initializing adapter: ' + storageAdapter.constructor.name, LogStatus.info);
            return this.storageAdapter.initialize().then(function (status) {
                var _a;
                if (status !== 'ok') {
                    _this.storageAdapter = undefined;
                    return Promise.reject('Unable to initiliaze adapter!');
                }
                (_a = _this.storageAdapter) === null || _a === void 0 ? void 0 : _a.setNamespace(_this.namespace);
                return 'ok';
            });
        };
        KvStorage.prototype.length = function () {
            if (!this.storageAdapter) {
                return Promise.reject('No adapter configured!');
            }
            log(this.constructor.name, 'Calling length() on storage adapter', LogStatus.debug);
            return this.storageAdapter.length();
        };
        KvStorage.prototype.key = function (n) {
            if (!this.storageAdapter) {
                return Promise.reject('No adapter configured!');
            }
            log(this.constructor.name, 'Calling key() on storage adapter', LogStatus.debug);
            return this.storageAdapter.key(n);
        };
        KvStorage.prototype.getItem = function (key) {
            if (!this.storageAdapter) {
                return Promise.reject('No adapter configured!');
            }
            log(this.constructor.name, 'Calling getItem() on storage adapter', LogStatus.debug);
            return this.storageAdapter.getItem(key);
        };
        KvStorage.prototype.setItem = function (key, value) {
            if (!this.storageAdapter) {
                return Promise.reject('No adapter configured!');
            }
            log(this.constructor.name, 'Calling setItem() on storage adapter', LogStatus.debug);
            return this.storageAdapter.setItem(key, value);
        };
        KvStorage.prototype.removeItem = function (key) {
            if (!this.storageAdapter) {
                return Promise.reject('No adapter configured!');
            }
            log(this.constructor.name, 'Calling removeItem() on storage adapter', LogStatus.debug);
            return this.storageAdapter.removeItem(key);
        };
        KvStorage.prototype.clear = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!this.storageAdapter) {
                        return [2 /*return*/, Promise.reject('No adapter configured!')];
                    }
                    log(this.constructor.name, 'Calling clear() on storage adapter', LogStatus.debug);
                    return [2 /*return*/, this.storageAdapter.clear()];
                });
            });
        };
        return KvStorage;
    }());

    exports.CookieStorage = CookieStorage;
    exports.KvStorage = KvStorage;
    exports.LocalStorage = LocalStorage;
    exports.TransferStorage = TransferStorage;
    exports.XDomainStorage = XDomainStorage;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=h5-kv-storage.umd.js.map
