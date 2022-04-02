/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */
import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns LikeDao
     */
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }
    private constructor() {}

    /**
     * Uses LikeController to retrieve all users who have liked the tuit
     * @param tid tuit which has been liked
     * @returns Promise To be notified when the tuit is liked in the database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();

    /**
     * Uses LikeController to retrieve all tuits liked by the user
     * @param uid user who liked the tuit
     * @returns Promise To be notified when the tuits are retrieved from database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Uses LikeController to like a tuit
     * @param uid user who liked the tuit
     * @param tid tuit which has been liked
     * @returns Promise To be notified when the liked is saved in the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});

    /**
     * Uses LikeController to get user that like a tuit
     * @param uid user who liked the tuit
     * @param tid tuit which has been liked
     * @returns Promise To be notified when the tuit is unliked from the database
     */
    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.findOne({tuit: tid, likedBy: uid});

    /**
     * Uses LikeController to unlike a tuit
     * @param uid user who unliked the tuit
     * @param tid tuit which has been unliked
     * @returns Promise To be notified when the tuit is unliked from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});

    /**
     * Uses LikeController to get the number of likes on a tuit
     * @param tid tuit which has been liked
     * @returns Promise To be notified when the count is calculated from the database
     */
    countHowManyLikedTuit = async (tid: string): Promise<any> =>
        LikeModel.count({tuit: tid});
}