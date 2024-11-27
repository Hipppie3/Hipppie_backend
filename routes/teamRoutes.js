import express from 'express';
import {createTeam, getAllTeam, getTeam, updateTeam, deleteTeam} from '../controllers/teamController.js';


const router = express.Router();

router.post('/createTeam', createTeam)
router.get('/', getAllTeam)
router.get('/:id', getTeam)
router.put('/:id', updateTeam)
router.delete('/:id', deleteTeam)



export default router;