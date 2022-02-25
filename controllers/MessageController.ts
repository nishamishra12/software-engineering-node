/**
 * @file Controller RESTful Web service API for message resource
 */
import MessageControllerI from "../interfaces/MessageControllerI";
import MessageDao from "../daos/MessageDao";
import {Express, Request, Response} from "express";

/**
 * @class MessageController Implements RESTful Web service API for Message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/messages to retrieve all the messages sent by the user
 *     </li>
 *     <li>GET /api/users/:uid/receivedmessages to retrieve all users received by user
 *     </li>
 *     <li>POST /api/users/:uidS/messages/:uidR to record that a user messages another user
 *     </li>
 *     <li>DELETE /api/users/:uidS/messages/:mid to delete a message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing likes CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {

    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance=(app:Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post("/api/users/:uidS/messages/:uidR", MessageController.messageController.userMessagesAnotherUser)
            app.delete("/api/users/:uidS/messages/:mid", MessageController.messageController.userDeletesAMessage)
            app.get("/api/users/:uid/messages", MessageController.messageController.findMessagesSentByUser)
            app.get("/api/users/:uid/receivedmessages", MessageController.messageController.findMessagesReceivedByUser)
        }
        return MessageController.messageController;
    }

    /**
     * Retrieves all messages received by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who has received the messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Retrieves all messages sent by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who has sent the messages
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Delete a message sent by the user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who has sent the messages and the message id
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    userDeletesAMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesAMessage(req.params.uidS, req.params.mid)
            .then(status => res.send(status));

    /**
     * Post a message sent by the user to another user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user who has sent the messages and the user who has received the message
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    userMessagesAnotherUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesAnotherUser(req.params.uidS, req.params.uidR, req.body)
            .then(messages => res.json(messages))
}