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

var PostMessageHelper = /** @class */ (function () {
    function PostMessageHelper(sourceDomain) {
        var _this = this;
        this.sourceDomain = sourceDomain;
        // We'll just ass-u-me local storage for now
        this.adapter = new LocalStorage();
        void this.adapter.initialize().then(function () {
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
            value: message,
        });
    };
    PostMessageHelper.prototype.messageHandler = function (event) {
        if (event.origin.indexOf(this.sourceDomain) === -1) {
            // Received message is not from the domain we'd like to get data from. Skipping....
            return;
        }
        var receivedMessage = event.data && Object.prototype.hasOwnProperty.call(event.data, 'command')
            ? event.data
            : null;
        var source = event.ports[0];
        if (typeof source === 'undefined' || !source) {
            // No source to return too, skipping
            return;
        }
        if (null !== receivedMessage) {
            log(this.constructor.name, 'Message received from ' +
                this.sourceDomain +
                ': ' +
                StorageCommand[receivedMessage.command], LogStatus.debug);
            switch (receivedMessage.command) {
                case StorageCommand.init:
                    log(this.constructor.name, 'Remote resource initialized', LogStatus.debug);
                    source.postMessage({
                        status: 'ok',
                        command: receivedMessage.command,
                    });
                    break;
                case StorageCommand.getItem:
                    try {
                        void this.adapter
                            .getItem(receivedMessage.key)
                            .then(function (item) {
                            source.postMessage({
                                status: 'ok',
                                command: receivedMessage.command,
                                value: item,
                            });
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e);
                    }
                    break;
                case StorageCommand.setItem:
                    try {
                        void this.adapter.setItem(receivedMessage.key, receivedMessage.value);
                        source.postMessage({
                            status: 'ok',
                            command: receivedMessage.command,
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e);
                    }
                    break;
                case StorageCommand.removeItem:
                    try {
                        void this.adapter
                            .removeItem(receivedMessage.key)
                            .then(function () {
                            source.postMessage({
                                status: 'ok',
                                command: receivedMessage.command,
                            });
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e);
                    }
                    break;
                case StorageCommand.setNamespace:
                    try {
                        this.adapter.setNamespace(receivedMessage.value);
                        source.postMessage({
                            status: 'ok',
                            command: receivedMessage.command,
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e);
                    }
                    break;
                case StorageCommand.clear:
                    try {
                        void this.adapter.clear();
                        source.postMessage({
                            status: 'ok',
                            command: receivedMessage.command,
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e);
                    }
                    break;
                case StorageCommand.length:
                    break;
                case StorageCommand.key:
                    try {
                        void this.adapter
                            .key(receivedMessage.length)
                            .then(function (value) {
                            source.postMessage({
                                status: 'ok',
                                command: receivedMessage.command,
                                value: value,
                            });
                        });
                    }
                    catch (e) {
                        this.sendError(source, receivedMessage.command, e);
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

export { PostMessageHelper };
//# sourceMappingURL=h5-xdomain-storage.esm.js.map
