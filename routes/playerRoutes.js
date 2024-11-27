import express from 'express';
import {createPlayer, getAllPlayer, getPlayer, updatePlayer, deletePlayer} from '../controllers/playerController.js';


const router = express.Router();

router.post('/createPlayer', createPlayer);
router.get('/', getAllPlayer);
router.get('/:id', getPlayer);
router.put('/:id', updatePlayer);
router.delete('/:id', deletePlayer)


export default router; 