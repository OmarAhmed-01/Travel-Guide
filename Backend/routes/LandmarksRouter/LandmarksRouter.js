import express from 'express';
import multer from 'multer';
import { fetchLandmark, postLandmark, updateLandmark, deleteLandmark } from '../../controllers/Landmarks_Controller.js';

const LandmarksRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage: storage});

LandmarksRouter.get('/get-landmarks', fetchLandmark);
LandmarksRouter.post('/add-landmarks', upload.fields([{name: 'image'}]), postLandmark);
LandmarksRouter.put('/update-landmarks/:id', upload.fields([{name: 'image'}]), updateLandmark);
LandmarksRouter.delete('/delete-landmarks/:id', deleteLandmark);


export default LandmarksRouter;