'use strict';

import express from "express";
import userController from '../controllers/user.js';
const router = express.Router();

router.get('/', userController.addPost)

export default router;