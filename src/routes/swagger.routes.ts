import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swagerrJsDoc from "swagger-jsdoc";

const router: Router = Router();

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swagerrJsDoc));