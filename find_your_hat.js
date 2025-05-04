import promptSync from "prompt-sync";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const prompt = new promptSync({ sigint: true });

// Constants for the game
const WIN = "Yeayyy! Finally, you found ze hat!";
//const LOSE = "Ohoh! You fell into a hole!";
const OUT_BOUNDS = "Oppsie! You are going out of field!";
const INTO_HOLE = "BYE! You fell into a hole!";
const WELCOME = "   EllO! Welcome to Find Your Hat Game!";
const DIFFICULTY_PROMPT = "Choose difficulty level: \n 1: Easy (fewer holes) \n 2: Difficult (more holes) \n q: Quit game";
const DIRECTIONS = "Which direction: \n up(w) \n down(s)\n left(a)\n right(d)?\n";
const QUIT = "Or press (q) or (Q) to quit";
const END_GAME = "GAME OVER";
const NOT_RECOGNIZED = "\n Sadly, that input was not recognized. Try again! ";

// Constants for difficulty levels
const EASY_HOLE_CHANCE = 0.15;          // 15% chance of a hole in easy level
const DIFFICULT_HOLE_CHANCE = 0.35;     // 35% chance of a hole in difficult leve

// Constants for the game elements
const HAT = chalk.cyanBright("^");
const HOLE = "O";
const GRASS = chalk.green("░");
const PLAYER = chalk.redBright("☻");

// Constants for creating the field
const ROWS = 5;
const COLS = 10;

//Create the class for the field
class Field {

  // Constructors for the field at game initialization
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.field = new Array();
    this.gamePlay = false;
    this.playerPosition = {
      row: 0,
      col: 0, 
    };
    this.difficultyLevel = EASY_HOLE_CHANCE;                   // Default set to easy mode
  }

  static welcomeMessage(msg) {
    const animation = chalkAnimation.rainbow(
      "\n******************************************\n" +
        msg +
      "\n******************************************\n"
    );
  }

  // Method to generate the game field
  generateField() {
    for (let i = 0; i < this.rows; i++) {                      // Create rows
      this.field[i] = new Array();
      for (let j = 0; j < this.cols; j++) {                    // Create columns
        this.field[i][j] = Math.random() > 0.2 ? GRASS : HOLE; // Randomly fill the field with grass and holes
      }
    }

    // Always start game with player at starting position (0,0)
    this.field[0][0] = PLAYER;

    // Place the hat at a random position
    let hatRow, hatCol;
    do {
      hatRow = Math.floor(Math.random() * this.rows);
      hatCol = Math.floor(Math.random() * this.cols);
    } while (hatRow === 0 && hatCol === 0);                    // Ensure hat is not at player's starting position
    this.field[hatRow][hatCol] = HAT;
  }

  // Method to print the field
  printField() {
    this.field.forEach((row) => console.log(row.join("")));    // Put the grass patches together
  }

  // Update the player position
  updatePlayer(direction) {
    // Saving previous position
    const prevRow = this.playerPosition.row;
    const prevCol = this.playerPosition.col;

    // Update player position based on direction
    switch (direction) {
      case "w": // up
        this.playerPosition.row--;
        break;
      case "s": // down
        this.playerPosition.row++;
        break;
      case "a": // left
        this.playerPosition.col--;
        break;
      case "d": // right
        this.playerPosition.col++;
        break;
    }

    // Check if player is out of bounds
    if (this.playerPosition.row < 0 ||
      this.playerPosition.row >= this.rows ||
      this.playerPosition.col < 0 ||
      this.playerPosition.col >= this.cols){
        console.log(chalk.yellow(OUT_BOUNDS));
        this.playerPosition.row = prevRow;
        this.playerPosition.col = prevCol;
        return true; // Continue the game
      }

    // Check the player's new position
    const currentPosition = this.field[this.playerPosition.row][this.playerPosition.col];

    // Check if player found the hat
    if (currentPosition === HAT) {
      console.log(chalk.green(WIN));
    // Create a large, dramatic winner message using ASCII art
    const winnerMsg = `
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ~_|      _|    _|_|    _|    _|       _|          _|  _|_|_|  _|      _|  _| ~
    ~  _|  _|    _|    _|  _|    _|       _|          _|    _|    _|_|    _|  _| ~
    ~    _|      _|    _|  _|    _|       _|    _|    _|    _|    _|  _|  _|  _| ~
    ~    _|      _|    _|  _|    _|         _|  _|  _|      _|    _|    _|_|     ~
    ~    _|        _|_|      _|_|             _|  _|      _|_|_|  _|      _|  _| ~
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    `;
    // Use chalkAnimation for a dramatic effect
    const animation = chalkAnimation.pulse(winnerMsg);
    
    // Allow animation to display for a few seconds before exiting
    setTimeout(() => {
      animation.stop(); // Stop the animation
      this.gamePlay = false; // Set gamePlay to false
      process.exit(); // Exit the process
    }, 5200); // Display for 5.2 seconds to finish the msg display
     return false;
    }

    // Check if player fell into a hole
    if (currentPosition === HOLE) {
      console.log(chalk.red(INTO_HOLE));
      this.endGame();
      return false;
    }

    // Updating field with new player position
    this.field[prevRow][prevCol] = GRASS;                                  // Re-adding grass where player was
    this.field[this.playerPosition.row][this.playerPosition.col] = PLAYER; // Place player in new position

    return true;                                                           // Game continues
  }

  // End the game
  endGame() {
    // Create a large, dramatic GAME OVER message using ASCII art
    const gameOverMsg = `
    ██████╗  █████╗ ███╗   ███╗███████╗     ██████╗ ██╗   ██╗███████╗██████╗ 
    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██╔═══██╗██║   ██║██╔════╝██╔══██╗
    ██║  ███╗███████║██╔████╔██║█████╗      ██║   ██║██║   ██║█████╗  ██████╔╝
    ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║   ██║╚██╗ ██╔╝██╔══╝  ██╔══██╗
    ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ╚██████╔╝ ╚████╔╝ ███████╗██║  ██║
     ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝     ╚═════╝   ╚═══╝  ╚══════╝╚═╝  ╚═╝
    `;
    // Use chalkAnimation for a dramatic effect
    const animation = chalkAnimation.neon(gameOverMsg);
    
    // Allow animation to display for a few seconds before exiting
    setTimeout(() => {
      animation.stop(); // Stop the animation
      //console.log(chalk.redBright(END_GAME)); // Print the original end game message
      this.gamePlay = false; // Set gamePlay to false
      process.exit(); // Exit the process
    }, 5000); // Display for 3 seconds
  }

  // Method to update the game
  updateGame() {
    let userInput = null;                                                  // Storage for user's direction input
    do {
      console.log(chalk.bgBlue(DIRECTIONS.concat(" ", QUIT)));             // Ask user for directions or quit
      userInput = prompt(chalk.bgCyan("Enter your move:"));                // Obtain user's input

      switch (
        userInput.toLowerCase()                                            // Force change the input to be lowercase regardless
      ) {
        case "w":
        case "s":
        case "a":
        case "d":
          const continueGame = this.updatePlayer(userInput.toLowerCase()); // Update the player's position
          if (!continueGame) {
            return;                                                        // End game
          }
          break;
        case "q":
          this.endGame();                                                 // End the game when user input q 
         return;
        default:                                                          // All other unstated inputs are deemed as unrecognized inputs
          console.log(chalk.bgMagenta(NOT_RECOGNIZED));
          break;
      }
      this.printField();                                                 // Update the field
    } while (userInput.toLowerCase() !== "q");
  }

