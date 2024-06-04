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

app.put('/api/landmarks/photos/:id', upload.array('images', 4), async(req, res) => {
    try {
        const Landmark_ID = req.params.id;
        const newImages = req.files.map(file => file.path);
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
//HotSpots
app.post('/api/hotpost/add', upload.single("image"), async(req, res) => {
    let image_filename = `${req.file.filename}`;
    const hotspot = new Hotspot_Model({
        name: req.body.name,
        desc: req.body.desc,
        img: image_filename
    });
    try {
        await hotspot.save();
        res.status(200).json({success: true, message: "Hotspot Added", data: hotspot});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Adding Hotspot"});
    }
});

app.get('/api/hotspot', async(req, res) => {
    try {
        const response = await Hotspot_Model.find({});
        res.status(200).json({success: true, message: "Fetched Hotspots", hotspots: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Fetching Hotspots"});
    }
});

app.delete('/api/hotspot/delete/:id', async(req, res) => {
    try {
        const Hotspot_ID = req.params.id;
        const hotspot = await Hotspot_Model.findById({_id: Hotspot_ID});
        if(!hotspot){
            res.status(404).json({success: false, message: "Hotspot not found"});
        }
        else{
            fs.unlink(`uploads/${hotspot.img}`, () => {});
            await Hotspot_Model.findByIdAndDelete({_id: Hotspot_ID});
            res.status(200).json({success: true, message: "Hotspot Removed"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Removing Hotspot"});
    }
});

app.put('/api/hotspot/image-edit/:id', upload.single('image'), async(req, res) => {
    try {
        const hotspot_id = req.params.id;
        const imgURL = req.file.filename;
        const result  = await Hotspot_Model.findByIdAndUpdate({_id: hotspot_id}, {img: imgURL});
        res.status(200).json({success: true, message: "Images Updated"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Updating Image"});
    }
});
//========================================================================//
//Nations
app.post('/api/nations', upload.single('image'), async(req, res) => {
    let image_file = req.file.filename;
    const Nations = new Nation_Model({
        name: req.body.name,
        desc: req.body.desc,
        img: image_file,
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
})
//========================================================================//
//City
app.post('/api/city', upload.single("image"), async(req, res) => {
    let img_file = req.file.filename;
    const Cities = new City_Model({
        city: req.body.city,
        country: req.body.country,
        desc: req.body.desc,
        img: img_file,
    })
    try {
        await Cities.save();
        res.status(200).json({success: true, message: "City Added"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Adding City"});
    }
});

app.get('/api/city', async(req, res) => {
    try {
        const response = await City_Model.find({});
        res.status(200).json({success: true, message: "Fetched Cities", Cities: response})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Fetching City"});
    }
});

app.put('/api/city/:id', upload.single('image'), async(req, res) => {
    try {
        const city_id = req.params.id;
        const imgURL = req.file.filename;
        const result  = await City_Model.findByIdAndUpdate({_id: city_id}, {img: imgURL});
        res.status(200).json({success: true, message: "Images Updated"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Updating Image"});
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
});

