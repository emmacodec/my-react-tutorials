import React, {component} from 'react';
import {render} from 'react-dom';

import App from './App';

import './shared/crash';
import './shared/service-worker';
import './shared/vendor';
import './styles/style.scss';

render (<App />, document.getElementById('app'));