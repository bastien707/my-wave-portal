const main = async () => {
    //this will compile the contract
    //hre is an object containing all the functionality that hardhat expose => no need to import
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    
    //create local Ethereum network and giving 0.1 ether to the contract
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    
    //wait until contract is officially deployed
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);

    //get contract balance
    let contractBalance = await hre.ethers.provider.getBalance(
        waveContract.address
    );
    console.log(
        "Contract balance: ", 
        hre.ethers.utils.formatEther(contractBalance)
    );
   
    /**
     * Send a wave
     */
    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait(); // Wait for tx to be mined

    /**
     * check contract balance after wave
     */
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
        "Contract balance: ", 
        hre.ethers.utils.formatEther(contractBalance)
    );

    //we need owner wallet addresses and a random one
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
    await waveTxn.wait(); // Wait for the transaction to be mined

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    waveCount = await waveContract.getTotalWaves();

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();