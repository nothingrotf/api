import express from "express";
import controller from "../controllers/publisher";

const router = express.Router();

router.post("/publishers", controller.createPublisher);
router.get("/publishers/:publisherId", controller.readPublisher);
router.get("/publishers", controller.readAll);
router.patch("/publishers/:publisherId", controller.updatePublisher);
router.delete("/publishers/:publisherId", controller.deletePublisher);

export default router;