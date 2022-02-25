/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of UserDao
 */
export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance=(): MessageDao =>{
        if(MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Uses MessageController to retrieve all messages received by the user
     * @param uid of the user for whom messages are received
     * @returns Promise To be notified when the message received by the user are retrieved
     */
    findMessagesReceivedByUser = async(uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid});

    /**
     * Uses MessageController to retrieve all message sent by the user
     * @param uid of the user for whom messages are sent
     * @returns Promise To be notified when the message received by the user are retrieved
     */
    findMessagesSentByUser = async(uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid});

    /**
     * Uses MessageController to delete a message sent by the user
     * @param uid of the user who has sent the message
     * @param mid message id of the message sent by the user
     * @returns Promise To be notified when the message received by the user are retrieved
     */
    userDeletesAMessage = async (uidS: string, mid: string): Promise<any> =>
        MessageModel.deleteOne({id: mid, from: uidS});

    /**
     * Uses MessageController to message a user
     * @param uidS of the user who has sent the message
     * @param uidR of the user who has received the message
     * @returns Promise To be notified when the message received by the user are retrieved
     */
    userMessagesAnotherUser = async(uidS: string, uidR: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: uidR, from: uidS})
}