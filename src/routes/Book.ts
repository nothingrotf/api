import express from "express";
import controller from "../controllers/book";

const router = express.Router();

router.post("/books", controller.createBook);
router.get("/books/:bookId", controller.readBook);
router.get("/books", controller.readAll);
router.patch("/books/:bookId", controller.updateBook);
router.delete("/books/:bookId", controller.deleteBook);

export default router;