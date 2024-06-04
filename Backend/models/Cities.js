import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
    city: {type: String, required: true},
    country: {type: String, required: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
});

const City_Model = mongoose.models.City || mongoose.model("city", CitySchema);

export default City_Model;