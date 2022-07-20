import React, { Component, createContext, useCallback, useEffect, useState } from 'react';
import GuessLetterRow from './GuessLetterRow';
import { cloneDeep } from 'lodash';
import { Alert, Button } from 'react-bootstrap';


const PlayboardContainer = (props) => {

    // Destructurizing props
    const {guessLetters, status} = props;

    const rows = guessLetters.map((row,index) => <GuessLetterRow key={index} guessLetters={row} status={status[index]}></GuessLetterRow>);

    return (
        <div className="playboardContainer">
               {rows}
        </div>
    );
    

    
}
 
export default PlayboardContainer;


