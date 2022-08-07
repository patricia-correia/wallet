import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCoins, getExpenses, sumExpenses } from '../redux/actions';

const ALIMENTACAO = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      id: 0,
      exchangeRates: {},

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

  updateExchangeRates = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    this.setState({
      exchangeRates: data,
    });
  }

  clearState = () => {
    this.setState((prevState) => ({
      id: prevState.id + 1,
      value: '',
      description: '',
    }));
  }

  sommaExpenses = () => {
    const { sumExpenseDispatch } = this.props;
    const { value, currency, exchangeRates } = this.state;
    const currencys = exchangeRates[currency].ask;
    const sum = (currencys * value);
    const total = parseFloat(sum.toFixed(2));
    sumExpenseDispatch(total);
  }

  addExpenses = async () => {
    const { getExpenseDispatch } = this.props;
    await this.updateExchangeRates();
    getExpenseDispatch(this.state);
    this.sommaExpenses();
    this.clearState();
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value">
            Values:
            <input
              type="number"
              name="value"
              value={ value }
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
          <label htmlFor="currency">
            Coins:
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
          </label>
          <label htmlFor="method">
            Pay Method:
            <select
              name="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Expenses:
            <select
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value={ ALIMENTACAO }>{ALIMENTACAO}</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.addExpenses }
          >
            Adicionar despesas
          </button>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  getCoinDispatch: PropTypes.func.isRequired,
  getExpenseDispatch: PropTypes.func.isRequired,
  sumExpenseDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

const mapDispatchToProps = (dispatch) => ({
  getCoinDispatch: () => dispatch(getCoins()),
  getExpenseDispatch: (expenses) => dispatch(getExpenses(expenses)),
  sumExpenseDispatch: (payload) => dispatch(sumExpenses(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
