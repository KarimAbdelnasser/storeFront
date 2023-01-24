import { Router } from 'express';
import * as productControllers from '../controllers/products.controllers';
import auth from '../middleware/auth';
const router = Router();

router.route('/newProd').post(auth, productControllers.create);
router.route('/all').get(productControllers.getAll);
router.route('/:id').get(productControllers.getOne);
router.route('/update').put(auth, productControllers.update);
router.route('/delete/:id').delete(auth, productControllers.deleteProduct);

export { router as productsRouter };
