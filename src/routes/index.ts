import { categories as categoriesRoutes } from "./categories";

import { Router } from "express";

const router: Router = Router();

router.use("/products/categories", categoriesRoutes);

export { router };
