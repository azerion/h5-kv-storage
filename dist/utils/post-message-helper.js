"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMessageHelper = void 0;
var adapters_1 = require("../adapters");
var PostMessageHelper = /** @class */ (function () {
    function PostMessageHelper(namespace) {
        if (namespace === void 0) { namespace = 'kvs'; }
        this.namespace = namespace;
        this.adapter = new adapters_1.LocalStorage();
    }
    PostMessageHelper.prototype.setAdapter = function (adapter) {
        this.adapter = adapter;
    };
    return PostMessageHelper;
}());
exports.PostMessageHelper = PostMessageHelper;
//# sourceMappingURL=post-message-helper.js.map