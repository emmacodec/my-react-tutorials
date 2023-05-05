import {browseHistory} from 'react-router';
const history = typeof window !='undefined' ? browseHistory : {push: () => {}};
const navigate = to => history.push(to);
export {history,navigate};