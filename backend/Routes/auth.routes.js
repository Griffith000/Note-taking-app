import express from 'express';
import {test,login,signUp,getUser} from '../contollers/auth.contoller.js';
import {authenticateToken} from '../middleware/auth.token.js';


const router = express.Router();

router.get('/test', test);
router.post('/signup', signUp);
router.post('/login', login);
router.get("/get-user",authenticateToken, getUser);

export default router;