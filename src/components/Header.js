import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, totalSum } = this.props;
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <span data-testid="total-field">{ totalSum }</span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalSum: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalSum: state.wallet.sumExpenses,
});
export default connect(mapStateToProps)(Header);
