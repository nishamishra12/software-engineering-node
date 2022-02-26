/**
 * @file Declares Follow data type representing relationship between
 * users and another user, as in user follows another user
 */
import User from "../users/User";

/**
 * @typedef Follow Represents follows relationship between a user and another user,
 * as in a user follows a user
 * @property {User} userFollowed User being followed
 * @property {User} followedBy User who follows
 */

export default interface Follow {
    userFollowed: User,
    followedBy: User
};