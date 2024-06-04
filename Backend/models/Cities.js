import mongoose from "mongoose";

const CitySchema = new mongoose.Schema({
    City: {type: String, required: true},
    Country: {type: String, required: true},
    Desc: {type: String, required: true},
    img: {type: String, required: true},
});

const City_Model = mongoose.models.City || mongoose.model("city", CitySchema);

export default City_Model;