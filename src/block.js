/**
 *                          Block class
 *  The Block class is a main component into any Blockchain platform, 
 *  it will store the data and act as a dataset for your application.
 *  The class will expose a method to validate the data... The body of
 *  the block will contain an Object that contain the data to be stored,
 *  the data should be stored encoded.
 *  All the exposed methods should return a Promise to allow all the methods 
 *  run asynchronous.
 */

const SHA256 = require('crypto-js/sha256');
const hex2ascii = require('hex2ascii');

class Block {

    // Constructor - argument data will be the object containing the transaction data
	constructor(data){
		this.hash = null;                                           // Hash of the block
		this.height = 0;                                            // Block Height (consecutive number of each block)
		this.body = Buffer(JSON.stringify(data)).toString('hex');   // Will contain the transactions stored in the block, by default it will encode the data
		this.time = 0;                                              // Timestamp for the Block creation
		this.previousBlockHash = null;                              // Reference to the previous Block Hash
    }
    
    /**
     *  validate() method will validate if the block has been tampered or not.
     *  Been tampered means that someone from outside the application tried to change
     *  values in the block data as a consecuence the hash of the block should be different.
     *  Steps:
     *  1. Return a new promise to allow the method be called asynchronous.
     *  2. Save in the auxiliary variable the current hash of the block (`this` represent the block object)
     *  3. Recalculate the hash of the entire block (Use SHA256 from crypto-js library)
     *  4. Compare if the auxiliary hash value is different from the calculated one.
     *  5. Resolve true or false depending if it is valid or not.
     *  Note: to access the class values inside a Promise code you need to create an auxiliary value `let self = this;`
     */
    validate() {
        let self = this;
        return new Promise((resolve, reject) => {
            // Save in auxiliary variable the current block hash 
            let currentHash = self.hash; 

            //reset to null so then you can compare
            self.hash = null;
            
            // then redo hash of block with null value to compare
            let hash2 = SHA256(JSON.stringify(self)).toString();
            
            if (hash2 == currentHash) {
                self.hash = currentHash; 
                resolve(true)
            } else if (hash2 != currentHash) {
                self.hash = currentHash; 
                // not a good hash, was modified
                console.log('not the same hash')
                resolve(false)
            } else { // didn't have this before, so might remove
                self.hash = currentHash; 
                reject(Error('it broke'))
            }                               
            
            // save hash to make sure it's the same as original.
            //self.hash = currentHash; 

            // Recalculate the hash of the Block
            // Comparing if the hashes changed
            // Returning the Block is not valid
            // Returning the Block is valid

        });
    }

    /**
     *  Auxiliary Method to return the block body (decoding the data)
     *  Steps:
     *  
     *  1. Use hex2ascii module to decode the data
     *  2. Because data is a javascript object use JSON.parse(string) to get the Javascript Object
     *  3. Resolve with the data and make sure that you don't need to return the data for the `genesis block` 
     *     or Reject with an error.
     */
    getBData() {
        
        let dataEncoded = this.body;
        let dataJson = hex2ascii(dataEncoded);
        let data = JSON.parse(dataJson);
        if (data && this.height > 0) {
            return data
        } else {
            return 'Genesis Block boiiii or error...';
        }
        
        // Getting the encoded data saved in the Block
        // Decoding the data to retrieve the JSON representation of the object
        // Parse the data to an object to be retrieved.
        // Resolve with the data if the object isn't the Genesis block
        
    }

}

module.exports.Block = Block;                    // Exposing the Block class as a module


//TEST lines DELETE THESE -------------------------------------------------------------------
// how to test.
// type node
// past code
// let block1 = new Block('woo');
// block1.validate();