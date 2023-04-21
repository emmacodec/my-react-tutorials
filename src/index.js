// my comment box
import React, {Component, component} from "react";
import {render} from "react-dom";
import PropTypes from "prop-types"

const node=document.getElementById('root');
class Post extends Component {
    render () {
        return React.createElement(
            'div',
            {
                className:'post'
            },
            React.createElement(
                'h2',
                {
                    className:'postAuthor',
                    id:this.props.id
                },
                this.props.user,
                React.createElement(
                    'span',
                    {
                    
                        className:'postBody'
                    },
                    this.props.content
                )
            )
        );
    }
}

Post.PropTypes= {
    user: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
};

const App = React.createElement(Post, {
    id: 1,
    content: 'said: This is a post!',
    user: 'kingsley'
});
render(App,node);

//...
this.props.user,
React.createElement(
    "span",
    {
        className: "postBody",
    },
    this.props.content
)
this.props.children

//...
class comment extends component {
    render () {
        return React.createElement (
            'div',
            {
                className: 'comment'
            },
            React.createElement(
                'h2',
                {
                    className: 'commentAuthor'
                },
                this.props.user,
                React.createElement(
                    'span',
                    {
                        className: 'commentContent'
                    },
                    this.props.content
                )
            )
        );
    }
            
}

comment.PropTypes= {
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
};

const app=React.createElement(
    Post,
    {
        id: 1,
        content: 'said: This is a post',
        user: 'kingsley'
    },
    React.createElement(comment, {
        id: 2,
        user: 'Lawrence',
        content: 'commented: wow! how cool!'
    })
);

ReactDOM.render(App,node);

//...
class CreateComment extends component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            user: ''
        };
    }
    render() {
        return React.createElement (
            'form',
            {
                className: 'createComment'
            },
            React.createElement('input', {
                type: 'text',
                placeholder: 'your name',
                value: this.state.user
            }),
            React.createElement('input' {
                type: 'text',
                placeholder: 'Thoughts'
            }),
            React.createElement('input' {
                type: 'submit',
                value: 'Post'
            }),
            
            
            


        );
    }
}
CreateComment.PropTypes = {
    content: React.PropTypes.string
};
//....
const App = React.createElement(
    Post,
    {
        id: 1,
        content: 'said: This is a post!',
        user: 'kingsley'
    },
    React.createElement(comment, {
        id: 2,
        user: 'Lawrence',
        content: 'commented: wow! how cool'
    }),
    React.createElement(CreateComment)
        
);

//....
class CreateComment extends component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            user: ''
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUserChange(event) {
        const val = event.target.value;
        this.setState(() => ( {
            content: val
        }));
    }
    handleTextChange(event) {
        const val = event.target.value;
        this.setState(() => ( {
            content: val
        }));
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState( () => ( {
            user: '',
            content: ''
        }));
    }
    render() {
        return React.createElement(
            'form',
            {
                className: 'createComment',
                onSubmit: this.handleSubmit
            },
            React.createElement('input', {
                type: 'text',
                placeholder: 'your name',
                value: this.state.user,
                onChange: this.handleUserChange
            }),
            React.createElement('input', {
                type: 'text',
                placeholder: 'Thoughts',
                onChange: this.state.handleTextChange
            }),
            React.createElement('input', {
                type: 'submit',
                value: 'Post'
            })
            
            
            
        );
    }
}
CreateComment.PropTypes = {
    onCommentSubmit: PropTypes.func.isRequired,
    content: PropTypes.string
};

//...
class createComment extends component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            user: ''
        };
        this.handleUserChange=this.handleUserChange.bind(this);
        this.handleTextChange=this.handleTextChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleUserChange(event) {
        this.setState(() => ( {
            user: event.target.value
        }));
    }
    handleTextChange(event) {
        this.setState(() => ( {
            content: event.target.value
        }));
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.onCommentSubmit( {
            user: this.state.user.trim(),
            content: this.state.content,trim()
        });
        this.setState(() => ( {
            user: '',
            Text: ''
        }));
    }
    render() {
        return React.createElement(
            'form',
            {
                className: 'createComment',
                onSubmit: this.handleSubmit
            },
            React.createElement('input', {
                type: 'text',
                placeholder: 'your name',
                value: this.state.user,
                onChange: this.handleUserChange
            }),
            React.createElement('input', {
                type: 'text',
                placeholder: 'Thoughts',
                onChange: this.state.handleTextChange
            }),
            React.createElement('input', {
                type: 'submit',
                value: 'Post'
            }));
            
            
         
    }
}

//...
const data = {
    Post: {
        id: 123,
        content: 
             'Never forget: Good days gives happiness,Bad days gives experience, worst days give Lessons, and best days gives memories. Daniel Emmanuel',
        user: 'Edicha Josh',
        
    },
    comments: [
        {
            id: 0,
            user: 'Augusta',
            content: 'such.win'
        },
        {
            id: 1,
            user: 'Hosea',
            content: 'awesome',
        },
        {
            id: 2,
            user: 'James',
            content: 'who was Daniel Emmanuel?',
        },
        {
            id: 3,
            user: 'serah',
            content: '@James get off letters and do your homework',
        },
        {
            id: 4,
            user: 'Grace',
            content: 'ohhhh!! love this...!!!!',
        },
    ]
}

