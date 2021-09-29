export const incorrectFormat = (data: any, code: string) => {
    return {
        error: true,
        code: code,
        message: "Le format est incorrecte :"+data
    }
}

export const incorrectFormatPassword = (code: string) => {
    return {
        error: true,
        code: code,
        message: "Les 2 mot de passe ne dont pas identique"
    }
}


export const compteLocker = (code: string) => {
    return {
        error: true,
        code: code,
        message: "Votre compte à été bloquer temporairement"
    }
}

export const LoginPassword = (code: string) => {
    return {
        error: true,
        code: code,
        message: "email/password incorrecte"
    }
}

export const ErrorServer = (code: string) => {
    return {
        error: true,
        code: code,
        message: "Error server"
    }
}