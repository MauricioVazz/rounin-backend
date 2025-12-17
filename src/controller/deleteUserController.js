import { deleteUser } from "../model/userModel.js";

export const deleteUserController = async (req, res) => {
  try {
    const { identifier } = req.params;

    const user = await deleteUser(
      isNaN(identifier) ? identifier : Number(identifier)
    );

    return res.status(200).json({
      success: true,
      message: "Usuário removido com sucesso",
      data: user
    });
  } catch (error) {
    console.error("deleteUserController error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao remover usuário"
    });
  }
};
