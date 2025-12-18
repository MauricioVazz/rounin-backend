import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authenticate = async (email, password) => {
    // Busca usuário ativo
    const user = await prisma.user.findFirst({
        where: {
            email,
            deletedAt: null
        }
    });

    if (!user) {
        const err = new Error("Credenciais inválidas");
        err.code = "INVALID_CREDENTIALS";
        throw err;
    }

    // Verifica senha PRIMEIRO (segurança)
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        const err = new Error("Credenciais inválidas");
        err.code = "INVALID_CREDENTIALS";
        throw err;
    }

    // Verifica status DEPOIS da senha
    if (user.status !== "ACTIVE") {
        const err = new Error("Conta inativa");
        err.code = "ACCOUNT_INACTIVE";
        throw err;
    }

    // Retorna usuário completo (controller decide o que expor)
    return user;
};