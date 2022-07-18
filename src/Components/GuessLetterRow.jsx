import React, { Component } from 'react';
import GuessLetter from './guessLetter';


class GuessLetterRow extends Component {
    state = {  } 
    render() { 
        
        return (

            <div className='guessLetterRow'>
                {this.props.bundle.map(e => <GuessLetter data={e} key={e.id} id={e.id}></GuessLetter>)}
            </div>
        );
    }
}
 
export default GuessLetterRow;