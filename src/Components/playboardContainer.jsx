import React, { Component, createContext, useCallback, useEffect, useState } from 'react';
import GuessLetterRow from './GuessLetterRow';
import { cloneDeep } from 'lodash';

const PlayboardContainer = () => {
    const [fetchData, status, _rowNumber] = initLetters(5,5);

     const [entity, setEntity] = useState(fetchData);
     const [states, setStates] = useState(status);
     const [rowNumber, setRowNumber] = useState(_rowNumber);
     const [acceptedLetters, setAcceptedLetters] = useState(['A','B','C','D','E','F','G','H','I','J','K',"L","M","N","O","P","Q",'R','S','T','U','V','W','X','Y','Y','Z']);
    let [selectedRow, setSelectedRow] = useState(0);
    let [selectedLetter, setSelectedLetter] = useState(0);

     function initLetters(_rowNumber, colNumber) {
        const status = ['Empty', 'Absent', 'LetterPresent', 'LetterCorrect'];
        
        const fetchData = [];
        let bundle = []; // Holds 5 entities
        for (let index = 0; index < _rowNumber * colNumber; index++) {
            const bundleData = {
                id: index + 1,
                key: index + 1,
                letter: '',
                status: status[0],
            };

            if (bundle.length == 5) {
                
                fetchData.push(bundle);
                bundle = [];
                bundle.push(bundleData);
            }
            else if((_rowNumber*colNumber)-1 == index){
                bundle.push(bundleData);
                fetchData.push(bundle);
            }
            else{

                bundle.push(bundleData);
            }

        };

        return [fetchData,status, _rowNumber];
        };

        const fetchedEntity = cloneDeep(entity);
        const handleTyping = (e) => {
            
            if (acceptedLetters.includes(e.key.toUpperCase())) {
                
                if (selectedLetter < 5 && fetchedEntity[selectedRow][selectedLetter].letter == '') {
                    
                    fetchedEntity[selectedRow][selectedLetter].letter = e.key.toUpperCase();
                    
                    setSelectedLetter(selectedLetter+=1);
                    

                }
                setEntity(fetchedEntity);
                
            }
            else if (e.key == "Enter") {

                if (selectedLetter == 5 && selectedRow+1 < rowNumber) {
                    setSelectedRow(selectedRow+=1);
                    setSelectedLetter(0);
                }

            }
            else if (e.key == "Backspace") {

               if (selectedLetter <= 5 && selectedLetter > 0 && fetchedEntity[selectedRow][selectedLetter-1].letter != '') {
                
                   setSelectedLetter(selectedLetter-=1);
                   fetchedEntity[selectedRow][selectedLetter].letter = '';

               }
               setEntity(fetchedEntity);
            }

       };


        const handleKeypress = 
            (e) => {
                handleTyping(e);
            };
        
          useEffect(() => {
            document.addEventListener("keydown", handleKeypress);
            return () => document.removeEventListener("keydown", handleKeypress);
          }, [handleKeypress]);



        const rowList = [];
        for (let index = 0; index < rowNumber; index++) {
            
            rowList.push(<GuessLetterRow key={index} id={index} bundle={entity[index]}></GuessLetterRow>);
            
        }
       
        return (
            

            <div className="playboardContainer">
               {rowList}
            </div>

        );
    

    
}
 
export default PlayboardContainer;


