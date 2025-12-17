import { getUser } from "../model/userModel.js";

export const getUserController = async (req, res) => {
    try {
        const { identifier } = req.params;

        // Decide se é id numérico ou publicId
        const parsedIdentifier = Number.isNaN(Number(identifier))
            ? identifier
            : Number(identifier);

        const user = await getUser(parsedIdentifier);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error("getUserController error:", error);

        return res.status(500).json({
            success: false,
            message: "Erro ao buscar usuário"
        });
    }
};
