import React, { Component, useCallback } from 'react';
import GuessLetter from './guessLetter';
import HeaderContainer from './headerContainer';
import PlayboardContainer from './playboardContainer';
import LetterContainer from './letterContainer';


class Container extends Component {
    state = { 
        keyboardLetters: [
            ['Q','W','E','R','T','Y','U','I','O','P'],
            ['A','S','D','F','G','H','J','K','L'],
            ['Enter','Z','X','C','V','B','N','M','⌫']
        ],
        key: ''
     } 

     render() { 
         const handleLetter = (e) =>{
             console.log("Valami hiba tortent",e);
             this.setState({key: e});
         };
        
        return (
            <div className='gameContainer'>
                <HeaderContainer></HeaderContainer>
                <PlayboardContainer data={this.state.key}></PlayboardContainer>
                <LetterContainer onChange={handleLetter} keyboardLetters={this.state.keyboardLetters}></LetterContainer>
            </div>
            

        );
    }
}
 
export default Container;
    
