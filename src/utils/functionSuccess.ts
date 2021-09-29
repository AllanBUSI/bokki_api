export const Connect = (code: string) => {
    return {
        error: false,
        code: code,
        message: "Vous êtes maintenant connecter"
    }
}

export const Deconnecter = (code: string) => {
    return {
        error: false,
        code: code,
        message: "Vous êtes maintenant déconnecter"
    }
}

export const PasswordForget = (code: string) => {
    return {
        error: false,
        code: code,
        message: "un mot de passe vous as été envoyer par email"
    }
}