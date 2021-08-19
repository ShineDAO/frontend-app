import Web3 from "web3";
import Migrations from "../../../static/abi/Migrations.json";
//var migrationsContractAddress = "0x194af59b7788e22CF6D0ce269876e143ca98db59";
var migrationsContractAddress = "0xfC84D046C5ac723722033d8DF9985d70d85D2B18"; //ganache


export async function addToWatchlist(metamaskDetails) {
    console.log("details ", metamaskDetails)
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
export async function getCurrentMigrations(setCurrentMigration) {
    let abiArray = Migrations;
    let abi = abiArray.abi;
    let migrationsInstance = new window.web3.eth.Contract(abi, migrationsContractAddress);
    let currentMigration = await migrationsInstance.methods.last_completed_migration().call();
    setCurrentMigration(currentMigration)
    console.log("current migrations is ", currentMigration);
}

export async function getUserAddressProject(setUserAddress, setProjectBalance, tokenAbi, tokenContractAddress) {
    let userAddress = await window.ethereum.selectedAddress;
    setUserAddress(userAddress);
    await getProjectBalance(setProjectBalance, userAddress, tokenAbi, tokenContractAddress);
}

export async function getUserAddress(setUserAddress, setShineBalance, tokenAbi, tokenContractAddress) {
    let userAddress = await window.ethereum.selectedAddress;
    console.log("user address ", userAddress)
    setUserAddress(userAddress);
    await getShineBalance(setShineBalance, userAddress, tokenAbi, tokenContractAddress);
}

export async function getWeiRaised(setWeiRaised, saleAbi, saleContractAddress) {
    console.log("abi 1", saleAbi)
    let abi = saleAbi
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);
    let weiRaised = await simpleCrowdsaleInstance.methods.weiRaised().call();

    setWeiRaised(weiRaised);
    console.log("Wei raised so far", weiRaised);
}

export async function getSeedSaleShnBalance(setSeedSaleShnBalance, tokenAbi, saleContractAddress, tokenContractAddress) {
    var abiToken = tokenAbi
    var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);
    var seedSaleShnBalance = await tokenInst.methods.balanceOf(saleContractAddress).call();
    let shnAvailable = window.web3.utils.fromWei(seedSaleShnBalance.toString(), "ether");

    setSeedSaleShnBalance(shnAvailable);
}

export async function getEthRaised(setEthRaised, saleAbi, saleContractAddress) {
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
export async function getShineBalance(setShineBalance, userAddress, tokenAbi, tokenContractAddress) {
    var abiToken = tokenAbi;
    var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);

    var shineBalance = await tokenInst.methods.balanceOf(userAddress).call();


    var shineBalanceFromWei = window.web3.utils.fromWei(shineBalance, "ether");
    setShineBalance(shineBalanceFromWei);
}

export async function getProjectBalance(setProjectBalance, userAddress, tokenAbi, tokenContractAddress) {
    console.log("adress ", userAddress)
    var abiToken = tokenAbi;
    var tokenInst = new window.web3.eth.Contract(abiToken, tokenContractAddress);

    var projectBalance = await tokenInst.methods.balanceOf(userAddress).call();

    var projectBalanceFromWei = window.web3.utils.fromWei(projectBalance, "ether");
    setProjectBalance(projectBalanceFromWei);
}

export async function getVestingPeriod(saleAbi, saleContractAddress, setUserAddress, setVestingPeriod) {
    let userAddress = await window.ethereum.selectedAddress;
    setUserAddress(userAddress);

    var abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    var vestingPeriod = await simpleCrowdsaleInstance.methods.vestingPeriod(userAddress).call();

    setVestingPeriod(vestingPeriod)
}
export async function getVestedBalances(saleAbi, saleContractAddress, setUserAddress, setVestedBalances) {
    let userAddress = await window.ethereum.selectedAddress;
    setUserAddress(userAddress);

    var abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    var vestedBalances = await simpleCrowdsaleInstance.methods.vestedBalances(userAddress).call();


    var vestedBalancesFromWei = window.web3.utils.fromWei(vestedBalances, "ether");
    setVestedBalances(vestedBalancesFromWei)
}

