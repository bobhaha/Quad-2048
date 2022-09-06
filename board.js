class Board {
    static nextID = 0;

    constructor(){
        Board.incrementID()
        this.ID = Board.nextID;
        this.score = 0;
        this.gameOver = false;

        this.cellVal = new Array(16).fill(0);
        this.initializeBoard();
    }

    // Indcrements the ID in the Board class
    static incrementID(){
        this.nextID ++;
    }

    // For each of the 16 cells in each game board, create a new div and give it a unique ID
    initializeBoard() {
        for(let i = 0; i < 16; i ++){
            const newDiv = document.createElement('div'); 
            newDiv.setAttribute('id', `b${this.ID}c`+i)
            document.getElementById(`board${this.ID}`).appendChild(newDiv);
        }
    }

    // Sets the state of the board. If gameOver is set to true, move the gameOver div element to the front
    setGameOver(state){
        this.gameOver = state
        if(this.gameOver){
            document.getElementById(`b${this.ID}GameOver`).style.zIndex = 999
        }else{
            document.getElementById(`b${this.ID}GameOver`).style.zIndex = -1
        }
    }

    // Returns an array of positions in the board array, where cell value = 0
    getEmptyCellArrayPosition(){
        let EmptyCellArrayPositions = []
        this.cellVal.forEach((cellValue, index) =>{
            if (cellValue == 0) EmptyCellArrayPositions.push(index)
        })
        return EmptyCellArrayPositions
    }

    // Resets the board. Sets gameOver to false, fills the board array with 0's and resets the score
    resetBoard(){
        this.setGameOver(false)
        this.cellVal = new Array(16).fill(0)
        this.score = 0
    }

    // Sets the class property to each div element in the board depending on its cell value
    assignColour(){
        for(let i = 0; i < 16; i++){
            if(this.cellVal[i] == 0)   {document.getElementById(`b${this.ID}c`+i.toString()).removeAttribute('class')}
            if(this.cellVal[i] == 2)   {document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'two')}
            if(this.cellVal[i] == 4)   {document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'four')}
            if(this.cellVal[i] == 8)   {document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'eight')}
            if(this.cellVal[i] == 16)  {document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'sixteen')}
            if(this.cellVal[i] == 32)  {document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'thirtytwo')}
            if(this.cellVal[i] == 64)  {document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'sixtyfour')}
            if(this.cellVal[i] == 128) {document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'onetwentyeight')}
            if(this.cellVal[i] == 256) {document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'twofiftysix')}
            if(this.cellVal[i] == 512) {document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'fivetwelve')}
            if(this.cellVal[i] == 1024){document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'onezerotwofour')}
            if(this.cellVal[i] >= 2048){document.getElementById(`b${this.ID}c`+i.toString()).setAttribute('class', 'twozerofoureight')}
        }
    }
}