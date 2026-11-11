import express from 'express';

import {
    getAllContacts,
    getContactById,
    getContactPage,
    createContact,
    updateContact,
    deleteContact,
} from '../controllers/contacts.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/contact', getContactById);
router.get('/page', getContactPage);
router.post('/', createContact);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

export default router;
