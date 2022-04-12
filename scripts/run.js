const main = async () => {
    
    //this will compile the contract
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    
    //create local Ethereum network
    const waveContract = await waveContractFactory.deploy();
    
    //wait until contract is officially deployed
    await waveContract.deployed();
    console.log("Contract deployed to: ", waveContract.address);
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