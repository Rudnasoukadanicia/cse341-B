import express from 'express'

import { namePage } from './contollers/home.js' 

const router = express.Router();

router.get('/', namePage);

export default router;