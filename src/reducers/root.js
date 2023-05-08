import { combineReducers } from "redux";

import { error } from "./error";
import { loading } from "./loading";
import { pagination } from "./pagination";
import { posts, postIds } from "../reducers/post";
import { users } from "../reducers/users";
import { comments, comentIds } from "./comments";

/**
 * Root reducers to project
 * @module X-WeChat/reducers
 */
const rootReducer = combineReducers ({
    comentIds,
    comments,
    error,
    loading,
    pagination,
    postIds,
    posts,
    users
});

export default rootReducer;