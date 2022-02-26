import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    findAllTuitsBookmarkedByUser(uid: string): Promise<Bookmark[]>;

    userBookmarksTuit(uid: string, tid: string): Promise<Bookmark>;

    userUnbookmarksTuit(uid: string, tid: string): Promise<any>;
};