export async function getRelativeCap(saleAbi, saleContractAddress, setUserAddress, setRelativeCap) {
    let userAddress = await window.ethereum.selectedAddress;
    setUserAddress(userAddress);

    var abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    var relativeCap = await simpleCrowdsaleInstance.methods.relativeCap().call();

    setRelativeCap(relativeCap)
}

export async function getContributions(saleAbi, saleContractAddress, setUserAddress, setContributions) {
    let userAddress = await window.ethereum.selectedAddress;
    setUserAddress(userAddress);

    var abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    var contributions = await simpleCrowdsaleInstance.methods.contributions(userAddress).call();

    setContributions(window.web3.utils.fromWei(toPlainString(contributions), "ether"))
}

export async function getIsSaleOpenForAll(saleAbi, saleContractAddress, setIsSaleOpenForAll) {

    var abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    var isSaleOpenForAll = await simpleCrowdsaleInstance.methods.isSaleOpenForAll().call();

    setIsSaleOpenForAll(isSaleOpenForAll)
}


export function getTier(shineBalance) {
    if (shineBalance < 15000) {
        return "No Tier"
    } else if (shineBalance >= 15000 && shineBalance < 50000) {
        return "Tier 1"
    } else if (shineBalance >= 50000 && shineBalance < 200000) {
        return "Tier 2"
    } else if (shineBalance >= 200000 && shineBalance < 400000) {
        return "Tier 3"
    } else if (shineBalance >= 400000) {
        return "Tier 4"
    }
}

export function getMaximumContribution(relativeCap, shineBalance) {
    console.log("rc, bal", relativeCap, shineBalance)
    let multiplier;
    if (shineBalance < 1500) {
        multiplier = 0
    }
    else if (shineBalance >= 15000 && shineBalance < 50000) {
        multiplier = 1
    } else if (shineBalance >= 50000 && shineBalance < 200000) {
        multiplier = 2
    } else if (shineBalance >= 200000 && shineBalance < 400000) {
        multiplier = 4
    } else if (shineBalance >= 400000) {
        multiplier = 8
    }
    let maximumContribution = window.web3.utils.fromWei(toPlainString(relativeCap * multiplier), "ether");
    return maximumContribution
}

//console.log(kFormatter(1200)); // 1.2k
//console.log(kFormatter(-1200)); // -1.2k
//console.log(kFormatter(900)); // 900
//console.log(kFormatter(-900)); // -900
export function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'k' : Math.sign(num) * Math.abs(num)
}


export function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

