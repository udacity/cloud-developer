import {Router} from "express";
import {ImageFilterRouter} from "./filter/routes/filter.router";

const router: Router = Router();

router.use("/", ImageFilterRouter);

export const IndexRouter: Router = router;
