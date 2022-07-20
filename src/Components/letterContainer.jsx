import React, { Component } from 'react';


class letterContainer extends Component {
    state = {  } 

    
    render() { 


        return (
        <div className='letterContainer'>{
            this.props.keyboardLetters.map(e => <div key={this.props.keyboardLetters.indexOf(e)} className='lettersRow'>
            {e.map(l => <div key={this.props.keyboardLetters[this.props.keyboardLetters.indexOf(e)].indexOf(l)} onClick={() => this.props.onChange(l)} className={l.length == 1 ? 'letter' : 'letter specialChar'}>{l}</div>)}
            </div>)
        }</div>
        );
    }
}
 
export default letterContainer;