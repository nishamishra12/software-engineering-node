import {Request, Response} from "express";
import Message from "../models/messages/Message";

export default interface MessageDaoI {
    userMessagesAnotherUser(uidS: string, uidR: string, message: Message): Promise<Message>,
    userDeletesAMessage(uidS: string, uidR: string): Promise<any>,
    findMessagesSentByUser(uid: string): Promise<Message[]>,
    findMessagesReceivedByUser(uid: string): Promise<Message[]>
}