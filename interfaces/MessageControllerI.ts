import {Request, Response} from "express";

export default interface MessageControllerI {
    userMessagesAnotherUser(req: Request, res: Response): void,
    userDeletesAMessage(req: Request, res: Response): void,
    findMessagesSentByUser(req:Request, res:Response): void,
    findMessagesReceivedByUser(req: Request, res:Response): void
};