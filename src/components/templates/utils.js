import Web3 from "web3";
import Migrations from "../../../static/abi/Migrations.json";
var migrationsContractAddress = "0x194af59b7788e22CF6D0ce269876e143ca98db59";


export async function addToWatchlist(metamaskDetails) {
console.log("details " , metamaskDetails)
    window.web3.currentProvider.sendAsync({
        method: 'metamask_watchAsset',
        params: {
            "type": "ERC20", // Initially only supports ERC20, but eventually more!
            "options": {
                "address": metamaskDetails.address, // The address that the token is at.
                "symbol": metamaskDetails.symbol, // A ticker symbol or shorthand, up to 5 chars.
                "decimals": metamaskDetails.decimals, // The number of decimals in the token
                "image": metamaskDetails.image, // A string url of the token logo
            },
        },
        id: Math.round(Math.random() * 100000),
    }, (err, addedBoolean) => {

    })
}
export async function getCurrentMigrations() {
    let abiArray = Migrations;
    let abi = abiArray.abi;
    let migrationsInstance = new window.web3.eth.Contract(abi, migrationsContractAddress);
    let currentMigration = await migrationsInstance.methods.last_completed_migration().call();
    console.log("current migrations is ", currentMigration);
}

export async function getUserAddressProject(setUserAddress, setProjectBalance, tokenAbi,tokenContractAddress) {
    let userAddress = await window.ethereum.selectedAddress;
    setUserAddress(userAddress);
    await getProjectBalance(setProjectBalance, userAddress,tokenAbi,tokenContractAddress);
}

export async function getUserAddress(setUserAddress, setShineBalance, tokenAbi,tokenContractAddress) {
    let userAddress = await window.ethereum.selectedAddress;
    setUserAddress(userAddress);
    await getShineBalance(setShineBalance, userAddress,tokenAbi,tokenContractAddress);
}

export async function getWeiRaised(setWeiRaised,saleAbi,saleContractAddress) {
    console.log("abi 1", saleAbi)
    let abi = saleAbi
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);
    let weiRaised = await simpleCrowdsaleInstance.methods.weiRaised().call();

    setWeiRaised(weiRaised);
    console.log("Wei raised so far", weiRaised);
}

export async function getSeedSaleShnBalance(setSeedSaleShnBalance,tokenAbi,saleContractAddress,tokenContractAddress) {
    var abiToken = tokenAbi
    var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);
    var seedSaleShnBalance = await tokenInst.methods.balanceOf(saleContractAddress).call();
    let shnAvailable = window.web3.utils.fromWei(seedSaleShnBalance.toString(), "ether");

    setSeedSaleShnBalance(shnAvailable);
}

export async function getEthRaised(setEthRaised,saleAbi,saleContractAddress) {
    let abi = saleAbi
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);
    let weiRaised = await simpleCrowdsaleInstance.methods.weiRaised().call();
    let ethRaised = window.web3.utils.fromWei(weiRaised.toString(), "ether");
    setEthRaised(ethRaised);
    console.log("Eth raised so far", ethRaised);
}

export async function getEthBalance(setBalance) {
    window.web3.eth.getBalance(window.ethereum.selectedAddress, (err, balance) => {
        //console.log(window.web3.utils.fromWei(balance, "ether") + " ETH");
        setBalance(window.web3.utils.fromWei(balance.toString(), "ether"));
    });
}
export async function getShineBalance(setShineBalance, userAddress,tokenAbi,tokenContractAddress) {
    var abiToken = tokenAbi;
    var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);

    var shineBalance = await tokenInst.methods.balanceOf(userAddress).call();

    var shineBalanceFromWei = window.web3.utils.fromWei(shineBalance, "ether");
    setShineBalance(shineBalanceFromWei);
}

