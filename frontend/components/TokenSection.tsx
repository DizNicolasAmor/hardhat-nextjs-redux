import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import CommonSpinner from './CommonSpinner';
import { renderSectionItem } from '../utils/utilFunctions';

interface ITokenSection {
  account: string;
  balance: string;
  contractAddress: string;
  handleGetBalance: () => void;
  isLoadingToken: boolean;
  sendToken: (receiverAddress: string, amountToSend: string) => void;
  tokenName: string;
  tokenSymbol: string;
}

const TokenSection: React.FC<ITokenSection> = ({
  account,
  balance,
  contractAddress,
  handleGetBalance,
  isLoadingToken,
  sendToken,
  tokenName,
  tokenSymbol,
}) => {
  const [receiverAddress, setReceiverAddressValue] = useState<string>('');
  const [amountToSend, setAmountToSend] = useState<string>('');

  const handleReceiverAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event?.target?.value) {
      setReceiverAddressValue(event?.target?.value);
    }
  };
  const handleAmountToSend = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event?.target?.value) {
      setAmountToSend(event?.target?.value);
    }
  };
  const handleSendToken = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    sendToken(receiverAddress, amountToSend);
  };

  return (
    <section aria-labelledby="token-section">
      <h2 id="token-section">Token section</h2>

      <div className="m-3">
        {renderSectionItem('Contract address', contractAddress)}
        {renderSectionItem('Your account', account)}

        <Button className="m-3" variant="secondary" onClick={handleGetBalance}>
          Get token balance
        </Button>
        <div>
          <strong>Token name: </strong>
          {tokenName}
        </div>
        {isLoadingToken ? (
          <CommonSpinner />
        ) : (
          <div>
            <strong>Your token balance: </strong>
            {`${balance} ${tokenSymbol}`}
          </div>
        )}
      </div>
      <div className="m-auto" style={{ maxWidth: '45rem' }}>
        <Form>
          <Form.Group className="mb-3" controlId="receiver-address">
            <Form.Label>Receiver address</Form.Label>
            <Form.Control
              onChange={handleReceiverAddress}
              placeholder=""
              type="text"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount-to-send">
            <Form.Label>Amount to send</Form.Label>
            <Form.Control
              onChange={handleAmountToSend}
              placeholder=""
              type="number"
            />
          </Form.Group>
          <Button
            className="m-3"
            variant="primary"
            type="submit"
            onClick={handleSendToken}
          >
            Send token
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default TokenSection;
