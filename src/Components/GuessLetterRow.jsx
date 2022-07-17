import React, { Component } from 'react';
import GuessLetter from './guessLetter';


class GuessLetterRow extends Component {
    state = {  } 
    render() { 
        return (


            <div className='guessLetterRow'>

                <GuessLetter></GuessLetter>
                <GuessLetter></GuessLetter>
                <GuessLetter></GuessLetter>
                <GuessLetter></GuessLetter>
                <GuessLetter></GuessLetter>
            </div>
        );
    }
}
 
export default GuessLetterRow;