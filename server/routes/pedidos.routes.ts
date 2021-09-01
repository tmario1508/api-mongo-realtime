import express from 'express';
import { addPedido, getPedido } from '../controllers/pedido.controller';

const router = express.Router();

router.post('/addPedido', addPedido);
router.get('/getPedido', getPedido);

export default router;