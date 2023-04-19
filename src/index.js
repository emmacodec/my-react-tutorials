// write some react code
import React, {component} from 'react';
import {render} from 'react-dom';
const node=document.getElementById('root');
const root=
  React.createElement('div',{},//
   React.createElement('h1',{},"Hello world!",//
    React.createElement('a', {href: 'mailto:github.com/emmacodec'},
     React.createElement('h1',{},"React in Action"),
      React.createElement('em',{}, "...and now it really is!")
    )
   )
  );
  render(root,node); //