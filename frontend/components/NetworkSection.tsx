import React from 'react';
import { providers } from 'ethers';
import { Button } from 'react-bootstrap';
import { renderSectionItem } from '../utils/utilFunctions';

interface INetworkSection {
  account: string;
  handleConnect: () => void;
  network: providers.Network | undefined;
  userBalance: string;
  web3: providers.Web3Provider | undefined;
}

const NetworkSection: React.FC<INetworkSection> = ({
  handleConnect,
  web3,
  network,
  account,
  userBalance,
}) => (
  <section aria-labelledby="network-section">
    <h2 id="network-section">Network section</h2>

    <Button className="m-3" variant="primary" onClick={handleConnect}>
      {web3 ? 'Disconnect' : 'Connect'}
    </Button>

    <div className="m-3">
      {renderSectionItem('Network', `${network?.chainId} ${network?.name}`)}
      {renderSectionItem('Address', account)}
      {renderSectionItem('Balance', userBalance)}
    </div>
  </section>
);

export default NetworkSection;
