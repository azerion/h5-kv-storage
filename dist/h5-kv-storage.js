"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KvStorage = void 0;
var log_1 = require("./utils/log");
__exportStar(require("./adapters"), exports);
var KvStorage = /** @class */ (function () {
    function KvStorage(level) {
        if (level === void 0) { level = log_1.LogLevel.none; }
        this.namespace = '';
        (0, log_1.setLoglevel)(level);
    }
    KvStorage.prototype.setNamespace = function (namedSpace) {
        var _a;
        this.namespace = namedSpace;
        (_a = this.storageAdapter) === null || _a === void 0 ? void 0 : _a.setNamespace(this.namespace);
    };
    KvStorage.prototype.setAdapter = function (storageAdapter) {
        var _this = this;
        this.storageAdapter = storageAdapter;
        (0, log_1.log)(this.constructor.name, 'addding and initializing adapter: ' +
            storageAdapter.constructor.name, log_1.LogLevel.info);
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
        (0, log_1.log)(this.constructor.name, 'Calling length() on storage adapter', log_1.LogLevel.debug);
        return this.storageAdapter.length();
    };
    KvStorage.prototype.key = function (n) {
        if (!this.storageAdapter) {
            return Promise.reject('No adapter configured!');
        }
        (0, log_1.log)(this.constructor.name, 'Calling key() on storage adapter', log_1.LogLevel.debug);
        return this.storageAdapter.key(n);
    };
    KvStorage.prototype.getItem = function (key) {
        if (!this.storageAdapter) {
            return Promise.reject('No adapter configured!');
        }
        (0, log_1.log)(this.constructor.name, 'Calling getItem() on storage adapter', log_1.LogLevel.debug);
        return this.storageAdapter.getItem(key);
    };
    KvStorage.prototype.setItem = function (key, value) {
        if (!this.storageAdapter) {
            return Promise.reject('No adapter configured!');
        }
        (0, log_1.log)(this.constructor.name, 'Calling setItem() on storage adapter', log_1.LogLevel.debug);
        return this.storageAdapter.setItem(key, value);
    };
    KvStorage.prototype.removeItem = function (key) {
        if (!this.storageAdapter) {
            return Promise.reject('No adapter configured!');
        }
        (0, log_1.log)(this.constructor.name, 'Calling removeItem() on storage adapter', log_1.LogLevel.debug);
        return this.storageAdapter.removeItem(key);
    };
    KvStorage.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.storageAdapter) {
                    return [2 /*return*/, Promise.reject('No adapter configured!')];
                }
                (0, log_1.log)(this.constructor.name, 'Calling clear() on storage adapter', log_1.LogLevel.debug);
                return [2 /*return*/, this.storageAdapter.clear()];
            });
        });
    };
    return KvStorage;
}());
exports.KvStorage = KvStorage;
//# sourceMappingURL=h5-kv-storage.js.map