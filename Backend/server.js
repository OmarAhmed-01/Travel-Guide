import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import bodyParser from 'body-parser';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { connectDB } from './config/database.js';
import Landmark_Model from './models/landmarksModels.js';
import Hotspot_Model from './models/Hotspots.js';
import Nation_Model from './models/Nations.js';
import City_Model from './models/Cities.js';
import CitiesRouter from './routes/CitiesRouter/CitiesRouter.js';
import HotspotRouter from './routes/HotspotRouter/HotspotRouter.js';
import NationsRouter from './routes/NationsRouter/NationsRouter.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors());
app.use("/images", express.static("uploads"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connectDB();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage: storage});

app.get('/', (req, res) => {
    res.json('Hello World');
});

//api endpoints
app.use('/api/city', CitiesRouter);
app.use('/api/hotspot', HotspotRouter);
app.use('/api/nations', NationsRouter);

app.put('/api/landmarks/photos/:id', upload.array('images', 4), async(req, res) => {
    try {
        const Landmark_ID = req.params.id;
        const newImages = req.files.map(file => path.basename(file.path));
        const result  = await Landmark_Model.findByIdAndUpdate({_id: Landmark_ID}, {$push: {image: {$each: newImages}}});
        res.json({success: true, message: "Updated Successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error Updating"});
    }
});

//Update landmarks database with added photos
app.put('/api/landmarks/:id', async(req, res) => {
    try {
        const Landmark_ID = req.params.id;
        const result = await Landmark_Model.findByIdAndUpdate({_id: Landmark_ID}, req.body);
        res.status(200).json({success: true, message: "Updated Successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Updating"});
    }
});

//Return the landmarks
app.get('/api/landmarks', async(req, res) => {
    try {
        const response = await Landmark_Model.find();
        res.json({success: true, message: "Fetch Landmarks Successfully", data: response});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error Fetching Landmarks"});    
    }
});

//Inserting landmarks in the database
app.post('/api/landmarks', async(req, res) => {
    const Landmark = new Landmark_Model(req.body);
    try {
        await Landmark.save();
        res.json({success: true, message: "Landmark Added", Landmark: Landmark});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error Posting Landmark"});
    }
});

//deleting the landmark from the database
app.delete('/api/landmarks/delete/:id', async(req, res) => {
    try {
        const Landmark_ID = req.params.id;
        const landmarks = await Landmark_Model.findById({_id: Landmark_ID});
        if(!landmarks){
            return res.status(404).json({success: false, message: "Landmark not found"});
        }
        else{
            landmarks.image.forEach(imagePath => {
                const filePath = path.join(__dirname, imagePath);
                fs.unlink(filePath, (err) => {
                    if(err){
                        console.log(`Failed to delete image: ${filePath}`, err);
                    }
                });
            });
            res.json({success: true, message: "Item deleted"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Failed to delete item"});    
    }
});
//========================================================================//
//Nations
app.post('/api/nations', upload.single('image'), async(req, res) => {
    let image_file = req.file.filename;
    const galleryFiles = req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : [];

    const Nations = new Nation_Model({
        name: req.body.name,
        desc: req.body.desc,
        img: image_file,
        capital: req.body.capital,
        currency: req.body.currency,
        timezone: req.body.timezone,
        paragraphs: {
            p1: re.body.p1,
            p2: req.body.p2,
        },
        gallery: galleryFiles,
    });
    try {
        await Nations.save();
        res.status(200).json({success: true, message: "Nation Added"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Adding Nation"});
    }
})

app.get('/api/nations', async(req, res) => {
    try {
        const response = await Nation_Model.find({});
        res.status(200).json({success: true, message: "Fetched Nation", Nations: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Fetching Nations"});
    }
});

app.put('/api/nations/edit/:id', upload.array('image', 4), async(req, res) => {
    try {
        const nation_id = req.params.id;
        const newImages = req.files.map(file => path.basename(file.path));
        const updateData = {
            ...req.body, // Body fields
            $push: { gallery: { $each: newImages } } // New images
        };
        const result = await Nation_Model.findByIdAndUpdate({_id: nation_id}, updateData, { new: true });
        res.status(200).json({success: true, message: "Updated Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Updating"});
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});


