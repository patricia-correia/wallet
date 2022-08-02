import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <h2>Trybe Wallet</h2>
        <div>
          <Header />
        </div>
        <section>
          <div><WalletForm /></div>
        </section>
      </div>
    );
  }
}

export default Wallet;
