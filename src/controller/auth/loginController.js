import * as z from "zod";
import { authenticate } from "../../model/authModel.js";
import { generateToken } from "../../utils/jwt.js";

// Validação de entrada (HTTP)
const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha inválida")
});

export const loginController = async (req, res) => {
    try {
        // Valida input
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                success: false,
                message: "Dados inválidos",
                errors: parsed.error.flatten().fieldErrors
            });
        }

        const { email, password } = parsed.data;

        // Regra de negócio
        const user = await authenticate(email, password);

        // Infra
        const token = generateToken(user);

        // Resposta HTTP
        return res.status(200).json({
            success: true,
            token,
            user: {
                publicId: user.publicId,
                username: user.username,
                role: user.role
            }
        });

    } catch (error) {
        if (error.code === "INVALID_CREDENTIALS") {
            return res.status(401).json({
                success: false,
                message: "Email ou senha inválidos"
            });
        }

        if (error.code === "ACCOUNT_INACTIVE") {
            return res.status(403).json({
                success: false,
                message: "Conta inativa"
            });
        }

        console.error("loginController:", error);
        return res.status(500).json({
            success: false,
            message: "Erro interno do servidor"
        });
    }
};
