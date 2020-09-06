import {NextFunction, Request, Response} from "express";
import {sendError} from "./util/util";
import {config} from "./config/config";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {

    const authorization: string = req.header("Authorization");

    if (!authorization) {
        return sendError(res, 401, "authorization required")
    }

    if (!isKeyAllowed(authorization)) {
        return sendError(res, 401, "invalid api key given")
    }

    next();
}

function isKeyAllowed(authorization: string) {
    return authorization === "Bearer " + config.accessKey;
}