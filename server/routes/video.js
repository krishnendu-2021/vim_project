import express from "express";
import {
  addVedio,
  deleteVedio,
  getVedio,
  random,
  search,
  sub,
  getBytags,
  trend,
  updateVedio,
  view,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

router.post("/", verifyToken, addVedio);
router.get("/find/:id", getVedio);
router.put("/:id", verifyToken, updateVedio);
router.delete("/:id", verifyToken, deleteVedio);
router.put("/view/:id", view);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", getBytags);
router.get("/search", search);

export default router;
