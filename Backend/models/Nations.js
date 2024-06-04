import mongoose from "mongoose";

const NationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    img: {type: String, required: true}
});

const Nation_Model = mongoose.models.Nations || mongoose.model("Nations", NationSchema);
export default Nation_Model; 