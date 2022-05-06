import { Router } from 'express';
import Editorcontroller from '../controllers/editorController';

const router = new Router();

router.get('/', Editorcontroller.index);

export default router