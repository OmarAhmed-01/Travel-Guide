import mongoose from "mongoose";

const hotspotSchema = new mongoose.Schema({
    img: {type: String, required: true},
    name: {type: String, required: true},
    desc: {type: String, required: true},
});

const Hotspot_Model = mongoose.models.Hotspot || mongoose.model("Hotspot", hotspotSchema);
export default Hotspot_Model;