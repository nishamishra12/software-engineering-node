import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";

export default class MessageDao implements MessageDaoI {

    private static messageDao: MessageDao | null = null

    public static getInstance=(): MessageDao =>{
        if(MessageDao.messageDao == null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    findMessagesReceivedByUser = async(uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid});

    findMessagesSentByUser = async(uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid});

    userDeletesAMessage = async (uidS: string, uidR: string): Promise<any> =>
        MessageModel.deleteOne({to: uidR, from: uidS});

    userMessagesAnotherUser = async(uidS: string, uidR: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, to: uidR, from: uidS})
}