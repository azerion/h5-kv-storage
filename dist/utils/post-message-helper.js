"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMessageHelper = void 0;
var _1 = require("./");
var adapters_1 = require("../adapters");
var PostMessageHelper = /** @class */ (function () {
    function PostMessageHelper(sourceDomain) {
        this.sourceDomain = sourceDomain;
        // We'll just ass-u-me local storage for now
        this.adapter = new adapters_1.LocalStorage();
        window.addEventListener('message', this.messageHandler.bind(this));
    }
    PostMessageHelper.prototype.setAdapter = function (adapter) {
        this.adapter = adapter;
    };
    PostMessageHelper.prototype.sendError = function (source, command, message) {
        source.postMessage({
            status: 'error',
            command: command,
            value: message
        });
    };
    ;
    PostMessageHelper.prototype.messageHandler = function (event) {
        if (event.origin.indexOf(this.sourceDomain) === -1) {
            // Received message is not from the domain we'd like to get data from. Skipping....
            return;
        }
        var receivedMessage = (event.data && event.data.hasOwnProperty('command')) ? event.data : null;
        var source = event.ports[0];
        if (typeof source === 'undefined' || !source) {
            // No source to return too, skipping
            return;
        }
        if (null !== receivedMessage) {
            console.log('Message received from host: ', _1.StorageCommand[receivedMessage.command], event);
            switch (receivedMessage.command) {
                case _1.StorageCommand.init:
                    console.log('Remote resource initialized');
                    source.postMessage({
                        status: 'ok',
                        command: receivedMessage.command
                    });
                    break;
                case _1.StorageCommand.getItem:
                    try {
                        this.adapter.getItem(receivedMessage.key).then(function (item) {
                            source.postMessage({
                                status: 'ok',
                                command: receivedMessage.command,
                                value: item
                            });
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e.message);
                    }
                    break;
                case _1.StorageCommand.setItem:
                    try {
                        this.adapter.setItem(receivedMessage.key, receivedMessage.value);
                        source.postMessage({
                            status: 'ok',
                            command: receivedMessage.command
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e.message);
                    }
                    break;
                case _1.StorageCommand.removeItem:
                    try {
                        this.adapter.removeItem(receivedMessage.key).then(function () {
                            source.postMessage({
                                status: 'ok',
                                command: receivedMessage.command
                            });
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e.message);
                    }
                    break;
                case _1.StorageCommand.setNamespace:
                    try {
                        // this.adapter.setNamespace(receivedMessage.value);
                        //
                        // source.postMessage(<IStorageMessage>{
                        //     status: 'ok',
                        //     command: receivedMessage.command,
                        //     value: receivedMessage.value,
                        //     length: this.adapter.length
                        // });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e.message);
                    }
                    break;
                case _1.StorageCommand.clear:
                    try {
                        this.adapter.clear();
                        source.postMessage({
                            status: 'ok',
                            command: receivedMessage.command
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e.message);
                    }
                    break;
                case _1.StorageCommand.length:
                    try {
                        // source.postMessage(<IStorageMessage>{
                        //     status: 'ok',
                        //     command: receivedMessage.command,
                        //     value: this.adapter.length,
                        //     length: this.adapter.length
                        // });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e.message);
                    }
                    break;
                case _1.StorageCommand.key:
                    try {
                        this.adapter.key(receivedMessage.length).then(function (value) {
                            source.postMessage({
                                status: 'ok',
                                command: receivedMessage.command,
                                value: value
                            });
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e.message);
                    }
                    break;
                default:
                    this.sendError(source, receivedMessage.command, 'Command not found');
                    break;
            }
        }
        else {
            this.sendError(source, _1.StorageCommand.error, 'Empty message!');
        }
    };
    return PostMessageHelper;
}());
exports.PostMessageHelper = PostMessageHelper;
//# sourceMappingURL=post-message-helper.js.map