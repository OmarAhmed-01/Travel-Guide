import express from 'express';
import multer from 'multer';
import { deleteNation, fetchNation, postNation, updateNation } from '../../controllers/Nation_Controller.js';

const NationsRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage: storage});

NationsRouter.get('/get-nations', fetchNation);
NationsRouter.post('/add-nations', upload.fields([{name: 'image', maxCount: 1}, {name: 'gallery'}]), postNation);
NationsRouter.put('/update-nations/:id', upload.fields([{name: 'image', maxCount: 1}, {name: 'gallery'}]), updateNation);
NationsRouter.delete('/delete-nations/:id', deleteNation);

export default NationsRouter;