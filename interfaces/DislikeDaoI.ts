import Dislike from "../models/dislikes/Dislike";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface DislikeDaoI {
    findAllUsersThatDisLikedTuit (tid: string): Promise<Dislike[]>;
    findAllTuitsDisLikedByUser (uid: string): Promise<Dislike[]>;
    userUnlikesTuit (tid: string, uid: string): Promise<any>;
};