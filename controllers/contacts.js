import { getDatabase } from '../database.js';
import { ObjectId } from 'mongodb';

const getAllContacts = async (req, res) => {
    try {
        const db = getDatabase();

        const contacts = await db.collection('contacts').find().toArray();

        res.status(200).json(contacts);

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving contacts',
            error: error.message
        });
    }
};

const getContactById = async (req, res) => {
    try {
        const db = getDatabase();
        const contactId = req.query.id; // recupere l'id dans url query params

        if (!ObjectId.isValid(contactId)) {
            return res.status(400).json({ message: 'Invalid contact ID' });
        }

        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(contactId) });

        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    }
    
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving contact',
            error: error.message
        });
    }
}

const getContactPage = async (req, res) => {
    try {
        const db = getDatabase();
        const contacts = await db.collection('contacts').find()
        .toArray();
        res.render('contacts', { contacts });

    }
    catch (error) {
        res.status(500).json({
            message: 'Error retrieving contact',
            error: error.message
        });
    }

}
//  Créer un nouveau contact
const createContact = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        // Vérifier que tous les champs sont remplis
        if (
            !firstName ||
            !lastName ||
            !email ||
            !favoriteColor ||
            !birthday
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const db = getDatabase();

        // Insérer le nouveau contact
        const result = await db.collection('contacts').insertOne({
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        });

        // Retourner le nouvel identifiant
        return res.status(201).json({
            contactId: result.insertedId
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Error creating contact'
        });
    }
};

//  Modifier un contact 
const updateContact = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid contact ID'
            });
        }

        const {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !favoriteColor ||
            !birthday
        ) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const db = getDatabase();

        const result = await db.collection('contacts').updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    firstName,
                    lastName,
                    email,
                    favoriteColor,
                    birthday
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        return res.status(204).send();

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Error updating contact'
        });
    }
};

// supprimer un contact 
const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: 'Invalid contact ID'
            });
        }

        const db = getDatabase();

        const result = await db.collection('contacts').deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'Contact not found'
            });
        }

        return res.status(200).json({
            message: 'Contact deleted successfully'
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Error deleting contact'
        });
    }
};

export { getAllContacts, getContactById, getContactPage, createContact, updateContact, deleteContact };

// Code	Explication
// getDatabase()	Récupère notre base MongoDB
// collection('contacts')	Sélectionne la collection contacts
// find()	Recherche les documents
// toArray()	Transforme les résultats en tableau
// res.json()	Renvoie les données au client au format JSON
//ObjectId.isValid(id)	Vérifie si l'identifiant a un format valide ,new ObjectId(id)	Convertit le texte en identifiant MongoDB