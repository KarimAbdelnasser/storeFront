import { Router } from 'express';
import * as userControllers from '../controllers/users.controllers';
import auth from '../middleware/auth';
const router = Router();

router.route('/').post(userControllers.create);
router.route('/me').get(auth, userControllers.getUser);
router.route('/update').put(auth, userControllers.update);
router.route('/delete').delete(auth, userControllers.deleteUser);

export { router as usersRouter };
