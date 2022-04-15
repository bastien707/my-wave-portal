const main = async () => {
    //this will compile the contract
    //hre is an object containing all the functionality that hardhat expose => no need to import
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    
    //create local Ethereum network
    const waveContract = await waveContractFactory.deploy();
    
    //wait until contract is officially deployed
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);

    let waveCount = await waveContract.getTotalWaves();
   
    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait(); // Wait for tx to be mined

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