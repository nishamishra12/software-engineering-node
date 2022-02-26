import {Request, Response} from "express";

export default interface FollowControllerI {
    findAllUsersThatFollowUser(req: Request, res: Response): void;

    findAllUsersFollowedByUser(req: Request, res: Response): void;

    userFollowsAnotherUser(req: Request, res: Response): void;

    userUnfollowsAnotherUser(req: Request, res: Response): void;
};