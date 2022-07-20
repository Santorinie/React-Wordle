import React, { Component } from 'react';

class GuessLetter extends Component {
    state = { 
     } 
    render() { 
        const {letter, status} = this.props;
        // 0 = Empty, 1 = Wrong letter, 2 = Wrong place, 3 = Correct letter
        let stateString;
        console.log('status',status);
        switch (status) {
            case 1:
                stateString = 'Absent';
                break;
                case 2:
                    stateString = 'LetterPresent';
                    break;
                    case 3:
                        stateString = 'LetterCorrect';
                        break;
        
            default:
                stateString = 'Empty';
                break;
        }
        //console.log(stateString);
        return (
            <div className={'guessLetter'+' '+stateString} >
                {letter}
            </div>
        );
    }
}
 
export default GuessLetter;