import { Router } from 'express';
import * as orderControllers from '../controllers/orders.controllers';
import auth from '../middleware/auth';
const router = Router();

router.route('/newOrder').post(auth, orderControllers.create);
router.route('/:id').get(auth, orderControllers.getOne);
router.route('/delete/:id').delete(auth, orderControllers.deleteOrder);

export { router as ordersRouter };
