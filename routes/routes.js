import express from "express"
import {consultaTalleres, registrarInscripcion} from "../controllers/controller.js"

const router = express.Router()

router.post("/", registrarInscripcion)
router.get("/", consultaTalleres)



export default router