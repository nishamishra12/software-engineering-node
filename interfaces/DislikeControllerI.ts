import {Request, Response} from "express";

/**
 * @file Declares API for Dislikes related controller.
 */
export default interface DislikeControllerI {
    findAllUsersThatDisLikedTuit (req: Request, res: Response): void;
    findAllTuitsDisLikedByUser (req: Request, res: Response): void;
    userTogglesTuitDisLikes (req: Request, res: Response): void;
};