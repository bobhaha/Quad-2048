// Initialize the game
const board1 = new Board();
const board2 = new Board();
const board3 = new Board();
const board4 = new Board();

const gameBoards = [board1,board2,board3,board4]

randomStart();
drawBoard();

// Event listener for arrow keys
document.addEventListener('keydown', (event) =>{

    if(event.key == "ArrowLeft"){mergeLeft()}
    if(event.key == "ArrowRight"){mergeRight()}
    if(event.key == "ArrowUp"){mergeUp()}
    if(event.key == "ArrowDown"){mergeDown()}
    drawBoard();
}, false)

// This toggles the game mode
// If you randomize the game, each board will be given a different start position (HARD MODE)
document.querySelector("input[name=randomize_all_games]").addEventListener('change', resetGame);

function randomStart(){

    // If the randomize game mode is selected, choose a random starting spot
    // on each game board and place a "2" in the position
    if(document.getElementById("randomize_option").checked == true){
        board1.cellVal[Math.floor(Math.random() * 16)] = 2;
        board2.cellVal[Math.floor(Math.random() * 16)] = 2;
        board3.cellVal[Math.floor(Math.random() * 16)] = 2;
        board4.cellVal[Math.floor(Math.random() * 16)] = 2;
    }
    // If the randomize option is not selected, each board has the same starting
    // condition and a "2" is placed on the board in the same cell
    else{
        let index = Math.floor(Math.random() * 16)
        board1.cellVal[index] = 2;
        board2.cellVal[index] = 2;
        board3.cellVal[index] = 2;
        board4.cellVal[index] = 2;
    }

    // The game must be initalized with 2 starting numbers on the board
    addRandomCell()

}

function assignColours(){
    gameBoards.forEach(board => {board.assignColour()});
}

function drawBoard(){

    // For each of the boards, iterate over the array and update the values of each cell on the board
    // If the cell in the array is 0, then blank out the value of the board cell.
    gameBoards.forEach(board => {
        for(let i = 0; i < 16; i++){
            if(board.cellVal[i] == 0){document.getElementById(`b${board.ID}c${i.toString()}`).innerHTML = ""}
            else{document.getElementById(`b${board.ID}c${i.toString()}`).innerHTML = board.cellVal[i].toString()}
        }
    });

    // If the "randomize game" checkbox is ticked, then all the board scores are added together and displayed
    // Otherwise board1 score is shown as all other boards will have the same score.
    if(document.getElementById("randomize_option").checked == true){
        document.getElementById("score").innerHTML = "Score: " + (board1.score + board2.score + board3.score + board4.score)
    }else{
        document.getElementById("score").innerHTML = "Score: " + board1.score;
    }
    
    // Now that all the board cells have been updated, run the assignColour function to style the cells
    assignColours()
}

function resetGame(){

    gameBoards.forEach(board => {board.resetBoard()});
    randomStart()
    drawBoard()
}


function addRandomCell(){

    // If the randomize option is selected, add a number to a random spot on each board
    if(document.getElementById("randomize_option").checked == true){
        gameBoards.forEach(board => {

            // Create an array of positions in the board array, where cell value = 0
            let board_emptyCells = board.getEmptyCellArrayPosition()
    
            // Check if the array comes back empty, if so there are no free spots
            if(board_emptyCells.length == 0) return
    
            // Choose a random spot on the board to place the next number
            let randomCellIndex = board_emptyCells[Math.floor(Math.random() * board_emptyCells.length)]
    
            // If the randomize option is selected, add a number randomly into each board
            if(document.getElementById("randomize_option").checked == true){
                if(Math.floor(Math.random() * 100) < 25){
                    // Add a 4 onto the board
                    board.cellVal[randomCellIndex] = 4;
                }else{
                    // Add a 2 into each board
                    board.cellVal[randomCellIndex] = 2;
                }
            }
        })
    }

    // If the randomize option is NOT selected, add a number to the same spot on each board
    else{
        // Create an array of positions in the board array, where cell value = 0
        let board_emptyCells = board1.getEmptyCellArrayPosition()

        // Check if the array comes back empty, if so there are no free spots
        if(board_emptyCells.length == 0) return 

        // Choose a random spot on the board to place the next number
        let randomCellIndex = board_emptyCells[Math.floor(Math.random() * board_emptyCells.length)]

        if(Math.floor(Math.random() * 100) < 25){
            // Add a 4 into each board
           board1.cellVal[randomCellIndex] = 4;
           board2.cellVal[randomCellIndex] = 4;
           board3.cellVal[randomCellIndex] = 4;
           board4.cellVal[randomCellIndex] = 4;
        }else{
          // Add a 2 into each board
          board1.cellVal[randomCellIndex] = 2;
          board2.cellVal[randomCellIndex] = 2;
          board3.cellVal[randomCellIndex] = 2;
          board4.cellVal[randomCellIndex] = 2;
        }
    }
}

