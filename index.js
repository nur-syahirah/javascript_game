const prompt = require('prompt-sync')();

// Game elements
const GRASS = '░';
const HOLE = '⬤';
const HAT = '🎩';
const PLAYER = '*';

const rows = 10;
const cols = 20;

const field = [];                                             // Create array for the field

/* 
    Populate the game field with 2D-array
    via nested for loops
*/

for (let i = 0; i < rows; i++) {
  field[i] = [];                                              // Create array for each row
  for (let j = 0; j < cols; j++) {                            // Create array for each column
    //field[i][j] = GRASS;                                    // Fill the field with grass
    field[i][j] = Math.random() >0.2 ? GRASS : HOLE;          // Randomly fill the field with grass and holes
  }
}

//Populate player at the starting position
field[0][0] = PLAYER;                                         // Set player position

for (let row of field){
    console.log(row.join(''));                                // Join each element together per row
}

console.log(field);                                           // Print the field