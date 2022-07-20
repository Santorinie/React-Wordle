import React, { Component } from 'react';
import GuessLetter from './guessLetter';


class GuessLetterRow extends Component {
    state = {  } 
    render() { 
        const {guessLetters, status} = this.props;
       
        // const letters = [...guessLetters].map((letter,index) => <GuessLetter key={index} letter={letter}></GuessLetter>);

        
        

        return (
            <div className='guessLetterRow'>
                <GuessLetter letter={guessLetters[0]} status={status[0]}></GuessLetter>
                <GuessLetter letter={guessLetters[1]} status={status[1]}></GuessLetter>
                <GuessLetter letter={guessLetters[2]} status={status[2]}></GuessLetter>
                <GuessLetter letter={guessLetters[3]} status={status[3]}></GuessLetter>
                <GuessLetter letter={guessLetters[4]} status={status[4]}></GuessLetter>
            </div>
        );
    }
}
 
export default GuessLetterRow;