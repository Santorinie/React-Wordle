import React, { Component } from 'react';
import guessLetter from './guessLetter';

class Container extends Component {
    state = {  } 
    render() { 
        return (
            <div className='gameContainer'>
                <div className="headerContainer"></div>
                <div className="playboardContainer"></div>
                <div className="letterContainer"></div>
            </div>
            

        );
    }
}
 
export default Container;
    
