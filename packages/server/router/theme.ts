import { Router } from 'express';
import { ThemeController } from '../controllers/Theme';

const router = Router();

router.get('/get/:user_id', ThemeController.getTheme);
router.post('/create/', ThemeController.postTheme);

export default router;
