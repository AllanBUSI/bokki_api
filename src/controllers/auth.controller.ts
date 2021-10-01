import { CompteCreer, Connect } from "@utils/functionSuccess";
import { Response, Request } from "express";
import { IAuthForgotPasswordInterfaces, IAuthLoginInterfaces, IAuthNewPasswordInterfaces, IAuthRegisterInterfaces } from '../interfaces/auth.interfaces';
import { UserRepository } from "src/repository/UserRepository";
import databaseManager from "src/Database";
import { User } from "@entities/User";
import argon2  from "argon2";
import { isEmailExist, isUsernameExist } from "@utils/functionError";

export const authLoginController = (req: Request, res: Response) => {
    const body = req.body as IAuthLoginInterfaces;
    return res.status(200).json(Connect("auth:success:1"))
}

export const authRegisterController = async (req: Request, res: Response) => {
    const body = req.body as IAuthRegisterInterfaces;

    const db = await databaseManager.getManager()

    const email = await db.getRepository(User).find({
        email:body.email
    })

    const username = await db.getRepository(User).find({
        username:body.username
    })

    if (username.length === 1) {
        return res.status(200).json(isUsernameExist("auth:error:07"))
    }

    if (email.length === 1) {
        return res.status(200).json(isEmailExist("auth:error:0"))
    }

    const hash = await argon2.hash(body.password);
    
    const user = new UserRepository(); 
    user.InsertUser(
        {
            username: body.username,
            name: body.name,
            firstname: body.firstname,
            password: hash,
            email: body.email
        }
    )

    return res.status(200).json(CompteCreer("auth:success:1"))
}

export const authForgotPasswordController = (req:Request, res:Response) => {
    const body = req.body as IAuthForgotPasswordInterfaces;
    return res.status(200).json(Connect("auth:success:1"))
}

export const authNewPasswordController = (req:Request, res:Response) => {
    const body = req.body as IAuthNewPasswordInterfaces;
    return res.status(200).json(Connect("auth:success:1"))
}



