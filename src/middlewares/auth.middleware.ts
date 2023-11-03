import { NextFunction, Request, Response } from "express";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        res.status(301).redirect('/login');
    }

    next();
};