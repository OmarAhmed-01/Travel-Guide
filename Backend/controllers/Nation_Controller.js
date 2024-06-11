import Nation_Model from "../models/Nations.js";
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchNation = async(req, res) => {
    try {
        const response = await Nation_Model.find({});
        res.status(200).json({success: true, message: "Fetched Nations", Nations: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Finding Nations"});
    }
};

const postNation = async(req, res) => {
    try {
        const nation = new Nation_Model({
            name: req.body.name,
            desc: req.body.desc,
            img: req.files['image'][0].filename,
            capital: req.body.capital,
            currency: req.body.currency,
            timezone: req.body.timezone,
            paragraphs: {
                p1: req.body.p1,
                p2: req.body.p2,
            },
            gallery: req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : [],
        });

        await nation.save();
        res.status(200).json({ success: true, message: "Nation Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error Adding Nation" });
    }
};

const updateNation = async(req, res) => {
    try {
        const nation_ID = req.params.id;
        const updateData = {...req.body};
        if (req.files?.image?.[0]?.filename) {
            updateData.img = req.files.image[0].filename;
        }
        if (req.files?.gallery) {
            updateData.gallery = req.files.gallery.map(file => file.filename);
        }

        const result = await Nation_Model.findByIdAndUpdate({_id: nation_ID}, updateData, {new: true});
        res.status(200).json({ success: true, message: "Nation Updated", data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error Updating Nation" });
    }
};

const deleteNation = async(req, res) => {
    try {
        const nation_ID = req.params.id;
        const nation = await Nation_Model.findById({_id: nation_ID});
        if(!nation){
            return res.status(404).json({success: false, message: "Nation not found"});
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
            nation.gallery.forEach(imagePath => deleteFile(imagePath));
            if(nation.img){
                deleteFile(nation.img);
            }
            await Nation_Model.findByIdAndDelete({_id: nation_ID});
            res.status(200).json({success: true, message: "Nation Deleted"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Deleting Nation"});
    }
};

export { fetchNation, postNation, updateNation, deleteNation };