import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <h2>Trybe Wallet</h2>
        <div>
          <Header />
        </div>
        <hr />
        <section>
          <div><WalletForm /></div>
          <hr />
          <div><Table /></div>
        </section>
      </div>
    );
  }
}

export default Wallet;
