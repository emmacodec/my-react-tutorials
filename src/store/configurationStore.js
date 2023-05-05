import {_PRODUCTION_} from 'environs'
import prodStore from './configurationStore.prod';
import devStore from './configurationStore.dev';
export default (_PRODUCTION_ ? prodStore: devStore);