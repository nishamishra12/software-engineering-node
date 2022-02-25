/**
 * @file Declares User data type representing relationship between
 * users and tuit, as in user posted a tuit
 */
import User from "../users/User";

/**
 * @typedef Tuit Represents relationship between a user and the tuit,
 * as in a user posts a tuit
 * @property {tuit} tuit being posted
 * @property {User} postedBy User who posted the tuit
 * @property {postedOn} date on which it was posted
 */
export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};