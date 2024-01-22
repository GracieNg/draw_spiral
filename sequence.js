/**
 * A class to hold a repeating sequence of anything: numbers, characters, etc.
 */
export class Sequence 
{
    /* Internal variables for this class */

    sequence; // Array: an array holding the sequence
    index; // Integer: current index in the sequence, from 0 to the length of the sequence - 1

    /**
     * Constructor: create a sequence from an array
     * @param {Array} list The list of elements for this sequence in an Array
     */
    constructor(list) 
    {
        // Deep-copy the array
        this.sequence = [];
        for (let i of list) {
            this.sequence.push(i);
        }
        this.index = 0;
    }

    /**
     * Return the current element in the sequence and advance the sequence index
     */
    next() 
    {
        // Get the current element
        let x = this.sequence[this.index];
        // Advance the sequence index
        this.index = (this.index+1)%this.sequence.length;
        return x;
    }

    /**
     * Swap value of index x and y of sequence
     * @param {*} x First index
     * @param {*} y Second index
     */
    swap(x,y)
    {
        var tmp = this.sequence[x];
        this.sequence[x] = this.sequence[y];
        this.sequence[y] = tmp;
    }

    /**
     * @returns Length of initial sequence
     */
    get_length() 
    {
        return this.sequence.length;
    }

    /**
     * 
     * @returns Current index
     */
    get_index()
    {
        return this.index;
    }
}