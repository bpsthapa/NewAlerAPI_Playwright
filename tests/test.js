const accountId=1345
let accountEmail="bit@logpointl.com"
var accountPassword= "123123"
let accountState = null;
/*
    Preferred not to used var as it has function scope and can lead to unexpected behavior.
    Use let or const instead.
*/


accountCity="Lalitpur" //

// accountId=2    //The accountID cannot be changed as it is a constant
accountEmail="bipin@logpointl.com"
accountPassword="NewPassword123"
accountCity="New Kathmandu"

console.log(accountId);
console.table([accountId, accountEmail, accountPassword, accountCity,accountState]);



//To run this test file, use the command below in your terminal:
//node tests/test.js