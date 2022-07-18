import React, { Component } from 'react';

class GuessLetter extends Component {
    state = { 
     } 
    render() { 
        const {id, key, letter, status} = this.props.data;
        return (
            <div className={'guessLetter'+' '+status} >
                <h1 className='textInput'>{letter}</h1>

            </div>
        );
    }
}
 
export default GuessLetter;