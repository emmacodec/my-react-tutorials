import React from "react";
import {render} from "react-dom";
class ShallowMerge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: 'Emmanuel',
                colors: {
                    favorite: ''
                }
            }
        };
        this.onButtonClick=this.onButtonClick.bind(this);
    }
    onButtonClick() {
        this.setState  ( {
            user: {
                colors: {
                    favorite: 'blue'
                }
            }
        });
    }
        
    
    render() {
        return (
            <div>
                <h1>My favourite color is {this.state.user.favorite}and my name is {this.state.user.name}</h1>
                    <button onClick={this.onButtonClick}>show the color!</button>
            </div>
        )
    }
}
render(
    <ShallowMerge/>,
    document.getElementById('root')
)