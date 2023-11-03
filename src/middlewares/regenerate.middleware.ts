import { NextFunction, Request, Response } from "express";

export const regenerate = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session){
        req.session = {};
    }

    if (!req.session.regenerate) {
        req.session.regenerate = (cb: any) => {
            cb();
        };
    }

    if (!req.session.save) {
        req.session.save = (cb: any) => {
            cb();
        };
    }
    next();
};