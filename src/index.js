import React, {component} from 'react';
import {render} from 'react-dom';

import App from './App';

import './shared/crash';
import './service-worker';
import './vendor';
import './style.scss';

render (<App />, document.getElementById('app'));