function checkGameOver(board){

    if(board.gameOver) return true

    // Break board into arrays by row
    let row0 = [board.cellVal[0],  board.cellVal[1],  board.cellVal[2],  board.cellVal[3]]
    let row1 = [board.cellVal[4],  board.cellVal[5],  board.cellVal[6],  board.cellVal[7]]
    let row2 = [board.cellVal[8],  board.cellVal[9],  board.cellVal[10], board.cellVal[11]]
    let row3 = [board.cellVal[12], board.cellVal[13], board.cellVal[14], board.cellVal[15]]
    let boardRows = [row0,row1,row2,row3]

    // There are three conditions where game over is true...
    // 1. No adjacent elements in row array are equal
    // 2. No elements in row array of same index are equal where vertically adjacent
    // 3. No zeros are present on the board

    // Keep track of the conditions (default is game over)
    let condition1 = true
    let condition2 = true
    let condition3 = true

    // Check to see if adjacent elements are equal to eachother
    // Sets condition1 to false if two adjacent elements are equal (game can continue)
    boardRows.forEach(row => {
        for(let i = 0; i < 2; i++){
            if(row[i] == row[i+1]){condition1 = false}
            if(row.find(element => element == 0) == 0){condition3 = false}
        }
    });

    // Check if elements vertically in the rows are equal 
    // Sets condition2 to false if to vertically adjacent elemtnets are equal (game can continue)
    for (let i = 0; i < 2; i++) {
        if(boardRows[0][i] == boardRows[1][i]){condition2 = false}
        if(boardRows[1][i] == boardRows[2][i]){condition2 = false}
        if(boardRows[2][i] == boardRows[3][i]){condition2 = false}
    }

    // Set 
    if(condition1 && condition2 && condition3){board.setGameOver(true)}

    // If either of the conditions are false, game is not over, continue playing
    return board.gameOver
}

function mergeLeft(){

    let mergeSuccess = false

    gameBoards.forEach(board => {

        // If the board gameOver property is set to true, do not merge left
        if(board.gameOver) return

        // Peek ahead, if no moves are possible, do not merge left
        if(checkGameOver(board)) return

        // Break board into arrays by row
        let row0 = [board.cellVal[0],  board.cellVal[1],  board.cellVal[2],  board.cellVal[3]]
        let row1 = [board.cellVal[4],  board.cellVal[5],  board.cellVal[6],  board.cellVal[7]]
        let row2 = [board.cellVal[8],  board.cellVal[9],  board.cellVal[10], board.cellVal[11]]
        let row3 = [board.cellVal[12], board.cellVal[13], board.cellVal[14], board.cellVal[15]]
        let boardRows = [row0,row1,row2,row3]  
        
        // Move any empty cells to the end of the array
        // Result is that all non-zero numbers will be moved to the beginning of the array, in their original order
        for(let i = 0; i < 4; i++){
            row0.push(row0.splice(row0.indexOf(0), 1)[0]);
            row1.push(row1.splice(row1.indexOf(0), 1)[0]);
            row2.push(row2.splice(row2.indexOf(0), 1)[0]);
            row3.push(row3.splice(row3.indexOf(0), 1)[0]);
        } 

        // Checks to see if two adjacent elements are equal (and not equal to 0)
        // If so, update the score, update the value of the board pieces
        for(let j = 0; j < 4; j++){
           for(let i = 0; i < 4; i++){
                if(boardRows[j][i] == boardRows[j][i+1] && boardRows[j][i] != 0){
                    board.score += (boardRows[j][i] * 2)
                    boardRows[j][i] *= 2
                    boardRows[j][i+1] = 0
                }
            }
        }

        // Move any empty cells to the end of the array
        // Result is that all non-zero numbers will be moved to the beginning of the array, in their original order
        for(let i = 0; i < 4; i++){
            row0.push(row0.splice(row0.indexOf(0), 1)[0]);
            row1.push(row1.splice(row1.indexOf(0), 1)[0]);
            row2.push(row2.splice(row2.indexOf(0), 1)[0]);
            row3.push(row3.splice(row3.indexOf(0), 1)[0]);
        } 

        // Concat the new board values, so we can compare with the original
        let updatedBoardCellVals = row0.concat(row1,row2,row3)

        // Check if anything actually changed. If not, do not proceed
        //if(board.cellVal == updatedBoardCellVals){return}
        if(board.cellVal.every((value, index) => value === updatedBoardCellVals[index])) return

        // Update the board values and set merge success to true
        board.cellVal = updatedBoardCellVals
        mergeSuccess = true

    });

    // If the merge was successful, add a random cell to the boards
    // This is to prevent adding cells to the board when merging left was not a valid move
    if(mergeSuccess) addRandomCell()
}

