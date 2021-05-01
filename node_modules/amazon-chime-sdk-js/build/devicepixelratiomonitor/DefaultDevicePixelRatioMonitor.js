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
class DefaultDevicePixelRatioMonitor {
    constructor(devicePixelRatioSource, logger) {
        this.devicePixelRatioSource = devicePixelRatioSource;
        this.observerQueue = new Set();
        this.mediaQueryListener = () => {
            this.observerQueue.forEach(tileObserver => {
                tileObserver.devicePixelRatioChanged(this.devicePixelRatioSource.devicePixelRatio());
            });
        };
        if (typeof window === 'undefined') {
            return;
        }
        const mediaQueryList = matchMedia(`(resolution: ${this.devicePixelRatioSource.devicePixelRatio()}dppx)`);
        if (typeof mediaQueryList.addEventListener === 'function') {
            mediaQueryList.addEventListener('change', this.mediaQueryListener);
            this.mediaQueryList = mediaQueryList;
        }
        else if (typeof mediaQueryList.addListener === 'function') {
            mediaQueryList.addListener(this.mediaQueryListener);
            this.mediaQueryList = mediaQueryList;
        }
        else {
            logger.warn('ignoring DefaultDevicePixelRatioMonitor');
        }
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.mediaQueryList) {
                if (typeof this.mediaQueryList.addEventListener === 'function') {
                    this.mediaQueryList.removeEventListener('change', this.mediaQueryListener);
                }
                else {
                    this.mediaQueryList.removeListener(this.mediaQueryListener);
                }
            }
            delete this.mediaQueryListener;
            this.observerQueue.clear();
        });
    }
    registerObserver(observer) {
        this.observerQueue.add(observer);
        observer.devicePixelRatioChanged(this.devicePixelRatioSource.devicePixelRatio());
    }
    removeObserver(observer) {
        this.observerQueue.delete(observer);
    }
}
exports.default = DefaultDevicePixelRatioMonitor;
//# sourceMappingURL=DefaultDevicePixelRatioMonitor.js.map