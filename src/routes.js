const express = require('express');
const router = express.Router();
const AuthController = require('./infrastructure/http/controllers/auth.controller');
const UserController = require('./infrastructure/http/controllers/user.controller');
const AuthService = require('./application/services/auth/authService');
const UserService = require('./application/services/user/userService');
const UserRepository = require('./infrastructure/repositories/user/userRepository');

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const userService = new UserService(userRepository);

const authController = new AuthController(authService);
const userController = new UserController(userService);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;