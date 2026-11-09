import express from 'express';
import { namePage } from './controllers/home.js';
import contactsRoutes from './routes/contacts.js';

const router = express.Router();

router.get('/', namePage);
router.use('/contacts', contactsRoutes);

export default router;