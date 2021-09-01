import express from 'express';
import { addPedido, getPedido } from '../controllers/pedido.controller';

const router = express.Router();

router.post('/addPostit', addPedido);
router.get('/getPostits', getPedido);

export default router;