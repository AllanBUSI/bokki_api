import { Connect } from "@utils/functionSuccess";
import { Response, Request } from "express";

export const authLoginController = (req: Request, res: Response) => {
    return res.status(200).json(Connect("auth:success:1"))
}

export const authRegisterController = (req: Request, res: Response) => {
    return res.status(200).json(Connect("auth:success:1"))
}

export const authForgotPasswordController = (req:Request, res:Response) => {
    return res.status(200).json(Connect("auth:success:1"))
}

export const authNewPasswordMiddleware = (req:Request, res:Response) => {
    return res.status(200).json(Connect("auth:success:1"))
}


