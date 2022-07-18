import React, { Component, createContext, useCallback, useEffect, useState } from 'react';
import GuessLetterRow from './GuessLetterRow';
import { cloneDeep } from 'lodash';
import { Alert, Button } from 'react-bootstrap';


const PlayboardContainer = () => {
    const [fetchData, status, _rowNumber, rowStatus] = initLetters(5,5);
    
     const [entity, setEntity] = useState(fetchData);
     const [states, setStates] = useState(status); //'Empty', 'Absent', 'LetterPresent', 'LetterCorrect'
     const [rowStates, setRowStates] = useState(rowStatus); //'Locked', 'Editable'
     const [rowNumber, setRowNumber] = useState(_rowNumber);
     const [acceptedLetters, setAcceptedLetters] = useState(['A','B','C','D','E','F','G','H','I','J','K',"L","M","N","O","P","Q",'R','S','T','U','V','W','X','Y','Y','Z']);
    let [selectedRow, setSelectedRow] = useState(0);
    let [selectedLetter, setSelectedLetter] = useState(0);
    let [ended, setEnded] = useState(false);
    let fetchedEntity = cloneDeep(entity);
   


        
    function Evaluate(){
        const word = "COBRA";
        const letters = fetchedEntity[selectedRow].map(e => e.letter);

        for (let index = 0; index < letters.length; index++) {
            
            if (letters[index] == word[index]) {
                
                fetchedEntity[selectedRow][index].status = states[3];
            }
            else if(word.includes(letters[index])){
                
                fetchedEntity[selectedRow][index].status = states[2];
            }
            else{
                
                fetchedEntity[selectedRow][index].status = states[1];
            }

        }
       
        setEntity(fetchedEntity);
        if (fetchedEntity[selectedRow].every(x => x.status == states[3])) {

            setEnded(true);

            return true;

            
        }


        return false;
        
    }

        
        const handleTyping = (e) => {
            // Accepted key was pressed
            if (acceptedLetters.includes(e.key.toUpperCase())) {
                // selectedLetter spans from 0-4
                if (selectedLetter < 5 && fetchedEntity[selectedRow][selectedLetter].letter == '') {
                    
                    fetchedEntity[selectedRow][selectedLetter].letter = e.key.toUpperCase();
                    
                    setSelectedLetter(selectedLetter+=1);
                    

                    setEntity(fetchedEntity);
                }
                
            }
            else if (e.key == "Enter") {

                if (selectedLetter == 5 && selectedRow < rowNumber-1) {
                    fetchedEntity[selectedRow].forEach(element => {
                        element.rowStatus = rowStates[0];
                    });
                    // Evaluate
                    if (Evaluate() == true) {
                        return;
                    }
                    setSelectedRow(selectedRow+=1);
                    setSelectedLetter(0);


                }
                else if (selectedLetter == 5 && selectedRow == rowNumber-1) {
                    fetchedEntity[selectedRow].forEach(element => {
                        element.rowStatus = rowStates[0];
                    });
                    // Evaluate
                    if (Evaluate() == true) {
                        return;
                    }

                    //todo: get rid of spamming evaluate
                }

            }
            else if (e.key == "Backspace") {

               if (selectedLetter <= 5 && selectedLetter > 0 && fetchedEntity[selectedRow][selectedLetter-1].letter != '' && fetchedEntity[selectedRow][selectedLetter-1].rowStatus == 'Editable') {
                
                   setSelectedLetter(selectedLetter-=1);
                   fetchedEntity[selectedRow][selectedLetter].letter = '';

               }
               setEntity(fetchedEntity);
            }
            else if (e.key == " " && ended == true) {
                setEnded(false);
                setSelectedRow(0);
                setSelectedLetter(0);
                setEntity(fetchData);
                fetchedEntity = cloneDeep(entity);
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

        

        function initLetters(_rowNumber, colNumber) {
            const status = ['Empty', 'Absent', 'LetterPresent', 'LetterCorrect'];
            const rowStatus = ['Locked','Editable'];
            
            const fetchData = [];
            let bundle = []; // Holds 5 entities
            for (let index = 0; index < _rowNumber * colNumber; index++) {
                const bundleData = {
                    id: index + 1,
                    key: index + 1,
                    letter: '',
                    status: status[0],
                    rowStatus: rowStatus[1]
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
    
            return [fetchData,status, _rowNumber, rowStatus];
            };

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


