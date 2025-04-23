const prompt = require('prompt-sync')({sigint: true});

let input = null;

while (input !== 'q') {
    console.log("(w)up,(s)down,(a)left,(d)right,(q)quit");
    input = prompt('Enter your move: ');

    switch (input.toLowerCase()) {                                         // Convert input to lowercase to handle both 'W' and 'w'
        case 'w':
            console.log("You moved up! \n");                               // User moved up
            break;
        case 's':
            console.log("You moved down! \n");                             // User moved down
            break;
        case 'a':
            console.log("You moved left! \n");                             // User moved left    
            break;
        case 'd':
            console.log("You moved right! \n");                            // User moved right   
            break;
        case 'q':
            console.log("You have quitted the game. Goodbye! \n");         // User quit the game
            process.exit();
            break;
        default:
            console.log("Invalid input, please try again \n");             // User input is invalid
    }
}