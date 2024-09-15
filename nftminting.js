/*
Assessment Requirements
1. Create a variable that can hold a number of NFT's. What type of variable might this be?
2. Create an object inside your mintNFT function that will hold the metadata for your NFTs. 
   The metadata values will be passed to the function as parameters. When the NFT is ready, 
   you will store it in the variable you created in step 1
3. Your listNFTs() function will print all of your NFTs metadata to the console (i.e. console.log("Name: " + someNFT.name))
4. For good measure, getTotalSupply() should return the number of NFT's you have created
*/

// create a variable to hold your NFT's
const myNft = [];

// this function will take in some values as parameters, create an
// NFT object using the parameters passed to it for its metadata, 
// and store it in the variable above.

function mintNFT (name, power, rarity) {
    let NFT = {
        name: name,
        power: power,
        rarity: rarity
    }

    myNft.push(NFT);

    console.log("NFT Minted...");
}

// create a "loop" that will go through an "array" of NFT's
// and print their metadata with console.log()
function listNFTs () {
    for(let i = 0; i < myNft.length; i++){
        console.log("NFT # " + (1 + i));
        console.log("Name: " + myNft[i].name);
        console.log("Power: "+ myNft[i].power);
        console.log("Rarity: " + myNft[i].rarity);
    }
}

// print the total number of NFTs we have minted to the console
function getTotalSupply() {
    console.log("Total NFT's Minted is: " + myNft.length);
}

// call your functions below this line

// minting
mintNFT("Jethro NFT",  99999, "SSS");
mintNFT("Neal NFT",  78367, "SS");
mintNFT("Julian NFT",  60593, "S");
mintNFT("Jiro NFT",  1000, "F");


// list all the nft
listNFTs();

//get total supply of minted nfts
getTotalSupply();
