import express from 'express';
import { createUserController } from '../controller/users/createUserController.js';
import { getUserController } from '../controller/users/getUserController.js';
import { getAllUsersController } from '../controller/users/getAllUsersController.js';
import { updateUserController } from '../controller/users/updateUserController.js';
import { deleteUserController } from '../controller/users/deleteUserController.js';

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