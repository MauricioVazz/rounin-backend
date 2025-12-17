import { getAllUsers } from "../model/userModel.js";

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      success: true,
      message: "Usuários listados com sucesso",
      data: users
    });
  } catch (error) {
    console.error("getAllUsersController error:", error);

    return res.status(500).json({
      success: false,
      message: "Erro ao listar usuários"
    });
  }
};
