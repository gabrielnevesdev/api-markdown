import { Router } from 'express';
import Editorcontroller from '../controllers/editorController';
import multerConfig from '../config/multer';
import multer from 'multer';

const router = new Router();

router.post('/', multer(multerConfig).single('file'),Editorcontroller.index);

export default router