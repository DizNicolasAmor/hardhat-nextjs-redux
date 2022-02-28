import { Contract, ethers, providers } from 'ethers';
import { useEffect, useState } from 'react';
import MyToken from '../artifacts/contracts/MyToken.sol/MyToken.json';
import { CONTRACT_ADDRESSES } from '../utils/constants';

type Web3Props = {
  web3: providers.Web3Provider | undefined;
};

const useToken = ({ web3 }: Web3Props) => {
  const [contractAddress, setContractAddress] = useState<string>(
    CONTRACT_ADDRESSES.LOCAL
  );
  const [contractInstance, setContractInstance] = useState<
    Contract | undefined
  >(undefined);

  useEffect(() => {
    web3?.detectNetwork().then((network) => {
      const differentAddress: string = CONTRACT_ADDRESSES[network.name];
      if (differentAddress) {
        setContractAddress(differentAddress);
      } else {
        console.warn(`Contract address not found in network: ${network.name}`);
      }
    });
  }, [web3]);

  const getContract = async (web3: providers.Web3Provider) => {
    if (contractInstance) return contractInstance;

    try {
      const signer = web3.getSigner();
      const instantiatedContract = new ethers.Contract(
        contractAddress,
        MyToken.abi,
        signer
      );
      setContractInstance(instantiatedContract);

      return instantiatedContract;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getContractInformation = async (): Promise<any | undefined> => {
    if (!web3) return;

    try {
      const contract = await getContract(web3);
      const accounts = await web3.listAccounts();
      const balance = await contract.balanceOf(accounts[0]);
      const name = await contract.name();
      const symbol = await contract.symbol();

      return { balance, name, symbol };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  async function transferToken(receiverAddress: string, amountToSend: string) {
    if (!web3 || !receiverAddress || !amountToSend) return;

    const parsedAmount = ethers.utils.parseUnits(amountToSend);
    const contract = await getContract(web3);
    const transaction = await contract.transfer(receiverAddress, parsedAmount);
    await transaction.wait();
  }

  return [contractAddress, getContractInformation, transferToken] as const;
};

export default useToken;
