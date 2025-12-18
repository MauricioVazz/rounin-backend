import { updateUser, validateUser } from "../../model/userModel.js";

export const updateUserController = async (req, res) => {
  try {
    const { identifier } = req.params;
    const payload = req.body;

    // Validação parcial (PATCH)
    const validation = validateUser(payload, true);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Dados inválidos",
        errors: validation.errors
      });
    }

    const user = await updateUser(
      isNaN(identifier) ? identifier : Number(identifier),
      validation.data
    );

    return res.status(200).json({
      success: true,
      message: "Usuário atualizado com sucesso",
      data: user
    });
  } catch (error) {
    console.error("updateUserController error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado"
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Username ou email já em uso"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao atualizar usuário"
    });
  }
};
