// Creating simple crash-reporting Redux middlewear
import {createError} from '../actions/error';
import {isServer} from '../utils/environment';
export default store => next => action => {
    try {
        if (action.error) {
            console.error(action.error);
            console.error(action.error);
        }
        return next(action);
    } catch (err) {
        const {user} = store.getState();
        console.error(err);
        if (!isServer()) {
            window.Raven.setUserConte(user);
            window.Raven.captureException(err);
        }
        return store.dispatch(createError(err));
    }
};