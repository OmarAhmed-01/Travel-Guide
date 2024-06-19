import City_Model from "../models/Cities.js";
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fetchCity = async(req, res) => {
    try {
        const response = await City_Model.find({});
        res.status(200).json({success: true, message: "Fetched Cities", Cities: response});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Fetching City"});
    }
}

const postCity = async(req, res) => {
    try {
        const cityData = {
            city: req.body.city,
            country: req.body.country,
            desc: req.body.desc,
            img: req.files['image'][0].filename, // Get filename for single image upload
            map: req.files['map'] ? req.files['map'][0].filename : '', // Map filenames for map files
            paragraphs: {
                p1: req.body.p1,
                p2: req.body.p2,
            },
            gallery: req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : [], // Map filenames for gallery files
        };

        const newCity = new City_Model(cityData);
        await newCity.save();
        res.status(200).json({ success: true, message: "City Added" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error Adding City" });
    }
};

const updateCity = async(req, res) => {
    try {
        const city_id = req.params.id;

        // Initialize update data with the body of the request
        const updateData = { ...req.body };

        // Update map URL if provided
        if (req.files?.map?.[0]?.filename) {
            updateData.map = req.files.map[0].filename;
        }

        // Update image URL if provided
        if (req.files?.image?.[0]?.filename) {
            updateData.img = req.files.image[0].filename;
        }

        // Update gallery URLs if provided
        if (req.files?.gallery) {
            updateData.gallery = req.files.gallery.map(file => file.filename);
        }

        // Explicitly update other fields if provided
        if (req.body.city) updateData.city = req.body.city;
        if (req.body.country) updateData.country = req.body.country;
        if (req.body.desc) updateData.desc = req.body.desc;

        // Update the city document and return the updated document
        const result = await City_Model.findByIdAndUpdate(city_id, updateData, { new: true });

        res.status(200).json({ success: true, message: "City Updated", data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error Updating City" });
    }
};

const deleteCity = async(req, res) => {
    try {
        const city_id = req.params.id;
        const city = await City_Model.findById({_id: city_id});
        if(!city){
            return res.status(404).json({success: false, message: "City not found"});
        }
        else{
            const deleteFile = (filePath) => {
                const fullPath = path.join(__dirname, '../uploads', filePath);
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.log(`Failed to delete file: ${fullPath}`, err);
                    }
                });
            };
            
            // Delete gallery images
            city.gallery.forEach(imagePath => deleteFile(imagePath));

            // Delete map file if it exists
            if (city.map) {
                deleteFile(city.map);
            }

            // Delete image file if it exists
            if (city.img) {
                deleteFile(city.img);
            }

            await City_Model.findByIdAndDelete({_id: city_id});
            res.status(200).json({success: true, message: "City Deleted"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error Deleting City"});
    }
};

export { fetchCity, postCity, updateCity, deleteCity };