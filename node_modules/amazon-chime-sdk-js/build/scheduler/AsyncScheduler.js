"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
const TimeoutScheduler_1 = require("./TimeoutScheduler");
/**
 * [[AsyncScheduler]] enqueues the callback for the soonest available run of the
 * event loop.
 */
class AsyncScheduler extends TimeoutScheduler_1.default {
    constructor() {
        super(0);
    }
    /**
     * Execute the provided callback on the next tick of the event loop.
     * This is semantically equivalent to
     *
     * ```typescript
     * new AsyncScheduler(callback).start();
     * ```
     *
     * but with less overhead.
     *
     * @param callback the code to run.
     */
    static nextTick(callback) {
        setTimeout(callback, 0);
    }
}
exports.default = AsyncScheduler;
//# sourceMappingURL=AsyncScheduler.js.map