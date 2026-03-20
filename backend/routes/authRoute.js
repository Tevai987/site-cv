import express from 'express';
import {register, login} from '../controllers/authController.js';
import {updateUser} from '../controllers/authController.js';

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', updateUser);

export default router;
