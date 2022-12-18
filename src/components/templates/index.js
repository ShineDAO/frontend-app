const BigNumber = require("bignumber.js");
const BN = require("bn.js");

function strtodecBN(amount, dec) {
  let stringf = "1";
  for (var i = 0; i < dec; i++) {
    stringf = stringf + "0";
  }
  return new BN(amount).mul(new BN(stringf)).toString();
  //return (amount * stringf).toString(); // "22" * "100000000" = 2200000000
}
function strtodec123(amount, dec) {
  let stringf = "1";
  for (var i = 0; i < dec; i++) {
    stringf = stringf + "0";
  }
  return new BigNumber(amount).multipliedBy(stringf).toLocaleString({ usegrouping });
  //return (amount * stringf).toString(); // "22" * "100000000" = 2200000000
}

function strtodec(amount, dec) {
  let stringf = "1";
  for (var i = 0; i < dec; i++) {
    stringf = stringf + "0";
  }
  const bigNrAmount = new BigNumber(amount); //https://stackoverflow.com/a/54604860
  //console.log("big Number amount ", bigNrAmount.toString());
  return bigNrAmount.multipliedBy(stringf);
  //return (amount * stringf).toString(); // "22" * "100000000" = 2200000000
}

console.log(" test ", strtodec(50000, 18));
console.log(" test ", strtodec(10000, 18));
console.log(" test ", strtodecBN(50000, 18));

console.log(" test 111", strtodec(10000, 18).toString());
console.log(" test 123", Number(strtodec(250000001, 18)).toLocaleString('fullwide', {useGrouping:false}));
console.log(" test ", strtodecBN(50000, 18).toString());
