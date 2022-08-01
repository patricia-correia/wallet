// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECIVE_WALLET } from '../actions/index';

const INICIAL_STATE = {
  wallet: {
    currencies: [], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica de uma despesa está sendo editada
    idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  },
};

function wallet(state = INICIAL_STATE, action) {
  switch (action.type) {
  case RECIVE_WALLET:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
