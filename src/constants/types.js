export const providers = ['Github'];

export const app = {
    ERROR: 'App/error',
    LOADED: 'App/loaded',
    LOADING: 'App/loading'
};

export const auth = {
    LOGIN_SUCCESS: 'auth/login/success',
    LOGOUT_SUCCESS: 'auth/logout/success'
};

export const posts = {
    CREATE: 'post/create',
    GET: 'post/get',
    LIKE: 'post/like',
    NEXT: 'post/paginate/next',
    UNLIKE: 'post/unlike',
    UPDATE_LINK: 'post/paginate/update'
};

export const comments = {
    CREATE: 'comments/create',
    GET: 'comments/get',
    SHOW: 'comments/show',
    TOGGLE: 'comments/toggle'
};