"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XDomainStorage = void 0;
var utils_1 = require("../utils");
var log_1 = require("../utils/log");
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
                    command: utils_1.StorageCommand.init,
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
            command: utils_1.StorageCommand.setNamespace,
            value: namespace,
        });
    };
    XDomainStorage.prototype.clear = function () {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.clear,
        });
    };
    XDomainStorage.prototype.getItem = function (key) {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.getItem,
            key: key,
        });
    };
    XDomainStorage.prototype.key = function (index) {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.key,
            key: index.toString(),
        });
    };
    XDomainStorage.prototype.length = function () {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.length,
        });
    };
    XDomainStorage.prototype.removeItem = function (key) {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.removeItem,
            key: key,
        });
    };
    XDomainStorage.prototype.setItem = function (key, value) {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.setItem,
            key: key,
            value: value,
        });
    };
    XDomainStorage.prototype.sendMessageToIframe = function (message) {
        var _this = this;
        var returnedResult;
        if (message.command === utils_1.StorageCommand.init) {
            returnedResult = false;
        }
        var messageChannel = new MessageChannel();
        return new Promise(function (resolve, reject) {
            if (!_this.storageAvailable && message.command !== utils_1.StorageCommand.init) {
                reject('Messaging not enabled!');
            }
            if (message.command === utils_1.StorageCommand.init) {
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
                (0, log_1.log)(_this.constructor.name, 'Message received from ' +
                    _this.xDomainName +
                    ': ' +
                    utils_1.StorageCommand[receivedMessage.command], log_1.LogLevel.debug);
                switch (receivedMessage.command) {
                    case utils_1.StorageCommand.length:
                    case utils_1.StorageCommand.getItem:
                    case utils_1.StorageCommand.key:
                        resolve(receivedMessage.value);
                        break;
                    case utils_1.StorageCommand.setItem:
                    case utils_1.StorageCommand.removeItem:
                    case utils_1.StorageCommand.clear:
                    case utils_1.StorageCommand.init:
                    case utils_1.StorageCommand.setNamespace:
                        resolve(receivedMessage.status);
                        break;
                    default:
                        reject('Can not process command');
                        break;
                }
            };
            if (_this.storageAvailable || message.command === utils_1.StorageCommand.init) {
                (0, log_1.log)(_this.constructor.name, 'Sending message to ' +
                    _this.xDomainName +
                    ': ' +
                    utils_1.StorageCommand[message.command], log_1.LogLevel.debug);
                _this.target.postMessage(message, _this.xDomainName, [
                    messageChannel.port2,
                ]);
            }
        });
    };
    return XDomainStorage;
}());
exports.XDomainStorage = XDomainStorage;
//# sourceMappingURL=x-domain-storage.js.map