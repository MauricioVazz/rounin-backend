import express from 'express';
import { createUserController } from '../controller/createUserController.js';
import { getUserController } from '../controller/getUserController.js';
import { getAllUsersController } from '../controller/getAllUsersController.js';
import { updateUserController } from '../controller/updateUserController.js';
import { deleteUserController } from '../controller/deleteUserController.js';

const router = express.Router();

// Rota para criar um novo usuário
router.post('/', createUserController);
// Rota para obter um usuário por ID ou publicId
router.get('/:identifier', getUserController);
// Rota para obter todos os usuários
router.get('/', getAllUsersController);
// Rota para atualizar um usuário por ID ou publicId
router.patch('/:identifier', updateUserController);
// Rota para deletar um usuário por ID ou publicId
router.delete('/:identifier', deleteUserController);

export default router;