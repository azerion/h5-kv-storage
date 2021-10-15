"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XDomain = void 0;
var utils_1 = require("../utils");
var XDomain = /** @class */ (function () {
    function XDomain(xDomainName, iframeId) {
        this.storageAvailable = false;
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
        if (this.storageAvailable === true) {
            console.log('Adapter already initilized');
        }
        if ('complete' === ((_b = (_a = this.iframe) === null || _a === void 0 ? void 0 : _a.contentDocument) === null || _b === void 0 ? void 0 : _b.readyState)) {
        }
        return new Promise(function (resolve) {
            _this.iframe.addEventListener("load", function () {
                console.log('loaded!');
                _this.target = _this.iframe.contentWindow;
                resolve();
            });
        }).then(function () { return _this.sendMessageToIframe({
            command: utils_1.StorageCommand.init
        }); }).then(function (message) {
            _this.storageAvailable = true;
            return message;
        });
    };
    XDomain.prototype.setNamespace = function (namespace) {
    };
    XDomain.prototype.clear = function () {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.clear
        });
    };
    XDomain.prototype.getItem = function (key) {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.getItem,
            key: key
        });
    };
    XDomain.prototype.key = function (index) {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.key,
            length: index
        });
    };
    XDomain.prototype.length = function () {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.length,
        });
    };
    XDomain.prototype.removeItem = function (key) {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.removeItem,
            key: key
        });
    };
    XDomain.prototype.setItem = function (key, value) {
        if (!this.storageAvailable) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.setItem,
            key: key,
            value: value
        });
    };
    XDomain.prototype.sendMessageToIframe = function (message) {
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
                var receivedMessage = (event.data && event.data.hasOwnProperty('command')) ? event.data : null;
                if (receivedMessage.status === undefined || receivedMessage.status !== 'ok') {
                    reject(receivedMessage.value);
                }
                console.log('Message received from target', utils_1.StorageCommand[receivedMessage.command], event);
                switch (receivedMessage.command) {
                    case utils_1.StorageCommand.setNamespace:
                    // this.namespace = receivedMessage.value + ':';
                    case utils_1.StorageCommand.length:
                        resolve(receivedMessage.length);
                        break;
                    case utils_1.StorageCommand.getItem:
                    case utils_1.StorageCommand.key:
                        resolve(receivedMessage.value);
                        break;
                    case utils_1.StorageCommand.setItem:
                    case utils_1.StorageCommand.removeItem:
                    case utils_1.StorageCommand.clear:
                    case utils_1.StorageCommand.init:
                        resolve(receivedMessage.status);
                        break;
                    default:
                        reject(receivedMessage.value);
                        break;
                }
            };
            if (_this.storageAvailable || message.command === utils_1.StorageCommand.init) {
                console.log('Sending message to parent: ', message);
                _this.target.postMessage(message, _this.xDomainName, [messageChannel.port2]);
            }
        });
    };
    return XDomain;
}());
exports.XDomain = XDomain;
//# sourceMappingURL=x-domain.js.map