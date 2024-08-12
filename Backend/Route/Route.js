import express, { Router } from "express";
import { UserLogin, UserRegister } from "../Controller/UserController.js";
import { Createproduct, DeleteTask, EditTask, GetAppData, getByIdTask } from "../Controller/ProductController.js";
import { authToken } from "../auth.js";

const router = express.Router();

router.post('/register', UserRegister)
router.post('/login', UserLogin);
router.post('/createProduct', authToken, Createproduct)
router.get('/allList', authToken, GetAppData)
router.put('/edittask/:id', authToken, EditTask);
router.delete('/deleteTask/:id', authToken, DeleteTask)
router.post('/taskById/:id', authToken,  getByIdTask)

export default router;