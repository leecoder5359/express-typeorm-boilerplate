import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception";

export const ValidationMiddleware = (type: any, skipMissingProperties = false, whitelist = false, forbidNonWhitelisted = false) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('body', req.body);
        const dto = plainToInstance(type, req.body);

        try {
            await validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted });
            req.body = dto;
            next();
        } catch (e: any) {
            const message = e.map((error: ValidationError) => Object.values(error.constraints || {})).join("\n");
            next(new HttpException(400, message));
        }
    };
};
