import mongoose from "mongoose";
import User from "../models/user";
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: Date,
    postedBy: {type: User}
}, {collection: 'tuits'});
export default TuitSchema;