import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface LikeDaoI {
    findAllUsersThatFollowUser(tid: string): Promise<Follow[]>;

    findAllUsersFollowedByUser(uid: string): Promise<Follow[]>;

    userFollowsAnotherUser(uid: string, uid1: string): Promise<Follow>;

    userUnfollowsAnotherUser(uid: string, uid1: string): Promise<any>;
};