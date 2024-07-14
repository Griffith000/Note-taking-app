import express from 'express';
import {test,login,signUp} from '../contollers/auth.contoller.js';

const router = express.Router();

router.get('/test', test);
router.post('/signup', signUp);
router.post('/login', login);

export default router;