import React, { useEffect, useState } from 'react';
import { providers, utils } from 'ethers';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser, setUser } from '../redux/slices/userSlice';
import useNetwork from '../hooks/useNetwork';
import Error from '../components/Error';
import { getUser } from '../redux/slices/userSlice';
import {
  getNetwork,
  resetNetwork,
  setNetwork,
} from '../redux/slices/networkSlice';
import { renderSectionItem } from '../utils/utilFunctions';
import { getNetworkName, getNetworkSymbol } from '../utils/constants';

const NetworkSection: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [{ web3 }, handleNetwork] = useNetwork();
  const { name, symbol } = useSelector(getNetwork);
  const dispatch = useDispatch();
  const resetFields = () => {
    dispatch(resetUser());
    dispatch(resetNetwork());
    setErrorMessage('');
  };

  useEffect(() => {
    if (typeof web3 === 'undefined') {
      resetFields();
    } else {
      setNetworkAccount(web3);
    }
  }, [web3]);

  const setNetworkAccount = async (web3: providers.Web3Provider) => {
    web3
      .detectNetwork()
      .then(({ chainId }) => {
        dispatch(
          setNetwork({
            chainId,
            name: getNetworkName(chainId),
            symbol: getNetworkSymbol(chainId),
          })
        );
      })
      .catch(setErrorMessage);
    const accounts = await web3.listAccounts();
    const { _hex } = await web3.getBalance(accounts[0]);

    dispatch(
      setUser({
        address: accounts[0],
        balance: utils.formatEther(_hex),
      })
    );
  };

  const handleConnect = () => {
    handleNetwork().catch(setErrorMessage);
  };

  const { address, balance } = useSelector(getUser);

  return (
    <section aria-labelledby="network-section">
      <h2 id="network-section">Network section</h2>

      <Button className="m-3" variant="primary" onClick={handleConnect}>
        {web3 ? 'Disconnect' : 'Connect'}
      </Button>

      <div className="m-3">
        {renderSectionItem('Network', name)}
        {renderSectionItem('Address', address)}
        {renderSectionItem('Balance', `${balance} ${symbol}`)}
      </div>
      <Error errorMessage={errorMessage} />
    </section>
  );
};

export default NetworkSection;
