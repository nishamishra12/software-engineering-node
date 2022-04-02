import mongoose, {Schema} from "mongoose";
import Dislike from "../../models/dislikes/Dislike";

/**
 * @file Implements mongoose model to CRUD
 * documents in the dislikes schema
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});
export default DislikeSchema;