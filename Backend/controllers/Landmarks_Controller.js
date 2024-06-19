import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import Landmark_Model from "../models/landmarksModels.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchLandmark = async(req, res) => {
    try {
        const response = await Landmark_Model.find({});
        res.status(200).json({success: true, message: "Fetched Landmarks", Landmarks: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Fetching City"});
    }
};

const postLandmark = async(req, res) => {
    try {
        const landmark = new Landmark_Model({
            image: req.files['image'] ? req.files['image'].map(file => file.filename) : [],
            name: req.body.name,
            category: req.body.category,
            desc: req.body.desc,
            country: req.body.country,
            city: req.body.city,
            zipcode: req.body.zipcode,
            location: {
                lat: req.body.lat,
                lon: req.body.lon
            }
        });
        await landmark.save();
        res.status(200).json({ success: true, message: "Landmark Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error Adding Landmark" });
    }
};

const updateLandmark = async(req, res) => {
    try {
        const landmark_ID = req.params.id;
        const updateData = {...req.body};
        if (req.files?.image) {
            updateData.image = req.files.image.map(file => file.filename);
        }
        const result = await Landmark_Model.findByIdAndUpdate({_id: landmark_ID}, updateData, {new: true});
        res.status(200).json({ success: true, message: "Landmark Updated", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error Updating Landmark"});
    }
};

const deleteLandmark = async(req, res) => {
    try {
        const landmark_ID = req.params.id;
        const landmark = await Landmark_Model.findById({_id: landmark_ID});
        if(!landmark){
            res.status(404).json({success: false, message: "Landmark Not Found"});
        }
        else{
            const deleteFile = (filePath) => {
                const fullPath = path.join(__dirname, '../uploads', filePath);
                fs.unlink(fullPath, (err) => {
                    if(err){
                        console.log(`Failed to delete file: ${fullPath}`, err);
                    }
                });
            };
            landmark.image.forEach(imagePath => deleteFile(imagePath));
            await Landmark_Model.findByIdAndDelete({_id: landmark_ID});
            res.status(200).json({success: true, message: "Landmark Deleted"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Deleting Landmark"});
    }
};

export { fetchLandmark, postLandmark, updateLandmark, deleteLandmark };

