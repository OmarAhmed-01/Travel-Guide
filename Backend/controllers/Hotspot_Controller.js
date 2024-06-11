import Hotspot_Model from "../models/Hotspots.js";
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchHotspot = async(req, res) => {
    try {
        const response = await Hotspot_Model.find({});
        res.status(200).json({success: true, message: "Fetched Hotspots", hotspots: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Fetching Hotspots"});
    }
};

const postHotspot = async(req, res) => {
    const hotspot = new Hotspot_Model({
        name: req.body.name,
        desc: req.body.desc,
        img: req.file.filename
    });
    try {
        await hotspot.save();
        res.status(200).json({success: true, message: "Hotspot Added"});
    } catch (error) {
        console.log();
        res.status(500).json({success: false, message: "Cannot Add Hotspot"});
    }
};

const updateHotspot = async(req, res) => {
    try {
        const hotspot_ID = req.params.id;
        const updateData = {...req.body};
        const image_url = req.file.filename;

        updateData.img = image_url;

        const result = await Hotspot_Model.findByIdAndUpdate({_id: hotspot_ID}, updateData, {new: true});
        res.status(200).json({ success: true, message: "Hotspot Updated", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error Updating Hotspot" });
    }
};

const deleteHotspot = async(req, res) => {
    try {
        const hotspot_ID = req.params.id;
        const hotspot = await Hotspot_Model.findById({_id: hotspot_ID});
        if(!hotspot){
            res.status(404).json({success: false, message: "Cannot find Hotspot"});
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

            if(hotspot.img){
                deleteFile(hotspot.img);
            }
            
            await Hotspot_Model.findByIdAndDelete({_id: hotspot_ID});
            res.status(200).json({success: true, message: "Hotspot Removed"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Removing Hotspot"});
    }
};

export { fetchHotspot, postHotspot, updateHotspot, deleteHotspot };