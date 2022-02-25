/**
 * @file Declares Message data type representing relationship between
 * users and another user, as in user message another user
 */
import User from "../users/User";

/**
 * @typedef Message Represents messages relationship between a user and another user,
 * as in a user messages another user
 * @property {Message} message message being sent
 * @property {User} to User who sent the message
 * @property {User} to User who received the message
 * @property {Date} date on which it was sent
 */
export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn?: Date,
}