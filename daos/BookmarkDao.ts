import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";
import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";

export default class BookmarkDao implements BookmarkDaoI {

    public static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({bookmarkedBy: uid})
            .populate("tuit")
            .exec();

    userBookmarksTuit = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({tuit: tid, bookmarkedBy: uid});

    userUnbookmarksTuit = async(uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});

}