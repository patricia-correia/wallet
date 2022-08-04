// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RECIVE_WALLET, GET_EXPENSES,
  SUM_EXPENSES, DELETE_EXPENSES, UPDATE_EXPENSES } from '../actions/index';

const InicialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  sumExpenses: 0,
};

function wallet(state = InicialState, action) {
  switch (action.type) {
  case RECIVE_WALLET:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],

    };
  case SUM_EXPENSES:
    return {
      ...state,
      sumExpenses: state.sumExpenses + action.payload,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((remove) => remove.id !== action.payload),
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      sumExpenses: state.sumExpenses - action.payload,
    };
  default:
    return state;
  }
}

export default wallet;
