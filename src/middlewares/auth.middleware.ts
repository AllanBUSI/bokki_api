import { IAuthForgotPasswordInterfaces, IAuthLoginInterfaces, IAuthNewPasswordInterfaces, IAuthRegisterInterfaces } from "@interfaces/auth.interfaces";
import { incorrectFormat, incorrectFormatPassword, LoginPassword } from "@utils/functionError";
import { isAlphaNumeric, isEmail } from "@utils/functionTool";
import { Request,Response,NextFunction } from "express";
import { isExisted, isPassword } from '../utils/functionTool';


export const authLoginMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const body = req.body as IAuthLoginInterfaces;
    
    if (isExisted(body.email) === false || isEmail(body.email) === false || body.email.length >= 100 || body.email.length <= 5) 
        return res.status(409).json(incorrectFormat("email", "auth:error:01"))
    
    if (isExisted(body.password) === false || body.password.length >= 100 || body.password.length <= 5) 
        return res.status(409).json(LoginPassword( "auth:error:02"))
    
    next()
}

export const authForgotPasswordMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const body = req.body as IAuthForgotPasswordInterfaces;
    
    if (isExisted(body.email) === false || isEmail(body.email) === false || body.email.length >= 100 || body.email.length <= 5) 
        return res.status(409).json(incorrectFormat("email", "auth:error:01"))
    
    next()
}

export const authNewPasswordMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const body = req.body as IAuthNewPasswordInterfaces;

    if(isExisted(body.token) === false || isAlphaNumeric(body.token) === false || body.token?.length >= 255 || body.token?.length <= 3)
        return res.status(409).json(incorrectFormat("username", "auth:error:01"))

    if(isExisted(body.password) === false || isPassword(body.password) === false || body.password.length <= 10 || body.password.length >= 100)
        return res.status(409).json(incorrectFormat("firstname", "auth:error:02"))
    
    if(body.password !== body.password_confirm)
        return res.status(409).json(incorrectFormatPassword("auth:error:06"))

    next()
}

export const authRegisterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as IAuthRegisterInterfaces;

    if(isExisted(body.username) === false || isAlphaNumeric(body.username) === false || body.username?.length >= 255 || body.username?.length <= 3)
        return res.status(409).json(incorrectFormat("username", "auth:error:01"))
    
    if(isExisted(body.name) === false || isAlphaNumeric(body.name) === false || body.name?.length >= 255 || body.name?.length <= 2)
        return res.status(409).json(incorrectFormat("name", "auth:error:02"))
    
    if(isExisted(body.firstname) === false || isAlphaNumeric(body.firstname) === false || body.firstname?.length >= 255)
        return res.status(409).json(incorrectFormat("firstname", "auth:error:03"))
    
    if(isExisted(body.email) === false || isEmail(body.email) === false || body.email.length >= 85 || body.email.length <= 5)
        return res.status(409).json(incorrectFormat("firstname", "auth:error:04"))
    
    if(isExisted(body.password) === false || isPassword(body.password) === false || body.password.length <= 10 || body.password.length >= 100)
        return res.status(409).json(incorrectFormat("firstname", "auth:error:05"))
    
    if(body.password !== body.password_confirm)
        return res.status(409).json(incorrectFormatPassword("auth:error:06"))
    
    return next();
}