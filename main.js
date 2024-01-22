/**
 * Final exam part 1: sequences
 */



import './lib/p5.min.js'
import { Sequence } from './sequence.js'

// this is later used to organise our sketch on the HTML page by putting it in 
// the div with the CSS id 'sketch'
const sketchHolder = document.getElementById('sketch');

// our sequence to draw -- customise this as you'd like (you can even use emoji, but im just boring! Haha...)
let sequenceArray = ['0', '0', '1', '1', 'r', 'g', 'b']; 


// --------- STEP 5 ----------------------------
// create an instance of the sequence class
let sequence = new Sequence(sequenceArray);

// --------- STEP 4 ----------------------------
//
// colours for each sequence element
const lookup = 
{
    '0': `hsla(20, 100%, 80%,1)`,
    '1': `hsla(10, 100%, 60%, 1)`,
    '.': `hsla(0,  100%, 60%, 1)`,
    ' ': `hsla(90, 100%, 10%,1)`,
    'r': 'rgb(255,0,0)',
    'g': 'rgb(0,255,0)',
    'b': 'rgb(0,0,255)'
}   


// --------- STEP 1 ----------------------------

/**
 * function drawSequence from Array
 * @param {Array} list
 * Draw the canvas with multiple rows of the array 
 */
function drawSequenceFromArray(list) 
{
    // Set width and height for drawing
    let width = 600/list.length;
    let height = 600/list.length;

    // Set initial (x,y) for drawing
    let x = height;
    let y = 0;
    textSize(height);
    
    // Go through each row to draw
    for(var row=1;row<=list.length;++row){
        // Draw the array into that row
        for(var i of sequenceArray) {
            // Choose color for cell based on value i
            fill(lookup[i]);
            // Draw i
            text(i, y, x);
            // Update y for next cell
            y+= width;
        }
        // Update x,y for next row
        y = 0;
        x = height*(row+1);
    }

}

// --------- STEP 6 ----------------------------

/**
 * 
 * @param {Sequence} sequence to draw 
 * @param {Integer} size horizontal size
 */
function drawSequence(sequence, size) 
{
    // Set width and height for drawing
    let width = 600/size;
    let height = 600/size;

    // Set initial (x,y) for drawing
    let x = height;
    let y = 0;
    textSize(height);

    // Go through each row to draw
    for(var row=1;row<=size;++row){
        // Draw the array into that row
        for(var i=0;i<size;++i){
            // Get current value
            let val = sequence.next();
            // Choose color for cell based on value val
            fill(lookup[val]);
            // Draw val
            text(val, y, x);
            // Update y for next cell
            y+= width;
        }
        // Update x,y for next row
        y = 0;
        x = height*(row+1);
    }
}

// -------- STEP 8-X ---------------------------
// 1.
// For this I add r,g,b which as its names suggest have color red, green and blue.
// 2.
// The way the sequence moves really depends on the size of the character per row of the sequence 
// since the next row still use the index from the sequence use in the previous row. Thus, if
// - the size of the row is divisible by the size of the sequence, the sequence in every row would be the same,
// as the next row would start from index 0. For example if sequence is ['0','1','r','g'] and the size is 16. Every
// row would be the same.
// - On the other hand, if the modulo of the divide of the size of row and size of sequence is 1, the array would move
// by 1 in each row. This is because if row i starts from index j than row i+1 would start from index j+1. For example,
// if sequence is ['0','1','r','g'] and the size is 17. The second row would starts from '1'. Thus this makes the sequence
// looks like they move vertically as well.
// - For a more general rule, if modulo of divide of size of row and size of sequence is k, if row i start from index j than row 
// i+1 would start from index j+k

// STEP 8-X 3.
// For a random algorithms, I create a random sequence of a given size from a set of predefined list of characters
/**
 * 
 * @param {*} sequence Sequence to generate random sequence
 * @param {*} size Size of result random sequence
 * @returns Random sequence
 */
function generateRandomSequence(sequence, size) {
    let resultSequence = [];
    for(let i=0;i<size;++i) {
        let randomIndex = Math.floor(Math.random() * sequence.length);
        resultSequence.push(sequence[randomIndex]);
    }
    return resultSequence;
}

let randomArray = generateRandomSequence(sequenceArray, 30);
let randomSequence = new Sequence(randomArray);

// Step 8-X 4.
// We define a funciton called drawMutatedSequence. What it does is after every sequence.next(), it will choose 2 random index
// and swap value of those 2 index with each other. To support this, I implement a swap and get_length function in Sequence class

/**
 * Draw mutated sequence
 * @param {Sequence} sequence to draw 
 * @param {Integer} size horizontal size
 */
function drawMutatedSequence(sequence, size) 
{
    // Set width and height for drawing
    let width = 600/size;
    let height = 600/size;

    // Set initial (x,y) for drawing
    let x = height;
    let y = 0;
    textSize(height);

    // Go through each row to draw
    for(var row=1;row<=size;++row){
        // Draw the array into that row
        for(var i=0;i<size;++i){
            // Get current value
            let val = sequence.next();
            // Choose color for cell based on value val
            fill(lookup[val]);
            // Draw val
            text(val, y, x);
            // Update y for next cell
            y+= width;

            // Generate 2 random index and swap index
            let randomIndexI = Math.floor(Math.random() * sequence.get_length());
            let randomIndexJ = Math.floor(Math.random() * sequence.get_length());
            sequence.swap(randomIndexI, randomIndexJ);
        }
        // Update x,y for next row
        y = 0;
        x = height*(row+1);
    }
}

// STEP 8-Y
/**
 * Draw spiral of neverending sequence
 * @param {*} sequence Sequence used to draw spiral
 * @param {*} size Size of each circle
 */
function drawCircle(sequence, size) {
    // Set initial value for circle for drawing
    var sequence = sequence;
    let increment = 360/size;
    let radius = 300;
    textSize(20);

    // Draw multiple circle
    for(var iteration = 1;iteration<=100;++iteration){
        for(var i =0;i<=360;i+=increment) {
            // If goes through a full round of sequence, reduce the radius
            if(sequence.get_index() == 0){
                radius = radius*0.99;
            }

            // Calculate x and y coordinate of value
            let x = radius*Math.cos(i) + 300;
            let y = radius*Math.sin(i) + 300;
            let val = sequence.next();

            fill(lookup[val]);
            text(val,y,x);
        }
    }
}

/**
 * SETUP --------------------------------------------------
 */
window.setup = function () {
    createCanvas(600, 600).parent(sketchHolder);
}

/**
 * DRAW --------------------------------------------------
 */
window.draw = function() {
    // Step 1, 2
    //drawSequenceFromArray(sequenceArray);
    
    //Step 3, 4, 5
    //drawSequence(sequence, 15);

    // Step 6
    //drawSequence(randomSequence, 30);

    // Step 8-X.4
    //drawMutatedSequence(sequence,25);

    // Step 8-Y
    drawCircle(sequence, 122);
    
    // If want to run only one time
    //noLoop();
}

