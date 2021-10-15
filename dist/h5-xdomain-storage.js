(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.xdstorage = {}));
})(this, (function (exports) { 'use strict';

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

    var PostMessageHelper = /** @class */ (function () {
        function PostMessageHelper(sourceDomain) {
            var _this = this;
            this.sourceDomain = sourceDomain;
            // We'll just ass-u-me local storage for now
            this.adapter = new LocalStorage();
            this.adapter.initialize().then(function () {
                window.addEventListener('message', _this.messageHandler.bind(_this));
            });
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
                console.log('Message received from host: ', StorageCommand[receivedMessage.command], event);
                switch (receivedMessage.command) {
                    case StorageCommand.init:
                        console.log('Remote resource initialized');
                        source.postMessage({
                            status: 'ok',
                            command: receivedMessage.command
                        });
                        break;
                    case StorageCommand.getItem:
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
                    case StorageCommand.setItem:
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
                    case StorageCommand.removeItem:
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
                    case StorageCommand.setNamespace:
                        break;
                    case StorageCommand.clear:
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
                    case StorageCommand.length:
                        break;
                    case StorageCommand.key:
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
                this.sendError(source, StorageCommand.error, 'Empty message!');
            }
        };
        return PostMessageHelper;
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

    exports.PostMessageHelper = PostMessageHelper;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=h5-xdomain-storage.js.map
