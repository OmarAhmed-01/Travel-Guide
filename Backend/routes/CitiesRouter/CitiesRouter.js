import express from 'express';
import multer from 'multer';
import { deleteCity, fetchCity, postCity, updateCity } from '../../controllers/City_Controller.js';

const CitiesRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage: storage});

CitiesRouter.get('/get-city', fetchCity);
CitiesRouter.post('/add-city', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'map', maxCount: 1 }, { name: 'gallery' }]), postCity);
CitiesRouter.put('/update-city/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'map', maxCount: 1 }, { name: 'gallery' }]), updateCity);
CitiesRouter.delete('/delete-city/:id', deleteCity);

export default CitiesRouter;