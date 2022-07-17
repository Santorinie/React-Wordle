import React, { Component } from 'react';
import GuessLetter from './guessLetter';
import HeaderContainer from './headerContainer';
import PlayboardContainer from './playboardContainer';
import LetterContainer from './letterContainer';


class Container extends Component {
    state = {  } 
    render() { 
        return (
            <div className='gameContainer'>
                <HeaderContainer></HeaderContainer>
                <PlayboardContainer></PlayboardContainer>
                <LetterContainer></LetterContainer>
            </div>
            

        );
    }
}
 
export default Container;
    