export async function withdrawTokens(saleAbi, saleContractAddress, userAddress, gas, setTransactionBeingProcessed, setMetamaskErrorCode, setIsTokenWithdrawn, setShineBought) {
    let abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    setTransactionBeingProcessed(true);
    setMetamaskErrorCode(undefined)

    try {

        let estimatedGas = await simpleCrowdsaleInstance.methods.withdrawTokens(userAddress).estimateGas({
            from: userAddress,
            gas: gas,
        })

        const receipt = await simpleCrowdsaleInstance.methods.withdrawTokens(userAddress).send({
            from: userAddress,
            gas: estimatedGas,
        });
        setIsTokenWithdrawn(true)

    } catch (e) {
        console.log("err ", e);
        setIsTokenWithdrawn(false);
        setShineBought(false)
        if (e.message.search("Vesting: the time required for vesting is not expired yet") >= 0) {
            setMetamaskErrorCode("The time required for vesting is not expired yet");
        }
    }
    setTransactionBeingProcessed(false);
}
export async function enableAccessForTier1AndTier2(userAddress, gas, saleAbi, saleContractAddress) {
    let abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    try {
        let estimatedGas = await simpleCrowdsaleInstance.methods.allowAllTierAccess(true).estimateGas({
            from: userAddress,
            gas: gas,
        })

        const receipt = await simpleCrowdsaleInstance.methods.allowAllTierAccess(true).send({
            from: userAddress,
            gas: estimatedGas,
        });
        console.log("receipt", receipt);
    }
    catch (e) {
        console.log("err ", e);
        console.log("Transaction rejected", e.code);
    }
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
            }
            else if (e.message.search("Reference to the Shine Token contract has not been set") >= 0) {
                setMetamaskErrorCode("Reference to the Shine Token contract has not been set");
            } else if (e.message.search("Relative cap exceeded") >= 0) {
                setMetamaskErrorCode("Relative cap exceeded");
            } else if (e.message.search("Currently you are below Tier 1 level, but you need to be at least Tier3 in order to participate in the seed sale") >= 0) {
                setMetamaskErrorCode("Currently you are below Tier 1 level, but you need to be at least Tier3 in order to have a priority access. For Tier 1 and Tier 2, sale opens at 3:30 pm UTC.")
            } else if (e.message.search("You are Tier 1, but you need to be Tier3 in order to participate in the seed sale") >= 0) {
                setMetamaskErrorCode("You are Tier 1, but you need to be Tier3 in order to participate in the seed sale or you can wait until 3:30 pm UTC its opened for Tier 1 and Tier 2")
            } else if (e.message.search("You are Tier 2, but You need to be Tier3 in order to participate in the seed sale") >= 0) {
                setMetamaskErrorCode("You are Tier 2, but You need to be Tier3 in order to participate in the seed sale or you can wait until 3:30 pm UTC its opened for Tier 1 and Tier 2")
            } else if (e.message.search("The amount that is being bought is too small to split it partially for vesting") >= 0) {
                setMetamaskErrorCode("The amount that is being bought is too small to split it partially for vesting")
            }
            else if (e.message.search("weiAmount is 0") >= 0) {
                setMetamaskErrorCode("0 is not a valid amount, please enter another ETH amount in the input field")
            }
            else {
                setMetamaskErrorCode("Something went wrong, It could be that there are not enough project tokens left for sale anymore"); //"There are not enough project tokens left for sale anymore"
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

export function handleChangeOfShnReference(shnReference, setShnReference) {
    setShnReference(shnReference);
}
export function handleChangeOfNewRelativeCap(newRelativeCap,setNewRelativeCap){
    setNewRelativeCap(newRelativeCap)

}
export async function setNewRelativeCap(userAddress,newRelativeCap,gas,saleAbi,saleContractAddress){
    let abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    try {
        let estimatedGas = await simpleCrowdsaleInstance.methods.setRelativeCap(newRelativeCap).estimateGas({
            from: userAddress,
            gas: gas,
        })

        const receipt = await simpleCrowdsaleInstance.methods.setRelativeCap(newRelativeCap).send({
            from: userAddress,
            gas: estimatedGas,
        });
        console.log("receipt", receipt);
    }
    catch (e) {
        console.log("err ", e);
        console.log("Transaction rejected", e.code);
    }
}

export async function setShineTokenAddress(userAddress,shnReference, gas, saleAbi, saleContractAddress) {
    let abi = saleAbi;
    let simpleCrowdsaleInstance = new window.web3.eth.Contract(abi, saleContractAddress);

    try {
        let estimatedGas = await simpleCrowdsaleInstance.methods.setShineTokenAddress(shnReference).estimateGas({
            from: userAddress,
            gas: gas,
        })

        const receipt = await simpleCrowdsaleInstance.methods.setShineTokenAddress(shnReference).send({
            from: userAddress,
            gas: estimatedGas,
        });
        console.log("receipt", receipt);
    }
    catch (e) {
        console.log("err ", e);
        console.log("Transaction rejected", e.code);
    }

}
export function toPlainString(num) {
    console.log("plain straing", num.toLocaleString("fullwide", { useGrouping: false }))
    return num.toLocaleString("fullwide", { useGrouping: false });
}

export function estimateReceivedShn(ethAmountToSpend, rate) {
    console.log("eth to spend", ethAmountToSpend);
    const weiAmountToSpend = window.web3.utils.toWei(ethAmountToSpend.toString(), "ether");
    console.log("wei", toPlainString(weiAmountToSpend * rate));

    console.log("www", weiAmountToSpend * rate);

    //const estimatedShnInWei = weiAmountToSpend * rate
    const estimatedReceivedShn = window.web3.utils.fromWei(toPlainString(weiAmountToSpend * rate), "ether");
    return Number.parseFloat(estimatedReceivedShn);
}

