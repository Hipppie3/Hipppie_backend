import express from 'express';
import {createPlayer, getAllPlayer} from '../controllers/playerController.js';


const router = express.Router();

router.get('/', getAllPlayer);
router.post('/createPlayer', createPlayer);

export default router;