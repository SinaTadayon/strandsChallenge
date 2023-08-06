import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, ethers, getChainId } = hre;
  const { deploy } = deployments;
  const [deployer] = await ethers.getSigners();
  const chainId = await getChainId();
  console.log(`deployer address: ${deployer.address}`);
  console.log(`network name: ${hre.network.name}`);
  console.log(`network chainId: ${chainId}`);

  const strandTransfer = await deploy("StrandTransfer", {
    contract: "StrandTransfer",
    from: deployer.address,
    args: [],
    log: true,
    skipIfAlreadyDeployed: true,
  });
};

func.tags = ["StrandTransfer"];
export default func;
