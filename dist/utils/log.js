"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.setLoglevel = exports.LogStatus = void 0;
var t = Date.now();
var LogStatus;
(function (LogStatus) {
    LogStatus[LogStatus["error"] = 0] = "error";
    LogStatus[LogStatus["warn"] = 1] = "warn";
    LogStatus[LogStatus["info"] = 2] = "info";
    LogStatus[LogStatus["debug"] = 3] = "debug";
    LogStatus[LogStatus["none"] = 4] = "none";
})(LogStatus = exports.LogStatus || (exports.LogStatus = {}));
var logLevel = LogStatus.none;
function setLoglevel(level) {
    logLevel = level;
}
exports.setLoglevel = setLoglevel;
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
exports.log = log;
//# sourceMappingURL=log.js.map