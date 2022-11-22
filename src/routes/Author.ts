import express from "express";
import controller from "../controllers/author";

const router = express.Router();

router.post("/authors", controller.createAuthor);
router.get("/authors/:authorId", controller.readAuthor);
router.get("/authors", controller.readAll);
router.patch("/authors/:authorId", controller.updateAuthor);
router.delete("/authors/:authorId", controller.deleteAuthor);

export default router;