function mergeRight(){

    // To reuse the mergeLeft function we will reverse the order of each of the board arrays
    gameBoards.forEach(board => board.cellVal.reverse())

    // Merge the reversed arrays left
    mergeLeft()

    // Reverse the arrays again to display the board in the correct orientation
    gameBoards.forEach(board => board.cellVal.reverse())

}

function mergeUp(){

    // To reuse the mergeLeft function we need to transform the current arrays
    // so that the direction of merge is orientated left (in this case we need to rotate the array left 90 degrees)

    gameBoards.forEach(board =>{

        let row1 = [board.cellVal[3],board.cellVal[7],board.cellVal[11],board.cellVal[15]]
        let row2 = [board.cellVal[2],board.cellVal[6],board.cellVal[10],board.cellVal[14]]
        let row3 = [board.cellVal[1],board.cellVal[5],board.cellVal[9],board.cellVal[13]]
        let row4 = [board.cellVal[0],board.cellVal[4],board.cellVal[8],board.cellVal[12]]
        board.cellVal = row1.concat(row2,row3,row4)
    })

    // Perform the merge
    mergeLeft()

    // Re-orientate the arrays in the correct position (rotate the array right by 90 degrees)
    gameBoards.forEach(board =>{

        let row1 = [board.cellVal[12],board.cellVal[8],board.cellVal[4],board.cellVal[0]]
        let row2 = [board.cellVal[13],board.cellVal[9],board.cellVal[5],board.cellVal[1]]
        let row3 = [board.cellVal[14],board.cellVal[10],board.cellVal[6],board.cellVal[2]]
        let row4 = [board.cellVal[15],board.cellVal[11],board.cellVal[7],board.cellVal[3]]
        board.cellVal = row1.concat(row2,row3,row4)
    })

}

function mergeDown(){

    // To reuse the mergeLeft function we need to transform the current arrays
    // So that the direction of merge is orientated left (in this case we need to rotate the array left 90 degrees then reverse the order of the array)

    gameBoards.forEach(board =>{

        let row1 = [board.cellVal[3],board.cellVal[7],board.cellVal[11],board.cellVal[15]]
        let row2 = [board.cellVal[2],board.cellVal[6],board.cellVal[10],board.cellVal[14]]
        let row3 = [board.cellVal[1],board.cellVal[5],board.cellVal[9],board.cellVal[13]]
        let row4 = [board.cellVal[0],board.cellVal[4],board.cellVal[8],board.cellVal[12]]
        board.cellVal = row1.concat(row2,row3,row4).reverse()
    })

    // Perform the merge
    mergeLeft()

    // Re-orientate the arrays in the correct position (rotate the array right by 90 degrees then reverse the order)
    gameBoards.forEach(board =>{

        let row1 = [board.cellVal[12],board.cellVal[8],board.cellVal[4],board.cellVal[0]]
        let row2 = [board.cellVal[13],board.cellVal[9],board.cellVal[5],board.cellVal[1]]
        let row3 = [board.cellVal[14],board.cellVal[10],board.cellVal[6],board.cellVal[2]]
        let row4 = [board.cellVal[15],board.cellVal[11],board.cellVal[7],board.cellVal[3]]
        board.cellVal = row1.concat(row2,row3,row4).reverse()
    })


}