import React, { Component, createContext, useCallback, useEffect, useState } from 'react';
import GuessLetterRow from './GuessLetterRow';
import { cloneDeep } from 'lodash';
import { Alert, Button } from 'react-bootstrap';


const PlayboardContainer = () => {
    const [fetchData, status, _rowNumber, rowStatus] = initLetters(5,5);
    const words = ["ALBUM","HINGE","MONEY","SCRAP","GAMER","GLASS","SCOUR","BEING","DELVE","YIELD","METAL","TIPSY","SLUNG","FARCE","GECKO","SHINE","CANNY","MIDST","BADGE","HOMER","TRAIN","STORY","HAIRY","FORGO","LARVA","TRASH","ZESTY","SHOWN","HEIST","ASKEW","INERT","OLIVE","PLANT","OXIDE","CARGO","FOYER","FLAIR","AMPLE","CHEEK","SHAME","MINCE","CHUNK","ROYAL","SQUAD","BLACK","STAIR","SCARE","FORAY","COMMA","NATAL","SHAWL","FEWER","TROPE","SNOUT","LOWLY","STOVE","SHALL","FOUND","NYMPH","EPOXY","DEPOT","CHEST","PURGE","SLOSH","THEIR","RENEW","ALLOW","SAUTE","MOVIE","CATER","TEASE","SMELT","FOCUS","TODAY","WATCH","LAPSE","MONTH","SWEET","HOARD","CLOTH","BRINE","AHEAD","MOURN","NASTY","RUPEE","CHOKE","CHANT","SPILL","VIVID","BLOKE","TROVE","THORN","OTHER","TACIT","SWILL","DODGE","SHAKE","CAULK","AROMA","CYNIC","ROBIN","ULTRA","ULCER","PAUSE","HUMOR","FRAME","ELDER","SKILL","ALOFT","PLEAT","SHARD","MOIST","THOSE","LIGHT","WRUNG","COULD","PERKY","MOUNT","WHACK","SUGAR","KNOLL","CRIMP","WINCE","PRICK","ROBOT","POINT","PROXY","SHIRE","SOLAR","PANIC","TANGY","ABBEY","FAVOR","DRINK","QUERY","GORGE","CRANK","SLUMP","BANAL","TIGER","SIEGE","TRUSS","BOOST","REBUS","UNIFY","TROLL","TAPIR","ASIDE","FERRY","ACUTE","PICKY","WEARY","GRIPE","CRAZE","PLUCK","BRAKE","BATON","CHAMP","PEACH","USING","TRACE","VITAL","SONIC","MASSE","CONIC","VIRAL","RHINO","BREAK","TRIAD","EPOCH","USHER","EXULT","GRIME","CHEAT","SOLVE","BRING","PROVE","STORE","TILDE","CLOCK","WROTE","RETCH","PERCH","ROUGE","RADIO","SURER","FINER","VODKA","HERON","CHILL","GAUDY","PITHY","SMART","BADLY","ROGUE","GROUP","FIXER","GROIN","DUCHY","COAST","BLURT","PULPY","ALTAR","GREAT","BRIAR","CLICK","GOUGE","WORLD","ERODE","BOOZY","DOZEN","FLING","GROWL","ABYSS","STEED","ENEMA","JAUNT","COMET","TWEED","PILOT","DUTCH","BELCH","OUGHT","DOWRY","THUMB","HYPER","HATCH","ALONE","MOTOR","ABACK","GUILD","KEBAB","SPEND","FJORD","ESSAY","SPRAY","SPICY","AGATE","SALAD","BASIC","MOULT","CORNY","FORGE","CIVIC","ISLET","LABOR","GAMMA","LYING","AUDIT","ROUND","LOOPY","LUSTY","GOLEM","GONER","GREET","START","LAPEL","BIOME","PARRY","SHRUB","FRONT","WOOER","TOTEM","FLICK","DELTA","BLEED","ARGUE","SWIRL","ERROR","AGREE","OFFAL","FLUME","CRASS","PANEL","STOUT","BRIBE","DRAIN","YEARN","PRINT","SEEDY","IVORY","BELLY","STAND","FIRST","FORTH","BOOBY","FLESH","UNMET","LINEN","MAXIM","POUND","MIMIC","SPIKE","CLUCK","CRATE","DIGIT","REPAY","SOWER","CRAZY","ADOBE","OUTDO","TRAWL","WHELP","UNFED","PAPER","STAFF","CROAK","HELIX","FLOSS","PRIDE","BATTY","REACT","MARRY","ABASE","COLON","STOOL","CRUST","FRESH","DEATH","MAJOR","FEIGN","ABATE","BENCH","QUIET","GRADE","STINK","KARMA","MODEL","DWARF","HEATH","SERVE","NAVAL","EVADE","FOCAL","BLUSH","AWAKE","HUMPH","SISSY","REBUT","CIGAR"];
     const [entity, setEntity] = useState(fetchData);
     const [states, setStates] = useState(status); //'Empty', 'Absent', 'LetterPresent', 'LetterCorrect'
     const [rowStates, setRowStates] = useState(rowStatus); //'Locked', 'Editable'
     const [rowNumber, setRowNumber] = useState(_rowNumber);
     const [acceptedLetters, setAcceptedLetters] = useState(['A','B','C','D','E','F','G','H','I','J','K',"L","M","N","O","P","Q",'R','S','T','U','V','W','X','Y','Y','Z']);
    let [selectedRow, setSelectedRow] = useState(0);
    let [selectedLetter, setSelectedLetter] = useState(0);
    let [ended, setEnded] = useState(false);
    let fetchedEntity = cloneDeep(entity);
    const [word, setWord] = useState(words[Math.floor(Math.random()*words.length)]);


        
    function Evaluate(){
        
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

        setSelectedRow(selectedRow+=1);
        setSelectedLetter(0);
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



                }
                else if (selectedLetter == 5 && selectedRow == rowNumber-1) {
                    fetchedEntity[selectedRow].forEach(element => {
                        element.rowStatus = rowStates[0];
                    });
                    // Evaluate
                    if (Evaluate() == true) {
                        return;
                    }
                    setEnded(true);
                    
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
                setWord(words[Math.floor(Math.random()*words.length)]);
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


