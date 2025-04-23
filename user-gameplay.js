const prompt = require('prompt-sync')({sigint: true});

let input = null;

while (input !== 'q') {
    console.log("(w)up,(s)down,(a)left,(d)right,(q)quit");
    input = prompt('Enter your move: ');

    switch (input) {
        case 'w':
            console.log("You moved up! \n");                               //user moved up
            break;
        case 's':
            console.log("You moved down! \n");                             //user moved down
            break;
        case 'a':
            console.log("You moved left! \n");                            //user moved left    
            break;
        case 'd':
            console.log("You moved right! \n");                           //user moved right   
            break;
        case 'q':
            console.log("You have quitted the game. Goodbye! \n");        //user quit the game
            process.exit();
            break;
        default:
            console.log("Invalid input, please try again \n");           //user input is invalid
    }
}