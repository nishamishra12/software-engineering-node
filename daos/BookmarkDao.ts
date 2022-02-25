/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose Bookmark
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of LikeDao
 */
export default class BookmarkDao implements BookmarkDaoI {

    public static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
     * Uses BookmarkController to retrieve all users who have bookmarked th tuit
     * @param uid user who has bookmarked the tuit
     * @returns Promise To be notified when the user is retrieved from the database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();

    /**
     * Uses BookmarkController to bookmark a tuit
     * @param uid user who has bookmarked the tuit
     * @returns Promise To be notified when the tuit is bookmarked in the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});

    /**
     * Uses BookmarkController to unbookmark a tuit
     * @param uid user who has unbookmarked the tuit
     * @returns Promise To be notified when the tuit is unbookmarked in the database
     */
    userUnbookmarksTuit = async(uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
}