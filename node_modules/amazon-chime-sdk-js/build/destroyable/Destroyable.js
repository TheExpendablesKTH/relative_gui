"use strict";
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDestroyable = void 0;
/**
 * Type guard for `Destroyable`.
 *
 * @param x A value that might implement the `Destroyable` interface.
 * @returns Whether the value implements `Destroyable`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDestroyable(x) {
    return x && 'destroy' in x;
}
exports.isDestroyable = isDestroyable;
//# sourceMappingURL=Destroyable.js.map