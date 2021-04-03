import { Router, Request, Response } from 'express';
import { ImageFilter } from './image-filter/routes/image-filter.router';

const router: Router = Router();

router.use('/', ImageFilter);

export const IndexRouter: Router = router;