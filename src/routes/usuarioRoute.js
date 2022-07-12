import { Router } from 'express';
const usuario = require('../controllers/usuario.controller');
const router = Router();

router.get('/:id', usuario.getUsuario);
router.post('/create', usuario.createUsuario);
router.post('/delete', usuario.deleteUsuario);
router.post('/update/:id', usuario.updateUsuario);

export default router;
