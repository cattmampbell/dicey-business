// console.log(`Testing... Testing... 1, 2, 3, 4, Dicey Business.`);

/* More on Colorful Console Messages here: https://www.samanthaming.com/tidbits/40-colorful-console-message */
console.log('%cStart%c of scripts.js file!', 'font-weight: 900; color: blue;', 'font-weight: 400; color: blue;'); // Should log: Start of scripts.js file!
// console.log(`%c. . .`, 'color: grey; font-weight: 800; font-size: 12px;');

// Executes anonymous function once DOM is fully loaded
$(document).ready(() => {
    // Declares/assigns values to global variables    
    const diceOnScreen = [ ];
    let diceCreated = 0;
    let diceTotal = 0;

    // Creates getRandomValue() Function
    // Returns random Integer within maximum/minimum arguments
    const getRandomValue = (maximum, minimum) => { 
        return Math.floor(Math.random() * (maximum - minimum) + minimum); 
    }

    // Creates addDice() Function
    // Generates new Object via instantiation of Die Class
    // Adds Object to diceOnScreen Array
    // Increments diceCreated Variable by 1
    const addDice = () => {
        let newRandomValue = getRandomValue(7, 1);
        let newDieDiv = new Die(newRandomValue);
        diceOnScreen.push(newDieDiv);
        diceCreated += 1;
    }

    // Creates rollDice() Function
    // Loops through each index of diceOnScreen Array
    // Calls roll() Method 
    const rollDice = () => {
        for(let i = 0; i < diceOnScreen.length; i += 1) {
            diceOnScreen[i].roll();
        }
    }

    // Creates addRolls() Function
    // Loops through each index of diceOnScreen Array
    // Extracts Integer in Property named, 'value', of each Object 
    // Increments diceTotal Variable by extracted Integer 
    // Alerts a String 
    // Calls resetDiceTotal() Function
    const addRolls = () => {
        for(let i = 0; i < diceOnScreen.length; i += 1) {
            diceTotal += diceOnScreen[i].value;
        }
        alert(`Your total is ${diceTotal}!`);
        resetDiceTotal();
    }

    // Creates resetDiceTotal() Function
    // Assigns diceTotal Variable to value of 0
    const resetDiceTotal = () => {
        diceTotal = 0;
    }

    // Creates resetDiceOnScreen() Function
    // Calls reload() Method 
    const resetDiceOnScreen = () => {
        location.reload(); 
    }

    // Assigns 'click' Event on <button> elements, via their id
    // Calls appropriate Function
    $(`#generateDieButton`).click(addDice);
    $(`#rollDiceButton`).click(rollDice);
    $(`#getSumButton`).click(addRolls);
    $(`#startOverButton`).click(resetDiceOnScreen);

    // Creates class named 'Die'
    class Die {
        constructor(value) {
            this.value = value;
            this.id = diceCreated;
            this.div = $(`<div></div>`);
            this.div.attr(`id`, this.id);
            this.div.attr(`class`, `die`);
            this.div.append(this.dieFace());
            $(`#diceContainerDiv`).append(this.div);
            
            // Assigns 'click' Event
            // Calls roll() Method 
            this.div.click(() => {
                this.roll();
            })

            // Assigns 'dblclick' Event
            // Calls jQuery .remove() Method 
            // Locates appropriate index of diceOnScreen Array
            // Calls splice() Method  
            this.div.dblclick(() => {
                // console.log(this.id);
                $(`#${this.id}`).remove();
                let index = diceOnScreen.findIndex(item => item.id === this.id);
                diceOnScreen.splice(index, 1);
                // console.log(diceOnScreen);
            })
        }
    
        // Creates roll() Method
        // Generates random Integer between 1 and 7, via getRandomValue() Function
        // Assigns generated random Integer 
        // Calls jQuery .empty() Method
        // Calls jQuery .append() Method on dieFace() Method
        roll() {
            this.newValue = getRandomValue(7, 1);
            this.value = this.newValue;
            this.div.empty().append(this.dieFace());
        }
    
        // Creates dieFace() Method
        // Runs conditional statements to evaluate Property named 'value'
        // Returns <img> element 
        dieFace() {
            if(this.value === 1) {
                return $(`<img src="images/one.png" />`);
            } else if(this.value === 2) {
                return $(`<img src="images/two.png" />`);
            } else if(this.value === 3) {
                return $(`<img src="images/three.png" />`);
            } else if(this.value === 4) {
                return $(`<img src="images/four.png" />`);
            } else if(this.value === 5) {
                return $(`<img src="images/five.png" />`);
            } else if(this.value === 6) {
                return $(`<img src="images/six.png" />`);
            }
        }
    }
})

// console.log(`%c. . .`, 'color: grey; font-weight: 800; font-size: 12px;');
console.log('%cEnd%c of scripts.js file!', 'font-weight: 900; color: blue;', 'font-weight: 400; color: blue;'); // Should log: End of scripts.js file!