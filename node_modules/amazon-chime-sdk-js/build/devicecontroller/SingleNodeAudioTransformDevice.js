"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class simplifies the process of defining a transform device that
 * does not modify its input device constraints, and provides only a single audio node
 * to apply transforms.
 *
 * Subclass `SingleNodeAudioTransformDevice`, implementing `createSingleAudioNode`.
 */
class SingleNodeAudioTransformDevice {
    constructor(inner) {
        this.inner = inner;
    }
    mute(_muted) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    /**
     * `stop` should be called by the application to free any resources associated
     * with the device (e.g., workers).
     *
     * After this is called, the device should be discarded.
     */
    stop() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.node) === null || _a === void 0 ? void 0 : _a.disconnect();
        });
    }
    /**
     * Return the inner {@link Device} that the device controller should select as part
     * of the application of this `AudioTransformDevice`.
     */
    intrinsicDevice() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.inner;
        });
    }
    /**
     * Optionally return a pair of `AudioNode`s that should be connected to the applied inner
     * device. The two nodes can be the same, indicating the smallest possible subgraph.
     *
     * @param context The `AudioContext` to use when instantiating the nodes.
     */
    createAudioNode(context) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.node) === null || _a === void 0 ? void 0 : _a.disconnect();
            this.node = yield this.createSingleAudioNode(context);
            return {
                start: this.node,
                end: this.node,
            };
        });
    }
}
exports.default = SingleNodeAudioTransformDevice;
//# sourceMappingURL=SingleNodeAudioTransformDevice.js.map