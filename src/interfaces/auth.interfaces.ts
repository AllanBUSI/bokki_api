export interface IAuthLoginInterfaces {
    email: string;
    password: string;
}

export interface IAuthRegisterInterfaces {
    name:string;
    firstname: string;
    email: string;
    username: string;
    password: string;
    password_confirm: string;
}

export interface IAuthForgotPasswordInterfaces {
    email: string;
}

export interface IAuthNewPasswordInterfaces {
    token: string;
    password: string;
    password_confirm: string;
}

