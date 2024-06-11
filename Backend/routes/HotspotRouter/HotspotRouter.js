import express from 'express'
import multer from 'multer';
import { deleteHotspot, fetchHotspot, postHotspot, updateHotspot } from '../../controllers/Hotspot_Controller.js';

const HotspotRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage: storage});

HotspotRouter.get('/get-hotspot', fetchHotspot);
HotspotRouter.post('/add-hotspot', upload.single("image"), postHotspot);
HotspotRouter.put('/update-hotspot/:id', upload.single("image"), updateHotspot);
HotspotRouter.delete('/delete-hotspot/:id', deleteHotspot);

export default HotspotRouter;
