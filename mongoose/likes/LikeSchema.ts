import mongoose, {Schema} from "mongoose";
import Like from "../../models/likes/Like";

/**
 * @file Implements mongoose model to CRUD
 * documents in the likes schema
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;