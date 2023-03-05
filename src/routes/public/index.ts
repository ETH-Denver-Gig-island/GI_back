import * as express from 'express';
import authController from "../../controllers/authController";
const router = express.Router();

router.post('/signup', authController.signUp);

// router.get('/login', authController.login);

export default router;