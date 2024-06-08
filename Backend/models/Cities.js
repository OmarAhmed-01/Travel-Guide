import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
    city: {type: String, required: true},
    country: {type: String, required: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    map: {type: String, required: true},
    paragraphs: [{
        p1: {type: String, required: true},
        p2: {type: String, required: true},
    }],
    gallery: [{type: String, required: true}],
});

const City_Model = mongoose.models.City || mongoose.model("city", CitySchema);

export default City_Model;