export async function getProjectBalance(setProjectBalance, userAddress,tokenAbi,tokenContractAddress) {
    console.log("adress ", userAddress)
    var abiToken = tokenAbi;
    var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);

    var projectBalance = await tokenInst.methods.balanceOf(userAddress).call();

    var projectBalanceFromWei = window.web3.utils.fromWei(projectBalance, "ether");
    setProjectBalance(projectBalanceFromWei);
}

export async function buyShineTokens(
    ethAmountToSpend,
    setEthAmountToSpend,
    setShineBought,
    setShineBoughtAmount,
    setTransactionBeingProcessed,
    setMetamaskErrorCode,
    userAddress,
    saleAbi,
    saleContractAddress,
    gas
) {
    if (ethAmountToSpend !== "") { //disable button if no amount is entered
        let abi = saleAbi;
        let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);



        setTransactionBeingProcessed(true);
        setMetamaskErrorCode(undefined)

        try {
            
            let estimatedGas = await simpleCrowdsaleInstance.methods.buyTokens(userAddress).estimateGas({
                from: userAddress,
                value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
                gas: gas,
            })
            //let estimatedGas = 100000;

            console.log("estimated gas ", estimatedGas)

            console.log("eth amount to spend", ethAmountToSpend);
            const receipt = await simpleCrowdsaleInstance.methods.buyTokens(userAddress).send({
                from: userAddress,
                value: window.web3.utils.toWei(ethAmountToSpend.toString(), "ether"),
                gas: estimatedGas,
            });
            console.log("receipt", receipt);
            var amountBoughtInWei = receipt.events.TokensPurchased.returnValues.amount;
            var amountBoughtInTKNs = window.web3.utils.fromWei(amountBoughtInWei, "ether");

            setShineBought(true);
            setShineBoughtAmount(amountBoughtInTKNs);
            setEthAmountToSpend("");
        } catch (e) {
            setShineBought(false);
            console.log("err ", e);
            console.log("User rejected transaction", e.code);


            if (e.message.search("insufficient funds for transfer") >= 0) {
                setMetamaskErrorCode("The amount that you are trying to buy, exceeds the amount that you have available in your wallet");
            }
            else if (e.message.search("IndividuallyCappedCrowdsale: beneficiary's cap exceeded") >= 0) {
                setMetamaskErrorCode("Your total amount exceeds maximum participation");
            } else if (e.code === 4001) {
                setMetamaskErrorCode(e.message); //MetaMask Tx Signature: User denied transaction signature.
            } else {
                setMetamaskErrorCode("There are not enough SHN tokens left for sale anymore"); //"There are not enough SHN tokens left for sale anymore"
            }
            let searchCapExceeded = e.message.search("IndividuallyCappedCrowdsale: beneficiary's cap exceeded")
            console.log("search ", searchCapExceeded) //149
            // console.log("metamask code", metamaskErrorCode)
        }
        setTransactionBeingProcessed(false);
    }

}

export async function loadWeb3(setWalletStatus, setBalance) {
    if (window.ethereum) {
        console.log("load 1", window.web3)
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        await getEthBalance(setBalance);
        setWalletStatus(true);
        console.log("load 1", window.web3)
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        setWalletStatus(true);
        console.log("load 2")
    } else {
        setWalletStatus(false);
        window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
        console.log("load 3")
    }
}

export function handleChangeOfEthAmountToSpend(amount, setEthAmountToSpend) {
    setEthAmountToSpend(amount);
}

export function toPlainString(num) {
    return num.toLocaleString("fullwide", { useGrouping: false });
}

export function estimateReceivedShn(ethAmountToSpend,rate) {
    console.log("eth to spend", ethAmountToSpend);
    const weiAmountToSpend = window.web3.utils.toWei(ethAmountToSpend.toString(), "ether");
    console.log("wei", toPlainString(weiAmountToSpend * rate));

    console.log("www", weiAmountToSpend * rate);

    //const estimatedShnInWei = weiAmountToSpend * rate
    const estimatedReceivedShn = window.web3.utils.fromWei(toPlainString(weiAmountToSpend * rate), "ether");
    return Number.parseFloat(estimatedReceivedShn);
}

