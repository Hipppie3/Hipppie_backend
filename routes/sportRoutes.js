import express from 'express'
import { createSport, getAllSport, getSport, deleteSport } from '../controllers/sportController.js';

const router = express.Router();

router.post('/createSport', createSport);
router.get('/', getAllSport);
router.get('/:id', getSport);
router.delete('/:id', deleteSport);

export default router 