/**
 * @file Implements DAO managing data storage of follow. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of follows
 * @property {FollowDao} followDao Private single instance of LikeDao
 */
export default class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}

    /**
     * Uses FollowController to retrieve all users who have been followed by this user
     * @param uid all users followed by this user
     * @returns Promise To be notified when the user has been retrieved from the database
     */
    findAllUsersFollowedByUser = async(uid: string): Promise<Follow[]> =>
        FollowModel
            .find({followedBy: uid})
            .populate("userFollowed")
            .exec();

    /**
     * Uses FollowController to retrieve all users who follow this user
     * @param uid all users who follow this user
     * @returns Promise To be notified when the user has been retrieved from the database
     */
    findAllUsersThatFollowUser = async(uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("followedBy")
            .exec();

    /**
     * Uses FollowController to follow another user
     * @param uid user who follows another user
     * @param uid1 user who has been followed
     * @returns Promise To be notified when the user has been followed from the database
     */
    userFollowsAnotherUser = async(uid: string, uid1: string): Promise<Follow> =>
        FollowModel.create({userFollowed: uid1, followedBy:uid});

    /**
     * Uses FollowController to unfollow another user
     * @param uid user who unfollows another user
     * @param uid1 user who has been unfollowed
     * @returns Promise To be notified when the user has been unfollowed from the database
     */
    userUnfollowsAnotherUser = async(uid: string, uid1: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid1, followedBy:uid});
}