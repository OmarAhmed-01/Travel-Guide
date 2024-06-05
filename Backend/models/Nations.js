import mongoose from "mongoose";

const NationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    capital: {type: String, required: true},
    currency: {type: String, required: true},
    timezone: {type: String, required: true},
    paragraphs: [{
        p1: {type: String, required: true},
        p2: {type: String, required: true},
    }],
    gallery: [{type: String, required: true}],
});

const Nation_Model = mongoose.models.Nations || mongoose.model("Nations", NationSchema);
export default Nation_Model; 