import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
export default class FollowDao implements FollowDaoI {

    private static followDao: FollowDao | null = null;

    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }
    private constructor() {}
    findAllUsersFollowedByUser = async(uid: string): Promise<Follow[]> =>
        FollowModel
            .find({followedBy: uid})
            .populate("userFollowed")
            .exec();

    findAllUsersThatFollowUser = async(uid: string): Promise<Follow[]> =>
        FollowModel
            .find({userFollowed: uid})
            .populate("followedBy")
            .exec();

    userFollowsAnotherUser = async(uid: string, uid1: string): Promise<Follow> =>
        FollowModel.create({userFollowed: uid1, followedBy:uid});

    userUnfollowsAnotherUser = async(uid: string, uid1: string): Promise<any> =>
        FollowModel.deleteOne({userFollowed: uid1, followedBy:uid});
}