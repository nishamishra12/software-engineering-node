/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB.
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/DislikeModel";
import Dislike from "../models/dislikes/Dislike";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }
    private constructor() {}

    /**
     * Uses DislikeController to retrieve all users who have disliked the tuit
     * @param tid tuit which has been disliked
     * @returns Promise To be notified when the tuit is disliked in the database
     */
    findAllUsersThatDisLikedTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({tuit: tid})
            .populate("dislikedBy")
            .exec();

    /**
     * Uses DislikeController to retrieve all tuits disliked by the user
     * @param uid user who disliked the tuit
     * @returns Promise To be notified when the tuits are retrieved from database
     */
    findAllTuitsDisLikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({dislikedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();

    /**
     * Uses DislikeController to like a tuit
     * @param uid user who liked the tuit
     * @param tid tuit which has been disliked
     * @returns Promise To be notified when the disliked is saved in the database
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeController to get user that like a tuit
     * @param uid user who disliked the tuit
     * @param tid tuit which has been disliked
     * @returns Promise To be notified when the tuit is unliked from the database
     */
    findUserDisLikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeController to unlike a tuit
     * @param uid user who unliked the tuit
     * @param tid tuit which has been unliked
     * @returns Promise To be notified when the tuit is unliked from the database
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({tuit: tid, dislikedBy: uid});

    /**
     * Uses DisikeController to get the number of dislikes on a tuit
     * @param tid tuit which has been disliked
     * @returns Promise To be notified when the count is calculated from the database
     */
    countHowManyDisLikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}