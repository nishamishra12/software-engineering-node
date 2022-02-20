import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";

export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    public static getInstance=(app:Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uidS/messages/:uidR", MessageController.messageController.userMessagesAnotherUser)
            app.delete("/api/users/:uidS/messages/:uidR", MessageController.messageController.userDeletesAMessage)
            app.get("/api/users/:uid/messages", MessageController.messageController.findMessagesSentByUser)
            app.get("/api/users/:uid/receivedmessages", MessageController.messageController.findMessagesReceivedByUser)
        }
        return MessageController.messageController;
    }
    findMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    findMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    userDeletesAMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesAMessage(req.params.uidS, req.params.uidR)
            .then(status => res.send(status));

    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.params.uidS, req.params.uidR, req.body)
            .then(messages => res.json(messages))
}