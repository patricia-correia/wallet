import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoins } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      values: '',
      description: '',
      currency: '',
      payMethod: '',
      expenses: '',

    };
  }

  componentDidMount() {
    const { getCoinDispatch } = this.props;
    getCoinDispatch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { values, description, currency, payMethod, expenses } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="values">
            Values:
            <input
              type="text"
              name="values"
              value={ values }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Description:
            <input
              type="text"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((coins) => (
                <option value={ coins } key={ coins }>{coins}</option>
              ))
            }
          </select>

          <label htmlFor="payMethod">
            Pay Method:
            <select
              name="payMethod"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ payMethod }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="cartao-credito">Cartão de crédito</option>
              <option value="cartao-debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="expenses">
            Expenses:
            <select
              name="expenses"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ expenses }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
  getCoinDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCoinDispatch: () => dispatch(getCoins()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
