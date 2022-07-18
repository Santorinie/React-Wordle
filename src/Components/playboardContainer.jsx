import React, { Component, createContext, useCallback, useEffect } from 'react';
import GuessLetterRow from './GuessLetterRow';

class PlayboardContainer extends Component {
    state = { 
        
     } 
     

     constructor(props){
        super(props);
        const [fetchData, states, rowNumber] = this.initLetters(5,5);

        this.state = {
            entity: fetchData ,
            states: states,
            rowNumber: rowNumber,
            acceptedLetters: ['A','B','C','D','E','F','G','H','I','J','K',"L","M","N","O","P","Q",'R','S','T','U','V','W','X','Y','Y','Z'],
            selectedRow: 1,
            selectedLetter: 1
        };
         //console.log("Updated state:", this.state);

     }



     



     render() { 
        const handleKeypress = useCallback(
            (e) => {
                console.log("klikk",e.key);
            },
            []
          );
        
          useEffect(() => {
            document.addEventListener("keydown", handleKeypress);
            return () => document.removeEventListener("keydown", handleKeypress);
          }, [handleKeypress]);



        const rowList = [];
        for (let index = 0; index < this.state.rowNumber; index++) {
            
            rowList.push(<GuessLetterRow key={index} id={index} bundle={this.state.entity[index]}></GuessLetterRow>);
            
        }
       
        return (
            

            <div className="playboardContainer">
               {rowList}
            </div>

        );
    }

    initLetters(rowNumber, colNumber) {
        const states = ['Empty', 'Absent', 'LetterPresent', 'LetterCorrect'];
        
        const fetchData = [];
        let bundle = []; // Holds 5 entities
        for (let index = 0; index < rowNumber * colNumber; index++) {
            const bundleData = {
                id: index + 1,
                key: index + 1,
                letter: '',
                status: states[0],
            };

            if (bundle.length == 5) {
                
                fetchData.push(bundle);
                bundle = [];
                bundle.push(bundleData);
            }
            else if((rowNumber*colNumber)-1 == index){
                bundle.push(bundleData);
                fetchData.push(bundle);
            }
            else{

                bundle.push(bundleData);
            }

        };

        return [fetchData,states, rowNumber];
    }
}
 
export default PlayboardContainer;


