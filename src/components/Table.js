import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenses, updateExpenses } from '../redux/actions';

class Table extends Component {
  updateExpenses = (update) => {
    const { updateExpensesDispatch } = this.props;
    updateExpensesDispatch(update);
    return Number(update).toFixed(2);
  }

  deleteButton = (coin) => {
    const { deleteExpensesDispatch } = this.props;
    const currencys = Number(coin.exchangeRates[coin.currency].ask);
    this.updateExpenses(Number((currencys * coin.value)).toFixed(2));
    deleteExpensesDispatch(coin.id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          {
            expenses.map((coin) => (
              <tbody key={ coin.id }>
                <tr>
                  <td>{coin.description}</td>
                  <td>{coin.tag}</td>
                  <td>{coin.method}</td>
                  <td>{Math.abs(coin.value).toFixed(2)}</td>
                  <td>{coin.exchangeRates[coin.currency].name}</td>
                  <td>{Math.abs(coin.exchangeRates[coin.currency].ask).toFixed(2)}</td>
                  <td>
                    {
                      Math.abs((coin.value
                        * (coin.exchangeRates[coin.currency].ask))
                        .toFixed(2))
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button type="button">Editar</button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deleteButton(coin) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          }
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpensesDispatch: PropTypes.func.isRequired,
  updateExpensesDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpensesDispatch: (payload) => dispatch(deleteExpenses(payload)),
  updateExpensesDispatch: (update) => dispatch(updateExpenses(update)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
