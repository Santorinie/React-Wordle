import React, { Component } from 'react';


class letterContainer extends Component {
    state = {  } 

    
    render() { 
        const {keyboardLetters,onClick, letterState} = this.props;
        const map = [
            {num: 3, cname: 'LetterCorrect'},
            {num: 2, cname: 'LetterPresent'},
            {num: 1, cname: 'Absent'},
            {num: 0, cname: 'Empty'}
        ];
       
       


        return (
        <div className='letterContainer'>{
            keyboardLetters.map((e,index) => <div key={index} className='lettersRow'>
            {e.map((l,index) => <div key={index} onClick={() => onClick(l)} className={(l.length == 1 ? 'letter' : 'letter specialChar')+' '+(map.find(x => x.num == letterState.find(y => y.letter == l).status)).cname}>{l}</div>)}
            </div>)
        }</div>
        );
    }
}
 
export default letterContainer;