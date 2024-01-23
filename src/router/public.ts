import express from 'express';
import userController from '../controller/userController';

const publicRouter = express.Router();

publicRouter.post('/api/user/register', userController.register)
publicRouter.post('/api/user/login', userController.login)

export default publicRouter