// Set the difficulty level based on user input
setDifficulty() {
  console.log(chalk.yellow(DIFFICULTY_PROMPT));
  
  let validChoice = false;
  
  while (!validChoice) {
    let difficultyChoice = prompt(chalk.bgCyan("Enter your choice (1, 2, or q): ")).toLowerCase();
    
    if (difficultyChoice === "q") {                                     // User wants to quit
      console.log(chalk.blue("You chose to quit! Goodbye!"));
      process.exit();                                                   // Exit the game
    } 
    else if (difficultyChoice === "1") {                                // Easy mode
      this.difficultyLevel = EASY_HOLE_CHANCE;
      console.log(chalk.green("Easy mode selected - fewer holes! Have fun!"));
      validChoice = true;
    } 
    else if (difficultyChoice === "2") {                               // Difficult mode
      this.difficultyLevel = DIFFICULT_HOLE_CHANCE;
      console.log(chalk.red("Difficult mode selected - more holes added! Have fun!"));
      validChoice = true;
    }
    else {                                                            // Invalid input
      console.log(chalk.red("Invalid choice. Please enter 1 for Easy, 2 for Difficult, or q to quit."));
    }
  }
}

  startGame() {
    this.gamePlay = true;                                            // Set gamePlay to true
    console.clear();                                                 // Clear console for a fresh start
    Field.welcomeMessage(WELCOME);                                   // Show welcome message again
   
    // Delay the difficulty prompt to give animation time to display
    setTimeout(() => {
      this.setDifficulty();                                          // Set the difficulty level
      this.generateField();                                          // Populate the game's field 
      this.printField();                                             // Print the field
      this.updateGame();                                             // Update the game
    }, 3500);
  }
}

// Call the static method in class Field (no instantiation needed)
Field.welcomeMessage(WELCOME);
const gameField = new Field(ROWS, COLS);
gameField.startGame();                                               // Start the game