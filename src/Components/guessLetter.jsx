import React, { Component } from 'react';

class GuessLetter extends Component {
    state = { 
        acceptedLetters: ['A','B','C','D','E','F','G','H','I','J','K',"L","M","N","O","P","Q",'R','S','T','U','V','W','X','Y','Y','Z'],
        letter: '',
        afterLetter: ''
     } 
    render() { 
        return (
            <div className='guessLetter'>
                <input value={this.state.letter} type='text' className='textInput' onChange={(e) => console.log(e)} onKeyDown={(e) => {
                    
                    if (this.state.acceptedLetters.includes(e.key.toUpperCase())) {
                        this.setState({letter: e.key.toUpperCase()});
                    }


                }}
                
                
                ></input>
            </div>
        );
    }
}
 
export default GuessLetter;