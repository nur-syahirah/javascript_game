# 🎩 Find Your Hat Game

## Overview
Find Your Hat is an interactive terminal-based game where players navigate through a field of grass, avoiding holes, to find their hat. 
This simple yet engaging game uses colorful ASCII art, animations, and intuitive controls to provide an enjoyable gaming experience right in your terminal.


### Game Elements:
* **Player (☻)**: You control this character using directional commands
* **Hat (^)**: Your goal is to find this item
* **Grass (░)**: Safe terrain to move across
* **Holes (O)**: Dangerous areas you must avoid

### How to Play:
Navigate through the field using the following commands:
| Movement   | Key |
| ------ |:-----:|
| Up     | w     |
| Down   | s     |
| Left   | a     |
| Right  | d     |
| Quit   | q     |

The objective is to find your hat without:

1. Falling into a hole
2. Moving outside the boundaries of the field

### Game Features
* __Difficulty Settings__: Choose between Easy (fewer holes) and Difficult (more holes)
* __Colorful Interface__: Enjoy visually appealing colored text and elements
* __Animated Messages__: Experience dynamic animations for welcome, victory, and game over screens
* __Simple Controls__: Intuitive keyboard commands for easy navigation

### Prerequisites

Node.js (version 12 or higher recommended)
npm (Node Package Manager)

### Setup:
1. Clone the repository or download the game files

```
git clone https://github.com/nur-syahirah/javascript_game.git
```
2. Install dependencies
```
npm install
```
3. Run the game
```
node find_your_hat.js
```
### Dependencies
* prompt-sync: For handling user input
* chalk: For colorful terminal text
* chalk-animation: For animated text effects

### Game Logic
The game generates a random field with grass and holes. Your character starts at the top-left position (a.k.a starting point) and the hat is placed randomly elsewhere in the field. The difficulty level affects the probability of holes appearing in the field.

### Tips
* Plan your route carefully before moving
* In difficult mode, create a mental map of safe passages
* If you get stuck, remember you can always quit and start a new game

### Credits
Created as a fun interactive terminal-based game for JavaScript practice. Good luck and enjoy playing the finding your hat game!
