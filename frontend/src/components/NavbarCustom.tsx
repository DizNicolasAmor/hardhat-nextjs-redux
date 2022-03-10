import React, { FC, useEffect, useState } from 'react';
import { providers, utils } from 'ethers';
import { useDispatch } from 'react-redux';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import ToastCustom from './ToastCustom';
import { resetUser, setUser } from '../redux/slices/userSlice';
import useNetwork from '../hooks/useNetwork';
import { resetNetwork, setNetwork } from '../redux/slices/networkSlice';
import { getNetworkName, getNetworkSymbol } from '../utils/constants';

const NavbarCustom: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [{ web3 }, handleNetwork] = useNetwork();
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

  useEffect(() => {
    if (errorMessage) {
      setIsToastOpen(true);
    }
  }, [errorMessage]);

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

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">My ERC-20 dApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="network">Network info</Nav.Link>
              <Nav.Link href="token">Token info</Nav.Link>
            </Nav>
            <Button
              onClick={handleConnect}
              variant={web3 ? 'outline-primary' : 'primary'}
            >
              {web3 ? 'Disconnect' : 'Connect'}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastCustom
        body={errorMessage}
        onClose={() => setIsToastOpen(false)}
        show={isToastOpen}
        type="danger"
      />
    </>
  );
};

export default NavbarCustom;
