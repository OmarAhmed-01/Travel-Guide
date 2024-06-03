import mongoose from "mongoose";

const LandmarksSchema = new mongoose.Schema({
    image: [{type: String, required: true}],
    name: {type: String, required: true},
    category: [{type: String, required: true}],
    desc: {type: String, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    zipcode: {type: String, required: true},
    location: {
        lat: {type: Number, required: true},
        lon: {type: Number, required: true}
    },
});

const Landmark_Model = mongoose.models.Landmark || mongoose.model("Landmark", LandmarksSchema);

export default Landmark_Model;