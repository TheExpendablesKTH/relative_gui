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
const BaseTask_1 = require("./BaseTask");
/*
 * [[SetLocalDescriptionTask]] asynchronously calls [[setLocalDescription]] on peer connection.
 */
class SetLocalDescriptionTask extends BaseTask_1.default {
    constructor(context) {
        super(context.logger);
        this.context = context;
        this.taskName = 'SetLocalDescriptionTask';
    }
    cancel() {
        // Just in case. The baseCancel behavior should prevent this.
        /* istanbul ignore else */
        if (this.cancelPromise) {
            const error = new Error(`canceling ${this.name()}`);
            this.cancelPromise(error);
            delete this.cancelPromise;
        }
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            const peer = this.context.peer;
            const sdpOffer = this.context.sdpOfferInit;
            this.logger.debug(() => {
                return `local description is >>>${sdpOffer.sdp}<<<`;
            });
            yield new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this.cancelPromise = (error) => {
                    reject(error);
                };
                try {
                    yield peer.setLocalDescription(sdpOffer);
                    resolve();
                }
                catch (error) {
                    reject(error);
                }
                finally {
                    delete this.cancelPromise;
                }
            }));
            this.context.logger.info('set local description');
        });
    }
}
exports.default = SetLocalDescriptionTask;
//# sourceMappingURL=SetLocalDescriptionTask.js.map