"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XDomain = void 0;
var utils_1 = require("../utils");
var XDomain = /** @class */ (function () {
    function XDomain(xDomainName) {
        var _this = this;
        this.storageEnabled = false;
        this.xDomainName = '';
        this.xDomainName = xDomainName;
        this.sendMessageToIframe({
            command: utils_1.StorageCommand.init
        }).then(function () {
            _this.storageEnabled = true;
        });
    }
    XDomain.prototype.clear = function () {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.clear
        });
    };
    XDomain.prototype.getItem = function (key) {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.getItem,
            key: key
        });
    };
    XDomain.prototype.key = function (index) {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.key,
            length: index
        });
    };
    XDomain.prototype.length = function () {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.length,
        });
    };
    XDomain.prototype.removeItem = function (key) {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.removeItem,
            key: key
        });
    };
    XDomain.prototype.setItem = function (key, value) {
        if (!this.storageEnabled) {
            return Promise.reject('XDomain storage not available');
        }
        return this.sendMessageToIframe({
            command: utils_1.StorageCommand.removeItem,
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
            if (!_this.storageEnabled && message.command !== utils_1.StorageCommand.init) {
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
                console.log('Frame received message', event);
                var receivedMessage = (event.data && event.data.command) ? event.data : null;
                if (receivedMessage.command === utils_1.StorageCommand.init) {
                    returnedResult = true;
                }
                if (receivedMessage.status === undefined || receivedMessage.status !== 'ok') {
                    reject(receivedMessage.value);
                }
                if (receivedMessage.length !== undefined) {
                    resolve(receivedMessage.length);
                }
                switch (receivedMessage.command) {
                    case utils_1.StorageCommand.setNamespace:
                    // this.namespace = receivedMessage.value + ':';
                    case utils_1.StorageCommand.getItem:
                    case utils_1.StorageCommand.length:
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
            if (_this.storageEnabled || message.command === utils_1.StorageCommand.init) {
                console.log('Sending message to parent: ', message);
                window.parent.postMessage(message, _this.xDomainName, [messageChannel.port2]);
            }
        });
    };
    return XDomain;
}());
exports.XDomain = XDomain;
//# sourceMappingURL=x-domain.js.map