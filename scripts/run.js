const main = async () => {
    //we need owner wallet addresses and a random one
    const [owner, randomPerson] = await hre.ethers.getSigners();
    //this will compile the contract
    //hre is an object containing all the functionality that hardhat expose => no need to import
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    
    //create local Ethereum network
    const waveContract = await waveContractFactory.deploy();
    
    //wait until contract is officially deployed
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by: ", owner.address);

    let waveCount = await waveContract.getTotalWaves();
    let storePeopleWave = [];
    //self wave
    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveTxn =  await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    // check if total wave count change
    waveCount = await waveContract.getTotalWaves();

    let people = await waveContract.peopleWhoWaved();
    
    console.log(people);
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