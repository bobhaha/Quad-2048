# Quad-2048
If you like the game 2048, you'll love Quad 2048 4 times more!

<img src="https://img.shields.io/github/license/bobhaha/Quad-2048" /> <img src="https://img.shields.io/badge/Quad-2048%20clone-edc22e" /> <img src="https://img.shields.io/github/last-commit/bobhaha/Quad-2048" /> <img src="https://img.shields.io/website?down_color=red&down_message=offline&up_color=5bc236&up_message=onlilne&url=https%3A%2F%2Fbobhaha.github.io/Quad-2048" />

**Work in progress** feel free to contribute to the project by reporting issues or by creating a pull request

## Playing Quad-2048
### General
To play Quad-2048 locally, simply copy the github repo to your PC and open the index.html file.

You can also visit the online github page and play online: [Quad-2048 Github Pages](https://bobhaha.github.io/Quad-2048/)

## How To Play
### Rules
2048 is a game centered around a 4×4 grid. When you start the game, there will be two “tiles” on the grid, each displaying the number 2 or 4. You hit the arrow keys on your keyboard to move the tiles around which generates new tiles valued at 2 or 4. When two equal tiles collide, they combine to give you one greater tile that displays their sum. The more you do this, the higher the values of the tiles get, and the more crowded the board becomes. Your objective is to reach 2048 before the board fills up. 

Quad-2048 takes this game and makes it 4 times harder! By clicking the "randomize all games" button, now you have 4 seperate games all being played at the same time. The player must be strategic on their next move as all 4 boards will be affected by their move. If you are able to hit 2048 in this mode, your brain must be massive!

### Controls
Left Arrow Key - Moves all pieces on the board to the left

Right Arrow Key - Moves all pieces on the board to the right

Up Arrow Key - Moves all pieces on the board up

Down Arrow Key -  Moves all pieces on the board down

## Game Modes
### Normal Mode
This mode is the defualt. All four game boards are played in unison. You are esentially playing one game but copied across all the boards (very mesmerizing) 

![Normal Mode Image](https://github.com/bobhaha/Quad-2048/blob/main/docs/normalGameMode.png?raw=true)

### Randomized Game Mode (HARD MODE!)
This game mode is activated when the player clicks the "randomize all games" button. In this mode, the boards are initalized randomly and as you play the game the new cells that get added to the board are placed in random potisions on each board. This results in 4 seperate games being played at the same time. This mode is extremely hard as the player will need to be strategic about each and every move they make. Good Luck!

![Hard Mode Image](https://github.com/bobhaha/Quad-2048/blob/main/docs/randomizedGameMode.png?raw=true)

## To Do List
- Bugfix: Game over is set to true when game board is full, even though the player can still make some additional moves
- Bugfix: There are issues with the score in normal mode
- Bugfix: Fix page responsive issue when using a smaller screen < 1920 x 1080 resolution
- Add feature: Make game touchscreen compatible
- Add feature: When in hard mode, score needs to be a sum of all 4 game board scores
- Add feature: Add a highscore 
- Add feature: Build a scoreboard so people can try to beat other players highscore
