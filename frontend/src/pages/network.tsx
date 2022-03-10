import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../redux/slices/userSlice';
import { getNetwork } from '../redux/slices/networkSlice';
import { renderSectionItem } from '../utils/utilFunctions';

const NetworkSection: React.FC = () => {
  const { chainId, name, symbol } = useSelector(getNetwork);
  const { address, balance } = useSelector(getUser);

  return (
    <section aria-labelledby="network-section" className="text-center">
      <h1 id="network-section">Welcome to the Network section</h1>

      <div className="m-3">
        {renderSectionItem('Chain id', chainId)}
        {renderSectionItem('Network name', name)}
        {renderSectionItem('Balance', `${balance} ${symbol}`)}
        {renderSectionItem('Address', address)}
      </div>
    </section>
  );
};

export default NetworkSection;
