import React, { Component, useCallback } from 'react';
import GuessLetter from './guessLetter';
import HeaderContainer from './headerContainer';
import PlayboardContainer from './playboardContainer';
import LetterContainer from './letterContainer';


class Container extends Component {
    state = { 

        // This is for the letterContainer Component
        keyboardLetters: [
            ['Q','W','E','R','T','Y','U','I','O','P'],
            ['A','S','D','F','G','H','J','K','L'],
            ['ENTER','Z','X','C','V','B','N','M','⌫']
        ],
        // List of accepted letters on typing
        acceptedLetters: ['A','B','C','D','E','F','G','H','I','J','K',"L","M","N","O","P","Q",'R','S','T','U','V','W','X','Y','Y','Z'],
        // Array of 5 string, representing the rows of the game
        guessLetters: ['','','','',''],
        // Keeps track of the completion: 0 = Empty, 1 = Wrong letter, 2 = Wrong place, 3 = Correct letter
        completion: [[],[],[],[],[]],
        // Keeps track of the currently active row
        activeRow: 0,
        // Game over
        isGameOver: false
       
     } 
     constructor(){
        super();
        this.words = ["ALBUM","HINGE","MONEY","SCRAP","GAMER","GLASS","SCOUR","BEING","DELVE","YIELD","METAL","TIPSY","SLUNG","FARCE","GECKO","SHINE","CANNY","MIDST","BADGE","HOMER","TRAIN","STORY","HAIRY","FORGO","LARVA","TRASH","ZESTY","SHOWN","HEIST","ASKEW","INERT","OLIVE","PLANT","OXIDE","CARGO","FOYER","FLAIR","AMPLE","CHEEK","SHAME","MINCE","CHUNK","ROYAL","SQUAD","BLACK","STAIR","SCARE","FORAY","COMMA","NATAL","SHAWL","FEWER","TROPE","SNOUT","LOWLY","STOVE","SHALL","FOUND","NYMPH","EPOXY","DEPOT","CHEST","PURGE","SLOSH","THEIR","RENEW","ALLOW","SAUTE","MOVIE","CATER","TEASE","SMELT","FOCUS","TODAY","WATCH","LAPSE","MONTH","SWEET","HOARD","CLOTH","BRINE","AHEAD","MOURN","NASTY","RUPEE","CHOKE","CHANT","SPILL","VIVID","BLOKE","TROVE","THORN","OTHER","TACIT","SWILL","DODGE","SHAKE","CAULK","AROMA","CYNIC","ROBIN","ULTRA","ULCER","PAUSE","HUMOR","FRAME","ELDER","SKILL","ALOFT","PLEAT","SHARD","MOIST","THOSE","LIGHT","WRUNG","COULD","PERKY","MOUNT","WHACK","SUGAR","KNOLL","CRIMP","WINCE","PRICK","ROBOT","POINT","PROXY","SHIRE","SOLAR","PANIC","TANGY","ABBEY","FAVOR","DRINK","QUERY","GORGE","CRANK","SLUMP","BANAL","TIGER","SIEGE","TRUSS","BOOST","REBUS","UNIFY","TROLL","TAPIR","ASIDE","FERRY","ACUTE","PICKY","WEARY","GRIPE","CRAZE","PLUCK","BRAKE","BATON","CHAMP","PEACH","USING","TRACE","VITAL","SONIC","MASSE","CONIC","VIRAL","RHINO","BREAK","TRIAD","EPOCH","USHER","EXULT","GRIME","CHEAT","SOLVE","BRING","PROVE","STORE","TILDE","CLOCK","WROTE","RETCH","PERCH","ROUGE","RADIO","SURER","FINER","VODKA","HERON","CHILL","GAUDY","PITHY","SMART","BADLY","ROGUE","GROUP","FIXER","GROIN","DUCHY","COAST","BLURT","PULPY","ALTAR","GREAT","BRIAR","CLICK","GOUGE","WORLD","ERODE","BOOZY","DOZEN","FLING","GROWL","ABYSS","STEED","ENEMA","JAUNT","COMET","TWEED","PILOT","DUTCH","BELCH","OUGHT","DOWRY","THUMB","HYPER","HATCH","ALONE","MOTOR","ABACK","GUILD","KEBAB","SPEND","FJORD","ESSAY","SPRAY","SPICY","AGATE","SALAD","BASIC","MOULT","CORNY","FORGE","CIVIC","ISLET","LABOR","GAMMA","LYING","AUDIT","ROUND","LOOPY","LUSTY","GOLEM","GONER","GREET","START","LAPEL","BIOME","PARRY","SHRUB","FRONT","WOOER","TOTEM","FLICK","DELTA","BLEED","ARGUE","SWIRL","ERROR","AGREE","OFFAL","FLUME","CRASS","PANEL","STOUT","BRIBE","DRAIN","YEARN","PRINT","SEEDY","IVORY","BELLY","STAND","FIRST","FORTH","BOOBY","FLESH","UNMET","LINEN","MAXIM","POUND","MIMIC","SPIKE","CLUCK","CRATE","DIGIT","REPAY","SOWER","CRAZY","ADOBE","OUTDO","TRAWL","WHELP","UNFED","PAPER","STAFF","CROAK","HELIX","FLOSS","PRIDE","BATTY","REACT","MARRY","ABASE","COLON","STOOL","CRUST","FRESH","DEATH","MAJOR","FEIGN","ABATE","BENCH","QUIET","GRADE","STINK","KARMA","MODEL","DWARF","HEATH","SERVE","NAVAL","EVADE","FOCAL","BLUSH","AWAKE","HUMPH","SISSY","REBUT","CIGAR"];
        this.randomWord = this.words[Math.floor(Math.random()*this.words.length)];
    };
         // Wordlist
        static words;
        static randomWord;

        
        handleKeypress = (e) =>{

            let {acceptedLetters,guessLetters, activeRow} = this.state;

            //Accepted key was pressed
            if (acceptedLetters.includes(e.key.toUpperCase())) {
                const guessLettersClone = [...guessLetters];
                let guessStringRow = guessLettersClone[activeRow];

                if (guessStringRow.length < 5) {
                    guessStringRow+=e.key.toUpperCase()
                }
                else{
                    return;
                }

                guessLettersClone[activeRow] = guessStringRow;
                this.setState({guessLetters: guessLettersClone});
                

            }
            else if (e.key == "Enter") {

                if (guessLetters[activeRow].length == 5) {
                    if (activeRow+1 < 5) {
                        this.evaluate(guessLetters[activeRow],activeRow);
                        this.setState({activeRow: activeRow+=1});
                    }
                    else if(this.state.isGameOver == false && guessLetters[activeRow].length == 5){
                        this.evaluate(guessLetters[activeRow],activeRow);
                        this.setState({isGameOver: true});
                    };
                }
            }
            else if (e.key == "Backspace") {

                const guessLettersClone = [...guessLetters];
                let guessStringRow = guessLettersClone[activeRow];
                
                if (guessStringRow.length > 0) {
                    guessStringRow = guessStringRow.slice(0,-1);
                }
                else{
                    return;
                }

                guessLettersClone[activeRow] = guessStringRow;
                this.setState({guessLetters: guessLettersClone});

                console.log(guessLettersClone);
                console.log(guessLetters);
                console.log(guessStringRow);
           
            }
            else if (e.key == " ") {

            }


        };
        componentDidMount(){
        
        document.addEventListener("keydown", this.handleKeypress);
        };
        componentWillUnmount(){
        document.removeEventListener("keydown", this.handleKeypress);
        };
        evaluate = (line, activeRow) =>{
            const {randomWord} = this;
            const completionClone = [...this.state.completion];

            // Empty array --> fill with 5 numbers
            const activeLineClone = completionClone[activeRow];

            for (let index = 0; index < line.length; index++) {

                // Correct letter (3)
                if (line[index] == randomWord[index]) {
                    activeLineClone[index] = 3;
                    
                }
                // Contains letter (2)
                else if (randomWord.includes(line[index])) {
                    activeLineClone[index] = 2;
                }
                // Wrong letter
                else{
                    activeLineClone[index] = 1;
                }
                
            }
            completionClone[activeRow] = activeLineClone;
            this.setState({completion: completionClone});

        };

        
        
        render() {
            const {guessLetters, keyboardLetters,completion} = this.state;
        return (
            <div className='gameContainer'>
                <HeaderContainer></HeaderContainer>
                <PlayboardContainer guessLetters={guessLetters} status={completion}></PlayboardContainer>
                <LetterContainer keyboardLetters={keyboardLetters}></LetterContainer>
            </div>
            

        );
    }
}
 
export default Container;
    
