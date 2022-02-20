/**
 * @file Controller RESTful Web service API for follow resource
 */
import {Express, Request, Response} from "express";
import FollowControllerI from "../interfaces/FollowControllerI";
import FollowDao from "../daos/FollowDao";

/**
 * @class FollowController Implements RESTful Web service API for Follow resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/follows to retrieve all the people followed by a user
 *     </li>
 *     <li>GET /api/users/:uid/following to retrieve all users follow user
 *     </li>
 *     <li>POST /api/users/:uid/follows/:uid1 to record that a user follows aonther user
 *     </li>
 *     <li>DELETE /api/users/:uid/unfollows/:uid to record that a user
 *     no longer follows a user</li>
 * </ul>
 * @property {LikeDao} likeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowedByUser);
            app.get("/api/users/:uid/following", FollowController.followController.findAllUsersThatFollowUser);
            app.post("/api/users/:uid/follows/:uid1", FollowController.followController.userFollowsAnotherUser);
            app.delete("/api/users/:uid/unfollows/:uid1", FollowController.followController.userUnfollowsAnotherUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Retrieves all users who are followed by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user for which the following are to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all other users that follow a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user for which followers are to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that follow the given user
     */
    findAllUsersThatFollowUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowUser(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid1 representing the user that is following the user
     * and the user being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follow that was inserted in the
     * database
     */
    userFollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsAnotherUser(req.params.uid, req.params.uid1)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and uid1 representing the user that is unfollowing
     * the user and the user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether unfollowing the user was successful or not
     */
    userUnfollowsAnotherUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsAnotherUser(req.params.uid, req.params.uid1)
            .then(status => res.send(status));
}