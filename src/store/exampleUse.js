import configurationStore from "./configurationStore.prod";
import {loading,loaded} from '../actions/loading';
const store = configurationStore();

console.log('========== Example store==========');
store.dispatch(loading());
store.dispatch(loaded());
store.dispatch(loading());
store.dispatch(loaded());
console.log('==========end example store=========');