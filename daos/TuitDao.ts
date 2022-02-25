/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI{
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuits
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find();

    /**
     * Uses TuitModel to retrieve all tuits by a user
     * @param uid userid for which all tuits are to be retrieved
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({postedBy: uid});

    /**
     * Uses TuitModel to retrieve all tuits by a user
     * @param uid primary key
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    findTuitById = async (uid: string): Promise<any> =>
        TuitModel.findById(uid)
            .populate("postedBy")
            .exec();

    /**
     * Uses TuitModel to create a tuit by a user
     * @param uid for which to create tuit
     * @param tuit to create a new tuit
     * @returns Promise To be notified when tuits are retrieved from the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({...tuit, postedBy: uid});

    /**
     * Uses TuitModel to update a tuit by a user
     * @param uid for which to create tuit
     * @param tuit to update a tuit
     * @returns Promise To be notified when tuits are updated in the database
     */
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            {_id: uid},
            {$set: tuit});

    /**
     * Uses TuitModel to update a tuit by a user
     * @param uid for which to delete a tuit
     * @returns Promise To be notified when tuits are deleted from the database
     */
    deleteTuit = async (uid: string): Promise<any> =>
        TuitModel.deleteOne({_id: uid});
}