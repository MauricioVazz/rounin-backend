import { createUser } from "../model/userModel.js";
import bcrypt from "bcrypt";

export const createUserController = async (req, res) => {
    try {
        const userData = req.body;

        // Hash da senha (regra técnica do controller)
        const saltRounds = 10;
        userData.password = await bcrypt.hash(userData.password, saltRounds);

        // Criação do usuário (regra de negócio no model)
        const user = await createUser(userData);

        return res.status(201).json({
            success: true,
            message: "Usuário criado com sucesso",
            data: user
        });

    } catch (error) {

        // Conta deletada (soft delete)
        if (error.code === "ACCOUNT_DELETED") {
            return res.status(409).json({
                success: false,
                message: "Conta desativada. Deseja reativar?",
                publicId: error.publicId
            });
        }

        // Email já em uso
        if (error.code === "EMAIL_IN_USE") {
            return res.status(409).json({
                success: false,
                message: "Email já está em uso"
            });
        }

        // Erros de validação (Zod)
        if (error.details) {
            return res.status(400).json({
                success: false,
                message: "Erro de validação",
                errors: error.details
            });
        }

        // Erro inesperado
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor"
        });
    }
};
