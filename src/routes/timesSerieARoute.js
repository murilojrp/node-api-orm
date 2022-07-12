import { Router } from 'express';
import { isAuthenticated } from '../utils/isAuthenticated';
const timesSerieA = require('../controllers/timesSerieA.controller');
const router = Router();

router.get('/:id', timesSerieA.getTimesSerieA);
router.post('/create', timesSerieA.createTimesSerieA);
router.post('/delete',isAuthenticated, timesSerieA.deleteTimesSerieA);
router.post('/update/:id', timesSerieA.updateTimesSerieA);

export default router;
