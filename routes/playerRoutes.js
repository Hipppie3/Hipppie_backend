import express from 'express';
import {createPlayer, getAllPlayer, getPlayer} from '../controllers/playerController.js';


const router = express.Router();

router.post('/createPlayer', createPlayer);
router.get('/', getAllPlayer);
router.get('/:id', getPlayer)


export default router;