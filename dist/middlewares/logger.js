"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Cookies : ', req.cookies);
    next();
};
exports.logger = logger;
