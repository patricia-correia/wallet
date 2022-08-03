import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
                  <td>{parseFloat(coin.value).toFixed(2)}</td>
                  <td>{coin.exchangeRates[coin.currency].name}</td>
                  <td>{parseFloat(coin.exchangeRates[coin.currency].ask).toFixed(2)}</td>
                  <td>
                    {
                      parseFloat((coin.value
                        * (coin.exchangeRates[coin.currency].ask))
                        .toFixed(2))
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
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
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
